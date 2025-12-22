import React from "react";
import "./Dashboard.scss";

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Visão Geral das Campanhas</h1>
        <p>Acompanhe o desempenho de suas campanhas em um só lugar.</p>
      </div>
      <div className="header-right">
        <button className="filter-btn">Últimos 7 dias</button>
        <button className="create-campaign-btn">+ Criar Campanha</button>
      </div>
    </header>
  );
};

export default Header;
