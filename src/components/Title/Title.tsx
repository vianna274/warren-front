import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

type TitleProps = {
  color?: 'default' | 'error';
  size?: 'medium' | 'large';
};

export const Title: React.FC<TitleProps> = ({
  color = 'default',
  size = 'medium',
  children,
  ...props
}) => {

  return <p {...props} className={clsx(styles[`-${color}`], styles[`-${size}`])}>{children}</p>
};