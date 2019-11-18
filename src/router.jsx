import cx from 'classnames';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';
import { LoadingIndicator } from './components/loading-indicator';
import styles from './router.module.css';
import { suspenseConfig } from './suspense-config';

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
  if (typeof options === 'string' || Array.isArray(options)) {
    options = { path: options };
  }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== '') return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive,
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {}),
    };
  }, null);
}

const RouterPathContext = React.createContext('/');
const RouterNavigateContext = React.createContext(null);

export const Router = props => {
  const [path, setPath] = React.useState(() => window.location.pathname);
  const [startTransition, isPending] = React.useTransition(suspenseConfig);

  const navigate = React.useCallback((url, syncHistory) => {
    setPath(url);
    if (syncHistory) {
      window.history.pushState(null, '', url);
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  React.useEffect(() => {
    const syncPath = () => {
      startTransition(() => {
        navigate(window.location.pathname, false);
      });
    };

    window.addEventListener('popstate', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
    };
  });

  return (
    <RouterPathContext.Provider value={path}>
      <RouterNavigateContext.Provider value={navigate}>
        {isPending && <LoadingIndicator />}
        {props.children}
      </RouterNavigateContext.Provider>
    </RouterPathContext.Provider>
  );
};

const ParamsContext = React.createContext({});
export const useParams = () => React.useContext(ParamsContext);

export const Route = props => {
  const currentPath = React.useContext(RouterPathContext);

  const match = props.computedMatch || matchPath(currentPath, props);

  if (match) {
    return <ParamsContext.Provider value={match.params}>{props.children}</ParamsContext.Provider>;
  }
  return null;
};

export const Switch = props => {
  const currentPath = React.useContext(RouterPathContext);

  let element, match;

  React.Children.forEach(props.children, child => {
    if (match == null && React.isValidElement(child)) {
      element = child;
      match = matchPath(currentPath, child.props);
    }
  });

  return match ? React.cloneElement(element, { computedMatch: match }) : null;
};

export const Link = ({ to, children, className, transitioningClass, ...props }) => {
  const navigate = React.useContext(RouterNavigateContext);
  const [startTransition, isPending] = React.useTransition(suspenseConfig);

  const onClick = e => {
    e.preventDefault();
    startTransition(() => {
      navigate(to, true);
    });
  };

  return (
    <a
      {...props}
      className={cx(className, isPending && styles.loadingLink, isPending && transitioningClass)}
      href={to}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
