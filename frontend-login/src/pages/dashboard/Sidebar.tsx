import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const username = localStorage.getItem("username") || "Usuário";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">Meta Campaigns</div>
        <p className="username">Olá, {username}</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Usuários</Link>
        <a href="#">Campanhas</a>
        <a href="#">Relatórios</a>
        <a href="#">Configurações</a>
      </nav>

      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
