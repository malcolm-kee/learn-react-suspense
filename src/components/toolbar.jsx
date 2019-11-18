import cx from 'classnames';
import React from 'react';
import styles from './toolbar.module.css';

export const Toolbar = ({ className, ...props }) => (
  <div className={cx(styles.root, className)} {...props} />
);
