import React from "react";
import "./Dashboard.scss";

const CampaignTable = () => {
  return (
    <section className="campaign-table">
      <div className="table-header">
        <h2>Todas as Campanhas</h2>
        <input type="text" placeholder="Pesquisar campanhas..." />
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Campanha</th>
              <th>Status</th>
              <th>Gasto</th>
              <th>Impressões</th>
              <th>Cliques</th>
              <th>Resultados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Campanha de Leads Q4</td>
              <td>Ativa</td>
              <td>R$ 2.500,00</td>
              <td>250.000</td>
              <td>12.345</td>
              <td>512 Leads</td>
              <td>...</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Promoção Black Friday</td>
              <td>Concluída</td>
              <td>R$ 5.000,00</td>
              <td>800.000</td>
              <td>45.123</td>
              <td>1.200 Vendas</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CampaignTable;
