import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { findTransactionByAccountId } from '../../api';
import { Transaction, TransactionType } from '../../api/models';
import { LoaderComponent } from '../../components/Loader';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { Title } from '../../components/Title/Title';
import { formatter } from '../../utils';

type TransactionHistoryProps = {
  accountId: string;
};

const TRANSACTION_TYPE_DESCRIPTION: { [key in TransactionType]: string } = {
  'DEPOSIT': "Depósito.",
  'PAYMENT': "Pagamento",
  'WITHDRAWAL': "Saque",
  'TRANSFER': "Transferência",
};

const getTransactionDisplayText = (transaction: Transaction, accountId: string) => {
  const formattedDate = moment(transaction.createdDate).format('DD/MM/YYY - HH:mm:ss');
  const formattedAmount = formatter.format(transaction.amount);
  const typeText = transaction.type === TransactionType.TRANSFER
    ? (transaction.sourceAccountId === accountId
      ? TRANSACTION_TYPE_DESCRIPTION[transaction.type] + " enviada"
      : TRANSACTION_TYPE_DESCRIPTION[transaction.type] + " recebida")
    : TRANSACTION_TYPE_DESCRIPTION[transaction.type]
  return `${formattedDate} -- ${formattedAmount} -- ${typeText}`;
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ accountId }) => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setLoading(true);
    findTransactionByAccountId(accountId)
      .then(res => setTransactions(res.data))
      .catch(err => {
        toast.error("Ops, aconteceu um erro ao carregar o seu extrato.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [accountId]);

  return <>
    <LoaderComponent show={loading} />
    <Title data-testid="title-transaction history" size="medium">Extrato da sua conta</Title>
    <Paragraph>Data -- Tipo -- Quantia</Paragraph>
    {transactions.map(transaction => <div key={transaction.id}>
      <Paragraph>{getTransactionDisplayText(transaction, accountId)}</Paragraph>
    </div>)}
  </>
};