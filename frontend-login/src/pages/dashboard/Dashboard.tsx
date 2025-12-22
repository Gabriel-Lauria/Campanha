import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCard from "./StatsCard";
import CampaignTable from "./CampaignTable";
import "./Dashboard.scss";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-main">
        <div className="dashboard-container">
          <Header />
          <section className="stats-section">
            <StatsCard title="Gastos Totais" value="R$12.345" change="+5.2%" changeColor="green" />
            <StatsCard title="Impressões" value="1.2M" change="-1.8%" changeColor="red" />
            <StatsCard title="Cliques" value="87.5K" change="+12.1%" changeColor="green" />
            <StatsCard title="Conversões Principais" value="2.1K" change="+8.9%" changeColor="green" />
          </section>
          <CampaignTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
