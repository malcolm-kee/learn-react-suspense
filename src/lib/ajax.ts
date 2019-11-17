const DEFAULT_RETRIES = [1000, 3000];

type FetchInit = RequestInit & {
  params?: Record<string, string | number | boolean>;
  data?: any;
  /** delay in millisecond before retry again. Default to [1000, 3000] (wait 1 sec, then 3 secs) */
  retryDelays?: number[];
};

export function fetchWithRetry(
  url: string,
  { retryDelays = DEFAULT_RETRIES, params, data, ...init }: FetchInit = {}
): Promise<Response> {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;
    const requestUrl = url + stringifyParams(params);

    function makeRequest(): void {
      attemptCount++;
      const request = fetch(
        requestUrl,
        data
          ? {
              ...init,
              body: JSON.stringify(data),
            }
          : init
      );

      request
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            fulfill(response);
          } else if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            const error = new Error(
              `fetchWithRetry: No success response after ${attemptCount} retries, give up!`
            );
            (error as any).response = response;
            reject(error);
          }
        })
        .catch(err => {
          if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            reject(err);
          }
        });
    }

    function retryRequest(): void {
      const retryDelay = retryDelays[attemptCount];
      window.setTimeout(makeRequest, retryDelay);
    }

    function shouldRetry(attempt: number) {
      return attempt <= retryDelays.length;
    }

    makeRequest();
  });
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const stringifyParams = (params: FetchInit['params']) => {
  if (!params) {
    return '';
  }

  let results = [];

  for (let key in params) {
    if (hasOwnProperty.call(params, key)) {
      results.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }

  return `?${results.join('&')}`;
};

export function fetchJson(url: string, { headers, ...init }: FetchInit = {}) {
  const defaultHeader: Record<string, string> =
    init.method && init.method !== 'GET'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      : {
          Accept: 'application/json',
        };

  return fetchWithRetry(url, {
    headers: {
      ...defaultHeader,
      ...headers,
    },
    ...init,
  }).then(response => response.json());
}
