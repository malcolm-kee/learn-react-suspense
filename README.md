# react-suspense

This is a sample application using React Suspense with REST API.

I try to reduce the concept involved (no routing) to make this easier to digest.

The approach is to show you an existing code, and how I refactor it to load data with React Suspense, while showing you the benefits of using React Suspense.

## A typical fetch "on mount" refactoring

Takeaways

- using resource, the component no longer manage loading states. In the component we just treat data as if it is already ready. If it's not ready, React will handle it.
- suspense allows us to coordinate resource loading, not just data, but any resource that may takes some time to load, e.g. image.
