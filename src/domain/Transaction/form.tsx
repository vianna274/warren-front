import { FormikProps, withFormik } from 'formik';
import React from 'react';
import { Input } from '../../components/Input/Input';
import { Spacing } from '../../components/Spacing/Spacing';
import { Title } from '../../components/Title/Title';
import * as Yup from 'yup';
import { Button } from '../../components/Button/Input';
import { ERROR_MESSAGES } from '../../utils/constants';
import { UserAction } from '../../App';

type TransactionFormProps = {
  submit: (values: TransactionFormFormValues) => void;
  type: UserAction.DEPOSIT | UserAction.PAYMENT | UserAction.WITHDRAWAL | UserAction.TRANSFER;
};

export type TransactionFormFormValues = {
  destinationAccountId?: string;
  amount: string;
};

const TransactionFormForm: React.FC<TransactionFormProps & FormikProps<TransactionFormFormValues>> = ({
  values,
  errors,
  touched,
  handleChange,
  submitCount,
  handleSubmit,
  type
}) => {
  const isTouched = (touched: boolean | undefined) => !!touched || !!submitCount;

  return <form noValidate={true} onSubmit={handleSubmit}>
    <Title size="medium">Crie a sua conta</Title>

    <Spacing size="large"/>
    {(type === UserAction.TRANSFER) && <Input
      id="destinationAccountId"
      data-testid="input-destinationAccountId"
      label="Conta Destino"
      name="destinationAccountId"
      onChange={handleChange}
      value={values.destinationAccountId || ''}
      errorMessage={isTouched(touched.destinationAccountId) ? errors.destinationAccountId : ''}
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
          destinationAccountId: Yup.string().min(5, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required()),
          amount: Yup.string().min(1, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
        });    
      default:
        break;
    }
  }
})(TransactionFormForm);