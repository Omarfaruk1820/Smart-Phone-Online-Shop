import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/orders/status/${id}`, {
        status,
      });

      toast.success("Status updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:5000/orders/${id}`);
    toast.success("Order deleted");
    fetchOrders();
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card shadow p-4 bg-base-100 flex justify-between"
          >
            <div>
              <p className="font-bold">{order.userEmail}</p>
              <p>Total: ৳{order.totalPrice}</p>
              <p>Status: {order.status}</p>
            </div>

            <div className="flex gap-2 items-center">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="select select-bordered select-sm"
              >
                <option>pending</option>
                <option>processing</option>
                <option>shipped</option>
                <option>delivered</option>
              </select>

              <button
                onClick={() => deleteOrder(order._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
