// src/pages/login/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../services/api";

import "./Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginApi(usuario, senha);
      setUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErro("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p className="error">{erro}</p>}
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
