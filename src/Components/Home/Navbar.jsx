import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const { user, loading, logOutUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Temporary Admin Check
  const role =
    user?.email === "admin@gmail.com"
      ? "admin"
      : "user";

  const isAdmin = role === "admin";

  const navbarTheme = isAdmin
    ? "bg-indigo-600"
    : "bg-emerald-600";

  const userPhoto =
    user?.photoURL ||
    user?.providerData?.[0]?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName ||
        user?.email ||
        "User"
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
            path: "/dashboard/admin",
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
      <div className="navbar bg-base-100 shadow">
        <div className="container mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className={`text-xl md:text-2xl font-bold text-white px-4 py-2 rounded-xl ${navbarTheme}`}
          >
            MobileHub
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${navbarTheme} text-white rounded-lg`
                      : "rounded-lg"
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
        <div className="navbar-end gap-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm"
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
            <div className="hidden md:flex items-center gap-3">
              <img
                src={userPhoto}
                alt={user?.displayName || "User"}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName ||
                        user?.email ||
                        "User"
                    )}&background=random&size=256`;
                }}
                className="w-11 h-11 rounded-full border-2 border-primary object-cover"
              />

              <div className="hidden lg:block">
                <h3 className="font-semibold text-sm">
                  {user?.displayName}
                </h3>

                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>

                <span
                  className={`badge badge-xs mt-1 ${
                    isAdmin
                      ? "badge-secondary"
                      : "badge-success"
                  }`}
                >
                  {isAdmin ? "Admin" : "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen ? (
              <FaTimes size={22} />
            ) : (
              <FaBars size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[1000px]"
            : "max-h-0"
        }`}
      >
        <div className="bg-base-100 border-t p-4">
          {user && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-base-200 mb-4">
              <img
                src={userPhoto}
                alt={user?.displayName || "User"}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />

              <div>
                <h3 className="font-semibold">
                  {user?.displayName}
                </h3>

                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>

                <div className="mt-1">
                  {isAdmin ? (
                    <span className="badge badge-secondary">
                      <FaUserShield />
                      Admin
                    </span>
                  ) : (
                    <span className="badge badge-success">
                      <FaTachometerAlt />
                      User
                    </span>
                  )}
                </div>
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
                    `flex items-center gap-2 px-4 py-3 rounded-xl ${
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

          <div className="mt-4">
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
                className="btn btn-error w-full text-white"
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