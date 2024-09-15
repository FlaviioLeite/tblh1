
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Receita } from '../types';
import { auth } from '../firebaseConfig';
import '../styles/Receitas.css';
const Receitas: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [receitas, setReceitas] = useState<Receita[]>([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "receitas"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const receitasData: Receita[] = [];
        querySnapshot.forEach((doc) => {
          receitasData.push({ id: doc.id, ...(doc.data() as Omit<Receita, 'id'>) });
        });
        setReceitas(receitasData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddReceita = async () => {
    if (user && descricao && valor > 0) {
      try {
        await addDoc(collection(db, "receitas"), {
          userId: user.uid,
          descricao,
          valor,
          createdAt: new Date(),
        });
        setDescricao('');
        setValor(0);
      } catch (error) {
        console.error("Erro ao adicionar receita: ", error);
      }
    }
  };

  const handleDeleteReceita = async (id: string) => {
    try {
      await deleteDoc(doc(db, "receitas", id));
    } catch (error) {
      console.error("Erro ao deletar receita: ", error);
    }
  };

  return (
    <div>
      <h2>Receitas</h2>
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <button onClick={handleAddReceita}>Adicionar Receita</button>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            {receita.descricao} - R$ {receita.valor.toFixed(2)}
            <button onClick={() => handleDeleteReceita(receita.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receitas;
