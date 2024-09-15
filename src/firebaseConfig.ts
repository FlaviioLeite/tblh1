
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy3bOdXpHKT_8P1KV5QXhSZ1cKtqSfj_w",
  authDomain: "orcamentopessoal-7751d.firebaseapp.com",
  projectId: "orcamentopessoal-7751d",
  storageBucket: "orcamentopessoal-7751d.appspot.com",
  messagingSenderId: "426338387611",
  appId: "1:426338387611:web:1ecd67f93a1b9683d9a83e"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
