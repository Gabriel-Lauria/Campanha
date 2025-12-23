import { Outlet } from "react-router-dom";
import Sidebar from "../pages/dashboard/Sidebar";
import "./AppLayout.scss";

interface Props {
  onLogout: () => void;
}

const AppLayout: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
