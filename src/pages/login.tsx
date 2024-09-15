import React, { useState } from "react";
import { auth } from "../firebaseConfig"; 
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      alert("Falha ao fazer login. Verifique suas credenciais e tente novamente.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login com Google realizado com sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Erro ao fazer login com Google: ", error);
      alert("Falha ao fazer login com Google.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
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
      <button className="email-login-btn" onClick={handleEmailLogin}>
        Entrar
      </button>
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        Login com Google
      </button>
      <div className="register-link-container">
        <p>
          Não tem uma conta?{" "}
          <span onClick={() => navigate("/register")} className="register-link">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
