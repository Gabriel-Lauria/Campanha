import { Link } from "react-router-dom";

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <aside className="sidebar">
      <h2>Ads Admin</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/users">Usuários</Link>
      </nav>
      <button onClick={onLogout}>Sair</button>
    </aside>
  );
};

export default Sidebar;
