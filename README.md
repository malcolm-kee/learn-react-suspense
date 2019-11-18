# react-suspense

This is a sample application using React Suspense with REST API.

I try to reduce the concept involved (no routing) to make this easier to digest.

The approach is to show you an existing code, and how I refactor it to load data with React Suspense, while showing you the benefits of using React Suspense.

## A typical fetch "on mount" refactoring

- fetch data when componentDidMount or useEffect
- use state to track if data is loaded successfully

## Suspense

- enable it first by installing react@experimental and react-dom@experimental
- instead of making API calls, we read data from resource
- resource is just a cache of the api calls we make. When a data is not ready when a component is trying to read it, the resource will throw a `Promise`.

## Takeaways

- using resource, the component no longer manage loading states. In the component we just treat data as if it is already ready. If it's not ready, React will handle it.
- suspense allows us to coordinate resource loading, not just data, but any resource that may takes some time to load, e.g. image.
