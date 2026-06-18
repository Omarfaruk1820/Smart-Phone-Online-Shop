import { Outlet } from "react-router-dom";
import { useState } from "react";
import DashboardSidebar from "../Components/Dashboard/DashboardSidebar";

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={(e) => setDrawerOpen(e.target.checked)}
      />

      <div className="drawer-content">
        <Outlet context={{ closeDrawer }} />
      </div>

      {/* ✅ IMPORTANT: PASS PROP */}
      <DashboardSidebar closeDrawer={closeDrawer} />
    </div>
  );
};

export default DashboardLayout;
