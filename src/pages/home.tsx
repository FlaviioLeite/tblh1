import React from 'react';
import '../styles/Home.css';
import Header from '../components/Header';
import Logo from "../logo.svg";
const Home: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />
      </div>
     
      <div className="container">
        <h1>Bem-vindo ao Gerenciador de Orçamento Pessoal</h1>
        <p>
          Este aplicativo permite que você gerencie suas receitas e despesas mensais de forma fácil e eficiente. 
          Adicione suas fontes de renda e despesas, visualize resumos e gráficos no dashboard e mantenha seu orçamento sempre sob controle.
        </p>
      </div>
    </div>
  );
};


export default Home;
