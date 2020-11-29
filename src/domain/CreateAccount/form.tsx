import { FormikProps, withFormik } from 'formik';
import React from 'react';
import { Input } from '../../components/Input/Input';
import { Spacing } from '../../components/Spacing/Spacing';
import { Title } from '../../components/Title/Title';
import * as Yup from 'yup';
import { Button } from '../../components/Button/Input';
import { ERROR_MESSAGES } from '../../utils/constants';

type CreateAccountProps = {
  submit: (values: CreateAccountFormValues) => void;
};

export type CreateAccountFormValues = {
  customerName: string;
  username: string;
};

const CreateAccountForm: React.FC<CreateAccountProps & FormikProps<CreateAccountFormValues>> = ({
  values,
  errors,
  touched,
  handleChange,
  submitCount,
  handleSubmit
}) => {
  const isTouched = (touched: boolean | undefined) => !!touched || !!submitCount;
  
  return <form noValidate={true} onSubmit={handleSubmit}>
    <Title size="medium">Crie a sua conta</Title>
    <Spacing size="small"/>
    <Input
      id="customerName"
      data-testid="input-customerName"
      label="Seu nome"
      name="customerName"
      onChange={handleChange}
      value={values.customerName || ''}
      errorMessage={isTouched(touched.customerName) ? errors.customerName : ''}
    />

    <Spacing size="small"/>
    <Input
      id="username"
      data-testid="input-username"
      label="Seu usuário"
      name="username"
      onChange={handleChange}
      value={values.username || ''}
      errorMessage={isTouched(touched.username) ? errors.username : ''}
    />

    <Spacing size="small"/>
    <Button data-testid="button-submit" type="submit" >
      Salvar
    </Button>
  </form>
};

export default withFormik<CreateAccountProps, CreateAccountFormValues>({
  handleSubmit: (values, { props: { submit } }) => {
    submit(values);
  },
  validationSchema: Yup.object().shape({
    customerName: Yup.string().min(5, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required()),
    username: Yup.string().min(5, ERROR_MESSAGES.min(5)).required(ERROR_MESSAGES.required())
  })
})(CreateAccountForm);