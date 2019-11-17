export const createResource = (getResult, { name = 'resource' } = {}) => {
  const cache = new Map();
  const loadData = id => {
    const data = [
      getResult(id)
        .then(details => {
          data.push('success', details);
        })
        .catch(err => {
          data.push('error', err);
        }),
    ];
    cache.set(id, data);
    return data[0];
  };

  return {
    preload: id => {
      if (!cache.has(id)) {
        if (process.env.NODE_ENV !== 'production') {
          console.debug(`preloading ${id} for ${name}`);
        }
        loadData(id);
      }
    },
    read: id => {
      if (cache.has(id)) {
        const [promise, status, result] = cache.get(id);
        if (status === 'success') {
          return result;
        }
        if (status === 'error') {
          throw result;
        }
        throw promise;
      }

      throw loadData(id);
    },
  };
};