import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './transition-link.module.css';

export const TransitionLink = ({ to, children, ...props }) => {
  const history = useHistory();
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000,
  });

  return (
    <a
      onClick={ev => {
        ev.preventDefault();
        startTransition(() => history.push(to));
      }}
      href={to}
      className={styles.a}
      {...props}
    >
      {isPending ? 'Loading...' : children}
    </a>
  );
};
