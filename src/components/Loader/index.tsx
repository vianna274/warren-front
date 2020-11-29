import clsx from 'clsx';
import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './styles.module.scss';

type LoaderProps = {
  show: boolean;
};

export const LoaderComponent: React.FC<LoaderProps> = ({ show }) => {
  return <>
    <Loader className={clsx(styles['loader'], { [styles['-show']]: show })} type="ThreeDots" />
    <div className={clsx(styles['blur-overlay'], { [styles['-show']]: show })}></div>
  </>;
};