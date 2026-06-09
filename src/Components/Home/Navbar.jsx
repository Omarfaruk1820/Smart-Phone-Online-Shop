import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const { user, loading, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Mobiles", path: "AllBrands" },
    // { name: "Brands", path: "/brands" },
    // { name: "Offers", path: "/offers" },
    { name: "Accessories", path: "/accessories" },

    ...(user
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
          },
        ]
      : []),

    { name: "Contact", path: "/contact" },
  ];

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      closeMobileMenu();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const userPhoto = user?.photoURL?.trim()
    ? user.photoURL
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.displayName || "User",
      )}&background=random`;

  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-base-100 shadow-md">
        <div className="container mx-auto px-4">
          <div className="navbar min-h-[72px]">
            <Link to="/" className="text-2xl font-bold text-primary">
              MobileHub
            </Link>

            <div className="ml-auto">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-[72px] px-0">
          {/* Logo */}
          <div className="navbar-start">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-extrabold text-primary"
            >
              MobileHub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-2 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-primary hover:text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end gap-2">
            {/* Search */}
            {/* <div className="hidden xl:flex relative">
              <input
                type="text"
                placeholder="Search smartphones..."
                className="input input-bordered w-72 pr-10"
              />

              <FaSearch className="absolute right-4 top-4 text-gray-500" />
            </div> */}

            {/* Cart */}
            <button className="btn btn-ghost btn-circle relative">
              <FaShoppingCart className="text-xl" />

              <span className="badge badge-error badge-sm absolute -top-1 -right-1">
                0
              </span>
            </button>

            {/* Desktop User */}
            {user ? (
              <div className="hidden md:flex items-center gap-1 ml-2">
                <img
                  src={userPhoto}
                  alt={user?.displayName || "User"}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName || "User",
                    )}&background=random`;
                  }}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                />

                <div className="hidden lg:flex flex-col max-w-[180px]">
                  <span className="font-semibold text-sm truncate">
                    {user?.displayName || "User"}
                  </span>

                  <span className="text-xs text-gray-500 truncate">
                    {user?.email}
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
            ) : (
              <Link
                to="/login"
                className="hidden md:flex btn btn-primary btn-sm"
              >
                <FaUserCircle />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-base-100 border-t ${
          isOpen ? "max-h-[900px]" : "max-h-0"
        }`}
      >
        <div className="p-4">
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 bg-base-200 rounded-xl p-4 mb-4">
              <img
                src={userPhoto}
                alt="User"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{user?.displayName || "User"}</h3>

                <p className="text-xs text-gray-500 break-all">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search smartphones..."
              className="input input-bordered w-full pr-10"
            />

            <FaSearch className="absolute right-4 top-4 text-gray-500" />
          </div>

          {/* Mobile Links */}
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Auth */}
          <div className="mt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-error w-full text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="btn btn-primary w-full"
              >
                <FaUserCircle />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
