import { createContext, useState } from "react"
import { AccountOption } from "../api/models"

type AccountsContextType = {
  accountsOptions: AccountOption[];
  setAccountsOptions: React.Dispatch<React.SetStateAction<AccountOption[]>>;
};

export const AccountsContext = createContext({} as AccountsContextType);

export const AccountsContextProvider: React.FC = ({ children }) => {
  const [accountsOptions, setAccountsOptions] = useState<AccountOption[]>([]);
  const value = { accountsOptions, setAccountsOptions };

  return <AccountsContext.Provider value={value}>
    { children }
  </AccountsContext.Provider>
};
