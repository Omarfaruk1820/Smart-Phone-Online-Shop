import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="drawer-side">

      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <ul className="menu p-4 w-72 min-h-full bg-base-200">

        <div className="mb-6">

          <img
            src={user.photo}
            alt=""
            className="w-16 h-16 rounded-full"
          />

          <h2 className="font-bold mt-2">
            {user.name}
          </h2>

          <p>{user.role}</p>

        </div>

        {
          user.role === "admin" ? (
            <>
              <li>
                <NavLink to="/dashboard/admin">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-users">
                  Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-products">
                  Manage Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manage-orders">
                  Manage Orders
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/user">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-orders">
                  My Orders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/wishlist">
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/profile">
                  Profile
                </NavLink>
              </li>
            </>
          )
        }

      </ul>
    </div>
  );
};

export default Sidebar;