import React from 'react';

type ButtonProps = {
  'data-testid': string;
  onClick?: () => void;
  type?: 'submit' | 'button';
};

export const Button: React.FC<ButtonProps> = ({ children, type = 'button', ...props }) => {

  return <button type={type} {...props}>{children}</button>
};