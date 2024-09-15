import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Receitas from "../components/Receitas";
import Despesas from "../components/Despesas";
import Header from "../components/Header";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/Dashboard.css";
import "../styles/Navbar.css";
import Logo from "../logo.svg";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDy3bOdXpHKT_8P1KV5QXhSZ1cKtqSfj_w",
  authDomain: "orcamentopessoal-7751d.firebaseapp.com",
  projectId: "orcamentopessoal-7751d",
  storageBucket: "orcamentopessoal-7751d.appspot.com",
  messagingSenderId: "426338387611",
  appId: "1:426338387611:web:1ecd67f93a1b9683d9a83e",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

Chart.register(ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [receitas, setReceitas] = useState<any[]>([]);
  const [despesas, setDespesas] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar o usuário autenticado
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/login"); // Redirecionar se o usuário não estiver logado
      }
    });

    return () => unsubscribeAuth();
  }, [auth, navigate]);

  useEffect(() => {
    if (userId) {
      // Obter receitas
      const unsubscribeReceitas = onSnapshot(query(collection(db, "receitas"), where("userId", "==", userId)), (snapshot) => {
        const receitasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Dados recebidos da coleção receitas:", receitasData);
        setReceitas(receitasData);
      }, (error) => {
        console.error("Erro ao obter dados da coleção receitas:", error);
      });

      // Obter despesas
      const unsubscribeDespesas = onSnapshot(query(collection(db, "despesas"), where("userId", "==", userId)), (snapshot) => {
        const despesasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Dados recebidos da coleção despesas:", despesasData);
        setDespesas(despesasData);
      }, (error) => {
        console.error("Erro ao obter dados da coleção despesas:", error);
      });

      return () => {
        unsubscribeReceitas();
        unsubscribeDespesas();
      };
    }
  }, [userId]);

  console.log("Dados receitas:", receitas);
  console.log("Dados despesas:", despesas);

  // Calcular totais
  const totalReceitas = receitas.reduce((acc, receita) => acc + (Number(receita.valor) || 0), 0);
  const totalDespesas = despesas.reduce((acc, despesa) => acc + (Number(despesa.valor) || 0), 0);
  const saldo = totalReceitas - totalDespesas;

  const data = useMemo(
    () => ({
      labels: ["Receitas", "Despesas", "Saldo"],
      datasets: [
        {
          label: "Valores",
          data: [totalReceitas, totalDespesas, saldo],
          backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
          borderColor: ["#ffffff", "#ffffff", "#ffffff"],
          borderWidth: 1,
        },
      ],
    }),
    [totalReceitas, totalDespesas, saldo]
  );

  return (
    <div className="dashboard">
      <div className="header">
        <Header />
      </div>
      <h1>Dashboard</h1>
      <div className="doughnut-chart-container">
        <Doughnut data={data} className="doughnut-chart" />
      </div>
      <h2>Resumo</h2>
      <p>Total de Receitas: R$ {totalReceitas.toFixed(2)}</p>
      <p>Total de Despesas: R$ {totalDespesas.toFixed(2)}</p>
      <p>Saldo: R$ {saldo.toFixed(2)}</p>
      <div className="receitas">
        <Receitas />
      </div>
      <div className="despesas">
        <Despesas />
      </div>
    </div>
  );
};

export default Dashboard;
