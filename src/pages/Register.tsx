import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleEmailRegister = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Cadastro realizado com sucesso!");
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      alert("Falha ao realizar cadastro. Tente novamente.");
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Cadastro com Google realizado com sucesso!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao fazer cadastro com Google: ", error);
      alert("Falha ao realizar cadastro com Google.");
    }
  };

  return (
    <div className="register-container">
      <h1>Cadastro</h1>
      <div className="input-group">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="input-field"
        />
      </div>
      <button className="email-register-btn" onClick={handleEmailRegister}>
        Cadastrar
      </button>
      <hr />
      <button className="google-register-btn" onClick={handleGoogleRegister}>
        Cadastrar com Google
      </button>
      <div className="login-link-container">
        <p>
          Já tem uma conta?{" "}
          <span onClick={() => navigate('/login')} className="login-link">
            Entre
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
