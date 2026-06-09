import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const role = "user"; // change to "user"

  return (
    <div className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
        <h2 className="text-2xl font-bold mb-6">Shoe Dashboard</h2>

        {role === "admin" ? (
          <>
            <li>
              <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-products">Manage Products</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/dashboard/user">User Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-orders">My Orders</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
