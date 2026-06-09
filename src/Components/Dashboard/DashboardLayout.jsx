import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/Dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            ☰
          </label>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;