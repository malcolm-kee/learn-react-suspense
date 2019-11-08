import React from 'react';

export const Button = ({ onClick, children, ...buttonProps }) => {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000
  });
  const handleClick = () => {
    startTransition(() => onClick());
  };

  return (
    <button onClick={handleClick} {...buttonProps}>
      {isPending ? 'Loading...' : children}
    </button>
  );
};
