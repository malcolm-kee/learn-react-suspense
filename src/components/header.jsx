import React from 'react';

export const Header = ({ children }) => (
  <header className="App-header">
    <h1>Learn React Suspense</h1>
    <div style={{ padding: 8 }}>{children}</div>
  </header>
);
