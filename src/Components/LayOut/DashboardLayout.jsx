import { Outlet } from "react-router-dom";
// import DashboardSidebar from "../Dashboard/DashboardSidebar";
import DashboardSidebar from "./../Dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-base-100">
        <div className="navbar bg-base-200 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            ☰
          </label>

          <h2 className="text-xl font-bold ml-2">Dashboard</h2>
        </div>

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;
