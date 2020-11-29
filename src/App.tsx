import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { findAllAccounts, getAccountById } from './api';
import { Account, AccountOption } from './api/models';
import styles from './App.module.scss';
import { Button } from './components/Button/Input';
import { LoaderComponent } from './components/Loader';
import { SelectInput } from './components/Select/Input';
import { Spacing } from './components/Spacing/Spacing';
import { Title } from './components/Title/Title';
import { AccountsContext } from './context/accounts';
import { CreateAccount } from './domain/CreateAccount';
import { TransactionComponent } from './domain/Transaction';
import { TransactionHistory } from './domain/TransactionHistory';
import { formatter } from './utils';

export enum UserAction {
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  HISTORY = 'HISTORY',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  PAYMENT = 'PAYMENT',
  TRANSFER = 'TRANSFER',
};

function App() {
  const [user, setUserState] = useState<Account>();
  const { accountsOptions, setAccountsOptions } = useContext(AccountsContext);

  const [{ isLoading, userAction }, setState] = useState({
    isLoading: false,
    userAction: UserAction.CREATE_ACCOUNT
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));

    findAllAccounts()
      .then(res => setAccountsOptions(res.data))
      .catch(err => {
        toast.error("Não foi possível carregar as contas.");
        console.error(err);
      })
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
  }, [setAccountsOptions]);

  const handleChangeAccount = ({ value }: AccountOption) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    getAccountById(value)
      .then(res => {
        setUserState(res.data);
        toast.success("Conta selecionada com sucesso");
      })
      .catch(err => {
        toast.error("Não foi possível carregar a conta selecionada.");
        console.error(err);
      })
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
  };

  const handleCreateAccount = (account: Account) => {
    const accountOption: AccountOption = {
      label: account.username,
      value: account.id
    };
    setAccountsOptions((prev) => [...prev, accountOption]);
    setState((prev) => ({ ...prev, userAction: UserAction.DEPOSIT }));
    setUserState(account);
    toast.warning("Já selecionamos a sua nova conta como principal.");
  };

  const handleTransactionSuccesss = () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    getAccountById(user!.id)
      .then(res => setUserState(res.data))
      .catch(err => {
        toast.error("Ops. Ocorreu um erro ao atualizar a página. Mas está tudo bem com a sua transação.");
        console.error(err);
      })
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
  };

  return (
    <div className={styles['layout']}>
      <LoaderComponent show={isLoading}/>
      <header className={styles['header']}>
        <div className={styles['title']}>
          <Title>Gerenciador de Conta Corrente</Title>
          {user
            ? <Title>Cuide bem do seu dinheiro! {user.customerName}</Title>
            : <Title>Crie a sua conta ou seleciona uma existente!</Title>}
        </div>
        <div className={styles['change-account']}>
          <SelectInput 
            id="input-change-account"
            data-testid="input-change-account"
            label="Troque de conta"
            name="change-account"
            options={accountsOptions}
            value={{
              value: user?.id,
              label: user?.username
            } || ''}
            onChange={(value) => { handleChangeAccount(value); }}
          />
        </div>
      </header>

      <section className={styles['body']}>
        <div className={styles['main-content']}>
          <div className={styles['balance']}>
            Saldo disponível: {user
              ? formatter.format(user.availableBalance)
              : 'Nenhuma conta selecionada'}
          </div>

          {userAction === UserAction.CREATE_ACCOUNT &&
            <CreateAccount handleSuccess={handleCreateAccount} />}
          {!!user && <>
            {userAction === UserAction.HISTORY &&
              <TransactionHistory
                accountId={user.id}/>}
              {userAction === UserAction.DEPOSIT &&
              <TransactionComponent
                sourceAccountId={user.id}
                type={UserAction.DEPOSIT}
                handleSuccess={handleTransactionSuccesss} />}
            {userAction === UserAction.PAYMENT &&
              <TransactionComponent
                sourceAccountId={user.id}
                type={UserAction.PAYMENT}
                handleSuccess={handleTransactionSuccesss} />}
            {userAction === UserAction.WITHDRAWAL &&
              <TransactionComponent
                sourceAccountId={user.id}
                type={UserAction.WITHDRAWAL}
                handleSuccess={handleTransactionSuccesss} />}
            {userAction === UserAction.TRANSFER &&
              <TransactionComponent
                sourceAccountId={user.id}
                type={UserAction.TRANSFER}
                handleSuccess={handleTransactionSuccesss} />}
          </>
          }
        </div>

        <div className={styles['vertical-menu']}>
          <Button
            data-testid="button-history"
            onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.CREATE_ACCOUNT }))}>
            Criar conta
          </Button>


          {!!user && <>
            <Spacing size="large" />
            <Button
              data-testid="button-history"
              onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.HISTORY }))}>
              Extrato
            </Button>

            <Spacing size="large" />
            <Button
              data-testid="button-deposit"
              onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.DEPOSIT }))}>
              Depositar
            </Button>

            <Spacing size="large" />
            <Button
              data-testid="button-withdrawal"
              onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.WITHDRAWAL }))}>
              Retirar
            </Button>

            <Spacing size="large" />
            <Button
              data-testid="button-payment"
              onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.PAYMENT }))}>
              Pagar
            </Button>

            <Spacing size="large" />
            <Button
              data-testid="button-transfer"
              onClick={() => setState((prev) => ({ ...prev, userAction: UserAction.TRANSFER }))}>
              Transferir
            </Button>
          </>}
        </div>

      </section>
    </div>
  );
}

export default App;
