import React from 'react';
import { Link } from './route-components';

export const Header = ({ children }) => (
  <header className="App-header">
    <Link to="/">Learn React Suspense</Link>
    <div style={{ padding: 8 }}>{children}</div>
  </header>
);
