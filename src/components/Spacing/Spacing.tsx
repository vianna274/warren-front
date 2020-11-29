import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

type SpacingProps = {
  size: 'small' | 'large'
};

export const Spacing: React.FC<SpacingProps> = ({ size }) =>
  <div className={clsx(styles[`-${size}`])}></div>