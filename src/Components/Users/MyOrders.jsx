import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import { FaFileInvoice, FaEye, FaShoppingBag } from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH ORDERS
  // ==========================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/orders/${user.email}`,
        );

        setOrders(res.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  // ==========================
  // DOWNLOAD PDF
  // ==========================
  const downloadInvoice = (orderId) => {
    window.open(`http://localhost:5000/orders/invoice/${orderId}`, "_blank");
  };

  // ==========================
  // LOADING
  // ==========================
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <FaShoppingBag />
          My Orders
        </h1>

        <p className="text-gray-500 mt-3">
          View your order history and download invoices.
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="card bg-base-100 shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold">No Orders Found</h2>

          <p className="text-gray-500 mt-3">
            You haven't placed any orders yet.
          </p>

          <Link to="/" className="btn btn-primary mt-5">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                {/* Top */}
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left */}
                  <div className="space-y-2">
                    <h2 className="font-bold text-xl">Order ID:</h2>

                    <p className="text-sm break-all text-gray-500">
                      {order._id}
                    </p>

                    <p>
                      Total Price :
                      <span className="font-bold text-primary ml-2">
                        ৳{order.totalPrice}
                      </span>
                    </p>

                    <p>
                      Payment :
                      <span className="ml-2">{order.paymentMethod}</span>
                    </p>

                    <p>
                      Date :
                      <span className="ml-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col gap-3">
                    {/* Status */}
                    <div>
                      {order.status === "pending" && (
                        <span className="badge badge-warning badge-lg">
                          Pending
                        </span>
                      )}

                      {order.status === "processing" && (
                        <span className="badge badge-info badge-lg">
                          Processing
                        </span>
                      )}

                      {order.status === "shipped" && (
                        <span className="badge badge-secondary badge-lg">
                          Shipped
                        </span>
                      )}

                      {order.status === "delivered" && (
                        <span className="badge badge-success badge-lg">
                          Delivered
                        </span>
                      )}

                      {order.status === "cancelled" && (
                        <span className="badge badge-error badge-lg">
                          Cancelled
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/dashboard/orders-detail/${order._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                      {/* <Link
                        to={`/orders/detail/${order._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <FaEye />
                        View Details
                      </Link> */}

                      <button
                        onClick={() => downloadInvoice(order._id)}
                        className="btn btn-outline btn-sm"
                      >
                        <FaFileInvoice />
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="divider"></div>

                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-1">
                          {item.name}
                        </h3>

                        <p className="text-gray-500">Qty : {item.quantity}</p>

                        <p className="font-bold text-primary">
                          ৳{item.discountPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
