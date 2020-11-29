import React, { ChangeEvent } from 'react';
import { Paragraph } from '../Paragraph/Paragraph';
import { Spacing } from '../Spacing/Spacing';

type InputProps = {
  id: string;
  'data-testid': string;
  label: string;
  value: string;
  errorMessage?: string;
  name: string;
  onChange: (e: ChangeEvent) => void;
};

export const Input: React.FC<InputProps> = ({ errorMessage, label, ...props }) => {

  return <div>
    <label>{label}</label>
    <input {...props}/>
    <Spacing size="small" />
    <Paragraph size="medium" color="error">{errorMessage}</Paragraph>
  </div>
};