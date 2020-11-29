import React from 'react';
import Select from 'react-select';

import { Paragraph } from '../Paragraph/Paragraph';
import { Spacing } from '../Spacing/Spacing';

type SelectProps = {
  id: string;
  'data-testid': string;
  label: string;
  value?: any;
  options: any[];
  errorMessage?: string;
  name: string;
  onChange: (value: any) => void;
};

export const SelectInput: React.FC<SelectProps> = ({ errorMessage, label, ...props }) => {

  return <div>
    <label>{label}</label>
    <Select {...props} />
    <Spacing size="small" />
    <Paragraph size="medium" color="error">{errorMessage || ''}</Paragraph>
  </div>
};