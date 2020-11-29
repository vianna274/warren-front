import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { deposit, payment, transfer, withdrawal } from '../../api';
import { UserAction } from '../../App';
import { LoaderComponent } from '../../components/Loader';
import { Title } from '../../components/Title/Title';
import { parseCurrencyToFloat } from '../../utils';
import { ERROR_MESSAGES } from '../../utils/constants';
import TransactionForm, { TransactionFormFormValues } from './form';

type TransactionFormProps = {
  handleSuccess: () => void;
  type: UserAction.DEPOSIT | UserAction.PAYMENT | UserAction.WITHDRAWAL | UserAction.TRANSFER;
  sourceAccountId: string;
};

const USER_ACTION_DESCRIPTION = {
  'DEPOSIT': "Faça um depósito.",
  'PAYMENT': "Efetuando um pagamento.",
  'WITHDRAWAL': "Fazendo aquele saque.",
  'TRANSFER': "Transferindo pra alguém.",
};

export const TransactionComponent: React.FC<TransactionFormProps> = ({ handleSuccess, type, sourceAccountId }) => {
  const [loading, setLoading] = useState(false);

  const submit = async ({ destinationAccount, amount }: TransactionFormFormValues) => {
    try {
      setLoading(true);
      const parsedAmount = parseCurrencyToFloat(amount);
      switch (type) {
        case UserAction.DEPOSIT:
          await deposit(sourceAccountId, parsedAmount);
          break;
        case UserAction.PAYMENT:
          await payment(sourceAccountId, parsedAmount);
          break;
        case UserAction.TRANSFER:
          if (!destinationAccount?.value) {
            throw Error(ERROR_MESSAGES.invalidPayload());
          }

          await transfer({
            sourceAccountId,
            amount: parsedAmount,
            destinationAccountId: destinationAccount.value,
          });
          break;
        case UserAction.WITHDRAWAL:
          await withdrawal(sourceAccountId, parsedAmount);
          break;
      }

      toast.success("Operação executada com sucesso");
      handleSuccess();
    } catch (err) {
      const { response } = err;
      
      response?.status === 422 && !!response?.data?.message
        ? toast.error(response?.data?.message)
        : toast.error("Ops, aconteceu um erro inesperado.");
      console.log(response?.status)

    } finally {
      setLoading(false);
    }
  };

  return <>
    <Title data-testid="title-transaction">{USER_ACTION_DESCRIPTION[type]}</Title>
    <LoaderComponent show={loading}/>
    <TransactionForm type={type} submit={submit}/>
  </>;
};