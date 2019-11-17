type KeyType = string | number;
type Status = 'success' | 'error';
type Cache<Result> = [Promise<void>] | [Promise<void>, Status, Result | Error];

export const createResource = <Key extends KeyType, Params extends any[], Result>(
  getResult: (id: Key, ...rest: Params) => Promise<Result>,
  { name = 'resource' } = {}
) => {
  const cache = new Map<Key, Cache<Result>>();
  const loadData = (id: Key, ...params: Params) => {
    const data: Cache<Result> = [
      getResult(id, ...params)
        .then(details => {
          (data as any).push('success', details);
        })
        .catch(err => {
          (data as any).push('error', err);
        }),
    ];
    cache.set(id, data);
    return data[0];
  };

  return {
    preload: (id: Key, ...params: Params): void => {
      if (!cache.has(id)) {
        if (process.env.NODE_ENV !== 'production') {
          console.debug(`preloading ${id} for ${name}`);
        }
        loadData(id, ...params);
      }
    },
    read: (id: Key, ...params: Params): Result => {
      const storedCache = cache.get(id);
      if (storedCache) {
        const [promise, status, result] = storedCache;
        if (status === 'success') {
          return result as Result;
        }
        if (status === 'error') {
          throw result;
        }
        throw promise;
      }

      throw loadData(id, ...params);
    },
  };
};
