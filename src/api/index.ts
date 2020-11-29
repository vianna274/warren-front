import axios from "axios";
import { uuid } from "uuidv4";
import { Account, AccountRequest, Transaction, TransactionRequest, TransactionType } from "./models";

const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: { transactionId: uuid() },
  timeout: 10000
});

export const findAccountByUsername = (username: string) => {
  return request.get<Account>('/accounts', { params: { username }});
};

export const getAccountById = (accountId: string) => {
  return request.get<Account>(`/accounts/${accountId}`);
};

export const createAccount = (body: AccountRequest) => {
  return request.post<Account>(`/accounts`, body);
};

export const findTransactionByAccountId = (accountId: string) => {
  return request.get<Transaction>('/transactions', { params: { accountId }});
};

export const deposit = (accountId: string, amount: number) => {
  const body: TransactionRequest = {
    amount,
    destinationAccountId: accountId,
    type: TransactionType.DEPOSIT,
  };

  return request.post<Transaction>(`/transactions`, body);
};

export const withdrawal = (accountId: string, amount: number) => {
  const body: TransactionRequest = {
    amount,
    sourceAccountId: accountId,
    type: TransactionType.WITHDRAWAL,
  };

  return request.post<Transaction>(`/transactions`, body);
};

export const payment = (sourceAccountId: string, amount: number) => {
  const body: TransactionRequest = {
    amount,
    sourceAccountId,
    type: TransactionType.PAYMENT,
  };

  return request.post<Transaction>(`/transactions`, body);
};

type TransferType = {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
};

export const transfer = ({ sourceAccountId, destinationAccountId, amount }: TransferType) => {
  const body: TransactionRequest = {
    amount,
    sourceAccountId,
    destinationAccountId,
    type: TransactionType.TRANSFER,
  };

  return request.post<Transaction>(`/transactions`, body);
};