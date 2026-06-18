import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingBag,
  FaUserCircle,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";

const DashboardSidebar = ({ closeDrawer }) => {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-64 p-4">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const activeClass = "bg-primary text-white rounded-lg font-medium";

  const normalClass = "rounded-lg hover:bg-base-300 duration-300";

  return (
    <div className="drawer-side z-40">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-72 min-h-full bg-base-100 border-r">
        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-primary">MobileHub</h2>

          <p className="text-sm text-gray-500">
            {role === "admin" ? "Administrator Panel" : "Customer Panel"}
          </p>
        </div>

        {/* MENU */}
        <ul className="menu p-4 gap-2">
          {/* ADMIN MENU */}
          {role === "admin" ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/add-product"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaPlusCircle />
                  Add Product
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-products"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaBoxOpen />
                  Manage Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-users"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaUsers />
                  All Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-orders"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaClipboardList />
                  All Orders
                </NavLink>
              </li>

              {/* USER MENU */}
              <li>
                <NavLink
                  to="/dashboard/user"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaUserCircle />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-orders"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaShoppingBag />
                  My Orders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/wishlist"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaHeart />
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaUserCircle />
                  My Profile
                </NavLink>
              </li>

              {/* COMMON */}
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("dashboard-drawer").checked = false;
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaHome />
                  Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* USER MENU */}
              <li>
                <NavLink
                  to="/dashboard/user"
                  onClick={() => {
                    if (window.innerWidth < 1024) closeDrawer?.();
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaUserCircle />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-orders"
                  onClick={() => {
                    if (window.innerWidth < 1024) closeDrawer?.();
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaShoppingBag />
                  My Orders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/wishlist"
                  onClick={() => {
                    if (window.innerWidth < 1024) closeDrawer?.();
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaHeart />
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  onClick={() => {
                    if (window.innerWidth < 1024) closeDrawer?.();
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaUserCircle />
                  My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* COMMON */}
          <li>
            <NavLink
              to="/"
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
