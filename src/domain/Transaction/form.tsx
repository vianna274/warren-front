import { FormikProps, withFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';

import { AccountOption } from '../../api/models';
import { UserAction } from '../../App';
import { Button } from '../../components/Button/Input';
import { Input } from '../../components/Input/Input';
import { SelectInput } from '../../components/Select/Input';
import { Spacing } from '../../components/Spacing/Spacing';
import { AccountsContext } from '../../context/accounts';
import { ERROR_MESSAGES } from '../../utils/constants';

type TransactionFormProps = {
  submit: (values: TransactionFormFormValues) => void;
  type: UserAction.DEPOSIT | UserAction.PAYMENT | UserAction.WITHDRAWAL | UserAction.TRANSFER;
};

const CURRENCY_REGEX = /^\s*(?:[1-9]\d{0,2}(?:\.\d{3})*|0)(?:,\d{1,2})?$/;

export type TransactionFormFormValues = {
  destinationAccount?: AccountOption;
  amount: string;
};

const TransactionFormForm: React.FC<TransactionFormProps & FormikProps<TransactionFormFormValues>> = ({
  values,
  errors,
  touched,
  handleChange,
  submitCount,
  handleSubmit,
  type,
  setFieldValue
}) => {
  const { accountsOptions } = useContext(AccountsContext);
  const isTouched = (touched: boolean | undefined) => !!touched || !!submitCount;
  console.log(errors);
  return <form noValidate={true} onSubmit={handleSubmit}>
    <Spacing size="large"/>
    {(type === UserAction.TRANSFER) && <SelectInput
      id="destinationAccount"
      data-testid="input-destinationAccount"
      label="Conta Destino"
      name="destinationAccount"
      options={accountsOptions}
      value={values.destinationAccount || ''}
      onChange={(value) => { setFieldValue('destinationAccount', value ); }}
      errorMessage={isTouched(touched.destinationAccount) ? errors.destinationAccount : ''}
    />}

    <Spacing size="small"/>
    <Input
      id="amount"
      data-testid="input-amount"
      label="Quantia"
      name="amount"
      onChange={handleChange}
      value={values.amount || ''}
      errorMessage={isTouched(touched.amount) ? errors.amount : ''}
    />

    <Spacing size="small"/>
    <Button data-testid="button-submit" type="submit" >
      Executar
    </Button>
  </form>
};

export default withFormik<TransactionFormProps, TransactionFormFormValues>({
  handleSubmit: (values, { props: { submit } }) => {
    submit(values);
  },
  validate: (values) => {
    if (values.amount?.length > 0 && !CURRENCY_REGEX.test(values.amount)) {
      return { amount: ERROR_MESSAGES.invalidCurrency() }
    }
    return {};
  },
  validationSchema: ({ type }: TransactionFormProps) => {
    switch (type) {
      case UserAction.WITHDRAWAL:
        return Yup.object().shape({
          amount: Yup.string().min(1, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
        });    
      case UserAction.PAYMENT:
        return Yup.object().shape({
          amount: Yup.string().min(1, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
        });    
      case UserAction.DEPOSIT:
        return Yup.object().shape({
          amount: Yup.string().min(1, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
        });    
      case UserAction.TRANSFER:
        return Yup.object().shape({
          destinationAccount: Yup.object().shape({
            value: Yup.string().min(5, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
          }).required(ERROR_MESSAGES.required()),
          amount: Yup.string().min(1, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
        });    
      default:
        break;
    }
  }
})(TransactionFormForm);