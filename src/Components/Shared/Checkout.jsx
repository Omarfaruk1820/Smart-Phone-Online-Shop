import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaTruck,
  FaTrash,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ======================
  // FETCH CART
  // ======================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/cart/${user.email}`
        );

        setCart(res.data || []);
      } catch (err) {
        console.log(err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchCart();
  }, [user]);

  // ======================
  // CALCULATION
  // ======================
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const shipping = subtotal > 2000 ? 0 : 80;
  const total = subtotal + shipping;

  // ======================
  // REMOVE ITEM
  // ======================
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);

      setCart((prev) => prev.filter((item) => item._id !== id));

      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item",err);
    }
  };

  // ======================
  // PLACE ORDER (MAIN LOGIC)
  // ======================
  const handlePlaceOrder = async () => {
    if (!name || !phone || !address) {
      toast.error("Please fill all fields");
      return;
    }

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    const order = {
      userEmail: user.email,
      items: cart,
      totalPrice: total,
      shippingAddress: {
        name,
        phone,
        address,
      },
      paymentMethod,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/orders", order);

      if (res.data.success) {
        toast.success("Order placed successfully 🎉", {
          position: "top-right",
        });

        setCart([]);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("Order failed. Try again.",error);
    }
  };

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* <Toaster position="top-right" /> */}

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mt-4"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* SHIPPING */}
            <div className="card bg-base-100 shadow p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FaMapMarkerAlt />
                Shipping Info
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="input input-bordered"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="input input-bordered"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <textarea
                className="textarea textarea-bordered w-full mt-4"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* PAYMENT */}
            <div className="card bg-base-100 shadow p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FaCreditCard />
                Payment Method
              </h2>

              <label className="flex gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>

            {/* CART ITEMS */}
            <div className="card bg-base-100 shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                Cart Items ({totalItems})
              </h2>

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b py-3"
                >
                  <img
                    src={item.image}
                    className="w-16 h-16 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-primary font-bold">
                      ৳{item.discountPrice}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="card bg-base-100 shadow p-6 h-fit sticky top-5">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳{shipping}</span>
            </div>

            <div className="flex justify-between font-bold border-t mt-2 pt-2">
              <span>Total</span>
              <span className="text-primary">৳{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="btn btn-primary w-full mt-6"
            >
              <FaTruck />
              Place Order
            </button>
          </div>
        </div>
      )}

        {/* <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#10B981",
              color: "#fff",
              borderRadius: "14px",
              fontWeight: "600",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "#fff",
              borderRadius: "14px",
            },
          },
        }}
      /> */}
    </div>
  );
};

export default Checkout;