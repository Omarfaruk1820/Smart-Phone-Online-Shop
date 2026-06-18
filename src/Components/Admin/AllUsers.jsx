import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaSearch,
  FaCrown,
} from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:5000/users";

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // UPDATE ROLE
  // =========================
  const updateRole = async (id, role) => {
    try {
      await axios.patch(`${API_URL}/role/${id}`, { role });

      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
    } catch (error) {
      console.log("Role update failed:", error.message);
    }
  };

  // =========================
  // FILTER USERS
  // =========================
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <FaUsers /> User Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customers and admin access in your e-commerce system
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-base-100 rounded-xl p-4 shadow flex items-center gap-4">
            <FaUsers className="text-3xl text-primary" />
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-2xl font-bold">{totalUsers}</h2>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4 shadow flex items-center gap-4">
            <FaCrown className="text-3xl text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Admins</p>
              <h2 className="text-2xl font-bold">{totalAdmins}</h2>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4 shadow flex items-center gap-4">
            <FaUser className="text-3xl text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Customers</p>
              <h2 className="text-2xl font-bold">{totalUsers - totalAdmins}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <FaSearch className="absolute top-4 left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-10"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= USERS GRID ================= */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No users found</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-base-100 rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg transition"
              >
                {/* LEFT USER INFO */}
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/2kR6Y5L/user.png"
                        }
                        alt="user"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>

                    <span
                      className={`badge mt-1 ${
                        user.role === "admin" ? "badge-error" : "badge-success"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateRole(user._id, "user")}
                    className="btn btn-sm btn-outline"
                  >
                    <FaUser /> User
                  </button>

                  <button
                    onClick={() => updateRole(user._id, "admin")}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaUserShield /> Admin
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
