import React from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import CampaignTable from "./CampaignTable";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />

      <section className="stats-section">
        <StatsCard title="Gastos Totais" value="R$12.345" change="+5.2%" changeColor="green" />
        <StatsCard title="Impressões" value="1.2M" change="-1.8%" changeColor="red" />
        <StatsCard title="Cliques" value="87.5K" change="+12.1%" changeColor="green" />
        <StatsCard title="Conversões" value="2.1K" change="+8.9%" changeColor="green" />
      </section>

      <CampaignTable />
    </>
  );
};

export default Dashboard;
