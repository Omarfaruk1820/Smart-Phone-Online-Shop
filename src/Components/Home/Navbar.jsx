import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaHome,
  FaMobileAlt,
  FaUser,
  FaList,
} from "react-icons/fa";

import useCartContext from "../Hook/useCart";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { cartCount } = useCartContext();

  const { user, role, loading, logOutUser } = useContext(AuthContext);

  const isAdmin = role === "admin";

  const userName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "User";

  const userPhoto =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=random`;
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOutUser();

      navigate("/");

      closeMobileMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark",
    );
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "All Mobiles",
      path: "/phones",
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

    {
      name: "Contact",
      path: "/contact",
    },

    {
      name: "Blog",
      path: "/blog",
    },
  ];

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow">
        <div className="skeleton h-10 w-full"></div>
      </div>
    );
  }
  return (
    <>
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 bg-base-100 shadow-md"
      >
        <div className="navbar max-w-7xl mx-auto">
          {/* LOGO */}
          <div className="navbar-start">
            <Link to="/" className="text-2xl font-bold text-primary">
              MobileHub
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-xl"
                        : "rounded-xl hover:bg-base-200"
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* CATEGORY DROPDOWN */}
              <li>
                <details>
                  <summary>Categories</summary>

                  <ul className="bg-base-100 rounded-box shadow">
                    <li>
                      <Link to="/phone/samsung">Samsung</Link>
                    </li>

                    <li>
                      <Link to="/brand/apple">Apple</Link>
                    </li>

                    <li>
                      <Link to="/brand/xiaomi">Xiaomi</Link>
                    </li>

                    <li>
                      <Link to="/brand/realme">Realme</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-3">
            {/* Dark Mode */}
            <button onClick={toggleTheme} className="btn btn-circle">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* CART */}
            {user && (
              <Link to="/cart" className="relative btn btn-ghost">
                <FaShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* USER */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  <img
                    src={userPhoto}
                    alt=""
                    className="w-10 h-10 rounded-full cursor-pointer border"
                  />
                </label>

                <ul className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-60">
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
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>

                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="bg-base-100 border-t p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg hover:bg-base-200"
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <button onClick={handleLogout} className="btn btn-error w-full">
                Logout
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t lg:hidden z-50">
        <div className="grid grid-cols-5 text-center py-2">
          <Link to="/">
            <FaHome className="mx-auto" />
          </Link>

          <Link to="/phones">
            <FaMobileAlt className="mx-auto" />
          </Link>

          <Link to="/categories">
            <FaList className="mx-auto" />
          </Link>

          <Link to="/cart">
            <FaShoppingCart className="mx-auto" />
          </Link>

          <Link to="/dashboard">
            <FaUser className="mx-auto" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
