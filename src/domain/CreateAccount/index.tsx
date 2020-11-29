import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { createAccount } from '../../api';
import { Account, AccountType } from '../../api/models';
import { LoaderComponent } from '../../components/Loader';
import { Spacing } from '../../components/Spacing/Spacing';
import { Title } from '../../components/Title/Title';
import CreateAccountForm, { CreateAccountFormValues } from './form';

type CreateAccountProps = {
  handleSuccess: (account: Account) => void;
};

export const CreateAccount: React.FC<CreateAccountProps> = ({ handleSuccess }) => {
  const [loading, setLoading] = useState(false);

  const submit = (values: CreateAccountFormValues) => {
    setLoading(true);
    createAccount({ ...values, type: AccountType.CHECKING_ACCOUNT })
      .then(res => {
        toast.success("Conta criada com sucesso");
        handleSuccess(res.data);
      })
      .catch(err => {
        toast.error("Ops, aconteceu um erro inesperado.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  return <>
    <LoaderComponent show={loading}/>
    <Title data-testid="title-create-account" size="medium">Crie a sua conta</Title>
    <Spacing size="small"/>
    <CreateAccountForm submit={submit}/>
  </>;
};