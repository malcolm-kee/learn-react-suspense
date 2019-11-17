import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './transition-link.module.css';

export const TransitionLink = ({ to, children, isPendingChildren = 'Loading...', ...props }) => {
  const history = useHistory();
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000,
  });

  return (
    <a
      onClick={ev => {
        ev.preventDefault();
        if (!isPending) {
          startTransition(() => history.push(to));
        }
      }}
      href={to}
      className={styles.a}
      {...props}
    >
      {isPending ? isPendingChildren : children}
    </a>
  );
};
