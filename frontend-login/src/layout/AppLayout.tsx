import { Outlet } from "react-router-dom";
import Sidebar from "../pages/dashboard/Sidebar";
import "./AppLayout.scss";

interface Props {
  onLogout: () => void;
}

const AppLayout: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className="layout">
      <Sidebar onLogout={onLogout} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
