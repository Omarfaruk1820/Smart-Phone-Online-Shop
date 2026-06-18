import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserShield,
  FaUserCircle,
  FaStore,
  FaTachometerAlt,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user, role, loading, logOutUser } = useContext(AuthContext);

  const isAdmin = role === "admin";

  const navbarTheme = isAdmin ? "bg-indigo-600" : "bg-emerald-600";

  const userName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "User";

  const userPhoto =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=random&size=256`;

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Mobiles",
      path: "/allbrands",
    },
    {
      name: "Accessories",
      path: "/accessories",
    },

    ...(user
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
          },
        ]
      : []),

    ...(user && isAdmin
      ? [
          {
            name: "Admin Panel",
            path: "/admin",
          },
        ]
      : []),

    ...(user
      ? [
          {
            name: "Cart",
            path: "/cart",
            icon: <FaShoppingCart />,
          },
        ]
      : []),

    {
      name: "Contact",
      path: "/contact",
    },

    {
      name: "Blog",
      path: "/blog",
    },
  ];

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/");
      closeMobileMenu();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-base-100 border-b shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl text-white font-bold text-xl md:text-2xl ${navbarTheme}`}
          >
            <span className="flex items-center gap-2">
              <FaStore />
              MobileHub
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2 duration-300 ${
                      isActive
                        ? `${navbarTheme} text-white`
                        : "hover:bg-base-200"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm hidden sm:flex"
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`btn btn-sm border-none text-white ${navbarTheme}`}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* User Info */}
              <div className="hidden lg:flex flex-col text-right">
                <h4 className="font-semibold text-sm">{userName}</h4>

                <p className="text-xs text-gray-500">{user?.email}</p>

                <span
                  className={`text-xs font-medium ${
                    role === "admin"
                      ? "text-purple-600"
                      : role === "seller"
                        ? "text-orange-500"
                        : "text-green-600"
                  }`}
                >
                  {role?.toUpperCase()}
                </span>
              </div>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <img
                    src={userPhoto}
                    alt="user"
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                  />
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-72 z-[100]"
                >
                  <div className="border-b pb-3 mb-3">
                    <h3 className="font-bold">{userName}</h3>

                    <p className="text-sm text-gray-500 break-all">
                      {user?.email}
                    </p>

                    <span
                      className={`badge mt-2 gap-2 ${
                        role === "admin"
                          ? "badge-secondary"
                          : role === "seller"
                            ? "badge-warning"
                            : "badge-success"
                      }`}
                    >
                      {role === "admin" ? (
                        <>
                          <FaUserShield />
                          Admin
                        </>
                      ) : role === "seller" ? (
                        <>
                          <FaTachometerAlt />
                          Seller
                        </>
                      ) : (
                        <>
                          <FaUserCircle />
                          Customer
                        </>
                      )}
                    </span>
                  </div>

                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>

                  {isAdmin && (
                    <li>
                      <Link to="/admin">Admin Panel</Link>
                    </li>
                  )}

                  <li>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost lg:hidden"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="bg-base-100 border-t px-4 py-5">
          {user && (
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl mb-5">
              <img
                src={userPhoto}
                alt=""
                className="w-14 h-14 rounded-full border-2 border-primary"
              />

              <div>
                <h3 className="font-semibold">{userName}</h3>

                <p className="text-xs text-gray-500 break-all">{user?.email}</p>

                <span
                  className={`badge mt-2 ${
                    role === "admin"
                      ? "badge-secondary"
                      : role === "seller"
                        ? "badge-warning"
                        : "badge-success"
                  }`}
                >
                  {role || "customer"}
                </span>
              </div>
            </div>
          )}

          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl duration-300 ${
                      isActive
                        ? `${navbarTheme} text-white`
                        : "hover:bg-base-200"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="btn btn-outline"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className={`btn text-white border-none ${navbarTheme}`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-error text-white w-full"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
