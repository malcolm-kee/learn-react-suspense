# react-suspense

What it means to you as a product developer.

---

## Disclaimer: This is not production ready.

React Concurrent is currently experimental (you need to install `react@experimental` to enable it), and the API may changes.

The goal of this talk is to give you sneek peek to the next big release of React.

---

## Key Takeaways for Product Developer

- new convention for data fetching
- potential UI improvements
- it is faster

---

## Prerequisite: ErrorBoundary and Suspense component

- ErrorBoundary is a class that extends `React.Component` that implements `componentDidCatch` method. It is used to catch any error in the rendering of the subtree.

- Suspense is to allow you to create a boundary for loading of your components that are loaded with dynamic `import` wrapped with `React.lazy`.

---

## New Convention for Data Fetching

### current approach: fetch "on mount"

- fetch data when componentDidMount or useEffect
- use state to track if data is loaded successfully

### suspense approach: create a resource and read it

- a resource is a cache that returns a data when it is ready, else it will tell React when it is not ready.
- when writing component that use the data, we don't need to worry about whether the data is ready. Just treat is as ready.
- `Suspense` will be used to handle the loading state while `ErrorBoundary` will be used to handle error state.

---

## Potential UI Improvement

- React Concurrent mode allows us to have the following interaction when you click a link/ button to reveal new content:

  1. the button/link will respond according to your click, e.g. a little loading indicator. In the meantime, the data fetching will be started.
  1. the new page/section will only be revealed only when the data fetching completed. So your user no longer needs to see the empty big loading spinner again.
  1. In the case where the data fetching is ready slow, we will show the empty big loading spinner after some delay.

  In short, we have 3 states: responsive, busy, final.

- In addition, another UI improvements that React Concurrent allows is to make sure dynamic data always load in a certain order. This avoid the content jump while more data is coming in, a common problem in many sites today.

- However, achieving those improvements need additional works as developer. You may not want to spend the effort on those, just know that React allows you to do them when you want to.

---

## Blazing Faster 🔥🔥🔥

- It will be faster (for whatever reason).
- In addition of `React.memo`, `React.useMemo`, now we have `React.useDeferredValue`.

---

## Recap

- new convention for data fetching
- potential UI improvements
- it is faster
