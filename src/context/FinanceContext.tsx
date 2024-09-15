import { onAuthStateChanged } from "firebase/auth";
import {
  addTransaction,
  getUserTransactions,
} from "../services/financeService";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface FinanceContextProps {
  transactions: any[];
  addTransaction: (type: "income" | "expense", value: number) => void;
}

const FinanceContext = createContext<FinanceContextProps | undefined>(
  undefined
);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userTransactions = await getUserTransactions(user);
        setTransactions(userTransactions);
      } else {
        setTransactions([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addTransactionHandler = async (
    type: "income" | "expense",
    value: number
  ) => {
    if (user) {
      await addTransaction(user, type, value);
      const updatedTransactions = await getUserTransactions(user);
      setTransactions(updatedTransactions);
    }
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction: addTransactionHandler }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
