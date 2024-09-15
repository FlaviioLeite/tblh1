
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Despesa } from '../types';
import { auth } from '../firebaseConfig';
import '../styles/Despesas.css';
const Despesas: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "despesas"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const despesasData: Despesa[] = [];
        querySnapshot.forEach((doc) => {
          despesasData.push({ id: doc.id, ...(doc.data() as Omit<Despesa, 'id'>) });
        });
        setDespesas(despesasData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddDespesa = async () => {
    if (user && descricao && valor > 0) {
      try {
        await addDoc(collection(db, "despesas"), {
          userId: user.uid,
          descricao,
          valor,
          createdAt: new Date(),
        });
        setDescricao('');
        setValor(0);
      } catch (error) {
        console.error("Erro ao adicionar despesa: ", error);
      }
    }
  };

  const handleDeleteDespesa = async (id: string) => {
    try {
      await deleteDoc(doc(db, "despesas", id));
    } catch (error) {
      console.error("Erro ao deletar despesa: ", error);
    }
  };

  return (
    <div>
      <h2>Despesas</h2>
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
      <button onClick={handleAddDespesa}>Adicionar Despesa</button>
      <ul>
        {despesas.map((despesa) => (
          <li key={despesa.id}>
            {despesa.descricao} - R$ {despesa.valor.toFixed(2)}
            <button onClick={() => handleDeleteDespesa(despesa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Despesas;
