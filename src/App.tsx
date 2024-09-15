import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import Login from "./pages/login";
import Register from "./pages/Register";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FinanceProvider } from "./context/FinanceContext"; 

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  return (
    <FinanceProvider> 
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />

          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<div>404 - Página Não Encontrada</div>} />
        </Routes>
      </Router>
    </FinanceProvider>
  );
};

export default App;
