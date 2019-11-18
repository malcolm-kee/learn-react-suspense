import React from 'react';
import styles from './pokemon-card-skeleton.module.css';

export const PokemonCardSkeleton = () => (
  <div className={styles.card}>
    <h1> </h1>
    <div className={styles.image}></div>
  </div>
);
