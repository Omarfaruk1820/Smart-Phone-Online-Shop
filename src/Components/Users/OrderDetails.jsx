import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaFileInvoice,
  FaBox,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://smart-phone-online-shop-by-node.vercel.app/orders/detail/${id}`,
        );

        setOrder(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // ===================
  // DOWNLOAD PDF
  // ===================
  const downloadInvoice = async (orderId) => {
    try {
      setInvoiceLoading(true);

      window.open(`https://smart-phone-online-shop-by-node.vercel.app/orders/invoice/${orderId}`, "_blank");
    } finally {
      setInvoiceLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Order Not Found</h1>

        <Link className="btn btn-primary mt-6" to="/dashboard/my-orders">
          Back To My Orders
        </Link>
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Back */}
      <Link to="/dashboard/my-orders" className="btn btn-outline mb-8">
        <FaArrowLeft />
        Back
      </Link>

      <div className="card bg-base-100 shadow-xl border">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>

              <p className="mt-3 text-gray-500 break-all">
                Order ID : {order._id}
              </p>

              <p className="mt-2">
                Date : {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="mt-2">
                Payment Method :
                <span className="font-semibold ml-2">
                  {order.paymentMethod}
                </span>
              </p>
            </div>

            <div>
              {order.status === "pending" && (
                <span className="badge badge-warning badge-lg">Pending</span>
              )}

              {order.status === "processing" && (
                <span className="badge badge-info badge-lg">Processing</span>
              )}

              {order.status === "shipped" && (
                <span className="badge badge-secondary badge-lg">Shipped</span>
              )}

              {order.status === "delivered" && (
                <span className="badge badge-success badge-lg">Delivered</span>
              )}

              {order.status === "cancelled" && (
                <span className="badge badge-error badge-lg">Cancelled</span>
              )}
            </div>
          </div>

          {/* Tracking */}

          <div className="mt-10">
            <ul className="steps steps-vertical lg:steps-horizontal w-full">
              <li className="step step-primary">Order Placed</li>

              <li
                className={`step ${
                  ["processing", "shipped", "delivered"].includes(order.status)
                    ? "step-primary"
                    : ""
                }`}
              >
                Processing
              </li>

              <li
                className={`step ${
                  ["shipped", "delivered"].includes(order.status)
                    ? "step-primary"
                    : ""
                }`}
              >
                Shipped
              </li>

              <li
                className={`step ${
                  order.status === "delivered" ? "step-primary" : ""
                }`}
              >
                Delivered
              </li>
            </ul>
          </div>
          {/* Products */}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Ordered Products</h2>

            <div className="space-y-5">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 border rounded-2xl p-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>

                    <p className="text-gray-500 mt-2">Brand : {item.brand}</p>

                    <p className="mt-2">
                      Quantity :
                      <span className="font-semibold ml-2">
                        {item.quantity}
                      </span>
                    </p>

                    <p className="text-primary font-bold mt-2">
                      ৳{item.discountPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}

          <div className="card bg-base-200 mt-10 p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

            <p>
              Name :
              <span className="font-semibold ml-2">
                {order.shippingAddress?.name}
              </span>
            </p>

            <p className="mt-2">
              Phone :
              <span className="font-semibold ml-2">
                {order.shippingAddress?.phone}
              </span>
            </p>

            <p className="mt-2">
              Address :
              <span className="font-semibold ml-2">
                {order.shippingAddress?.address}
              </span>
            </p>
          </div>

          {/* Total + Invoice */}

          <div className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-5">
            <h1 className="text-3xl font-bold text-primary">
              Total : ৳{order.totalPrice}
            </h1>

            <button
              onClick={() => downloadInvoice(order._id)}
              disabled={invoiceLoading}
              className="btn btn-primary"
            >
              <FaFileInvoice />

              {invoiceLoading ? "Generating..." : "Download Invoice"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
