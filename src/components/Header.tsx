import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.error("Erro ao sair: ", error));
  };

  return (
    <nav className={className} style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/home" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
      <Link to="/sobre" style={{ marginRight: '10px' }}>Sobre</Link>
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
};

export default Header;
