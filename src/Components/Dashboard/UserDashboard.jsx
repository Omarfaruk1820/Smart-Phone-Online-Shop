import { useOutletContext } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaBox, FaUser } from "react-icons/fa";

const UserDashboard = () => {
  const { closeDrawer } = useOutletContext() || {};

  const stats = [
    {
      title: "My Orders",
      count: 12,
      icon: <FaShoppingBag />,
      color: "bg-gradient-to-r from-emerald-500 to-green-600",
    },
    {
      title: "Wishlist",
      count: 8,
      icon: <FaHeart />,
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
    },
    {
      title: "Cart Items",
      count: 5,
      icon: <FaBox />,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      title: "Profile Views",
      count: 24,
      icon: <FaUser />,
      color: "bg-gradient-to-r from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">User Dashboard</h1>

          <p className="text-gray-500 text-sm">
            Manage your orders, wishlist and profile
          </p>
        </div>

        {/* OPTIONAL BUTTON */}
        <button
          onClick={() => closeDrawer?.()}
          className="btn btn-sm btn-outline md:hidden"
        >
          Close Menu
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`${item.color} text-white p-5 rounded-2xl shadow flex justify-between items-center`}
          >
            <div>
              <p className="text-sm opacity-90">{item.title}</p>
              <h2 className="text-3xl font-bold">{item.count}</h2>
            </div>

            <div className="text-3xl opacity-80">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* QUICK SECTION */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="card-title">Recent Orders</h2>
            <p className="text-sm text-gray-500">View your latest purchases</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="card-title">Wishlist</h2>
            <p className="text-sm text-gray-500">Saved items for later</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
