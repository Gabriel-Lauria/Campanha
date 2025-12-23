import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as loginApi } from "../services/api";
import "../styles/Login.scss";

const Login: React.FC = () => {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginApi(usuarioNome, senha);

      login(data.user, data.token);
      navigate("/");
    } catch {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Usuário"
          value={usuarioNome}
          onChange={(e) => setUsuarioNome(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
