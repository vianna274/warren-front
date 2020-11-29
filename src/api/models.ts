export enum AccountType {
  CHECKING_ACCOUNT = "CHECKING_ACCOUNT",
  SAVINGS_ACCOUNT = "SAVINGS_ACCOUNT",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  PAYMENT = "PAYMENT",
  TRANSFER = "TRANSFER",
}

export type Account = {
  id: string;
  username: string;
  customerName: string;
  availableBalance: number;
  type: AccountType;
  createdDate: string;
  modifiedDate: string;
};

export type AccountRequest = {
  username: string;
  customerName: string;
  type: AccountType;
};

export type Transaction = {
  id: string;
  destinationAccountId: string;
  sourceAccountId: string;
  amount: number;
  type: TransactionType;
  createdDate: string;
  modifiedDate: string;
};

export type TransactionRequest =
  | {
      destinationAccountId: string;
      amount: number;
      type: TransactionType.DEPOSIT;
    }
  | {
      sourceAccountId: string;
      amount: number;
      type: TransactionType.WITHDRAWAL;
    }
  | {
      sourceAccountId: string;
      amount: number;
      type: TransactionType.PAYMENT;
    }
  | {
      sourceAccountId: string;
      destinationAccountId: string;
      amount: number;
      type: TransactionType.TRANSFER;
    };
