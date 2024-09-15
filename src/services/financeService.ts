import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { User } from 'firebase/auth';


export const addTransaction = async (user: User, type: 'income' | 'expense', value: number) => {
  try {
    await addDoc(collection(db, 'transactions'), {
      userId: user.uid,
      type,
      value,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding transaction: ", error);
  }
};


export const getUserTransactions = async (user: User) => {
  const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
  const querySnapshot = await getDocs(q);
  let transactions: any[] = [];
  querySnapshot.forEach((doc) => {
    transactions.push({ id: doc.id, ...doc.data() });
  });
  return transactions;
};
