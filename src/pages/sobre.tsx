// src/pages/Sobre.tsx
import React from "react";
import Header from "../components/Header";
import "../styles/sobre.css";
import Logo from "../logo.svg";

const Sobre: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <h1>Sobre o Desenvolvedor</h1>
      <div className="container">
        <p>
          Este site foi criado por Flavio Emanuel Leite Pinto, desenvolvedor
          apaixonado por criar soluções que facilitam o dia a dia. Com foco em
          usabilidade e eficiência, o Gerenciador de Orçamento Pessoal foi
          desenvolvido para ajudar indivíduos a manterem suas finanças
          organizadas.
        </p>
      </div>
    </div>
  );
};

export default Sobre;
