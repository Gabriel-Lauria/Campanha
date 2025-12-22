import React from "react";
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
        <a href="#">Usuário</a>
        <a href="#">Dashboard</a>
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
