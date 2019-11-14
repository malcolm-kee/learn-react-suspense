import React from 'react';
import styles from './button.module.css';

export const Button = ({ onClick, children, ...buttonProps }) => {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000,
  });
  const handleClick = () => {
    startTransition(() => onClick());
  };

  return (
    <button className={styles.btn} onClick={handleClick} {...buttonProps}>
      {isPending ? 'Loading...' : children}
    </button>
  );
};
