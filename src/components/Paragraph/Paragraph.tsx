import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

type ParagraphProps = {
  color?: 'default' | 'error';
  size?: 'medium' | 'large';
};

export const Paragraph: React.FC<ParagraphProps> = ({
  color = 'default',
  size = 'medium',
  children,
  ...props
}) => {

  return <p {...props} className={clsx(styles[`-${color}`], styles[`-${size}`])}>{children}</p>
};