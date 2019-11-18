import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './transition-link.module.css';

export const TransitionLink = ({ to, children, isPendingChildren = 'Loading...', ...props }) => {
  const history = useHistory();

  return (
    <a
      onClick={ev => {
        ev.preventDefault();
        history.push(to);
      }}
      href={to}
      className={styles.a}
      {...props}
    >
      {children}
    </a>
  );
};
