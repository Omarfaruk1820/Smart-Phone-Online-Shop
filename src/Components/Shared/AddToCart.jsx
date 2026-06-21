import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaLock,
  FaTruck,
  FaShoppingBag,
  FaHeart,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const AddToCart = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { cart, isLoading, refetch } = useCart();

  // =========================
  // Coupon States
  // =========================
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  // =========================
  // Save For Later
  // =========================
  const [savedProducts, setSavedProducts] = useState([]);

  // =========================
  // Recommended Products
  // =========================
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // =========================
  // Cart Calculations
  // =========================
  const subtotal = cart.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0,
  );

  const shipping = subtotal > 50000 ? 0 : 120;

  const finalTotal = subtotal + shipping - discountAmount;

  // =========================
  // Free Shipping Progress
  // =========================
  const freeShippingTarget = 50000;

  const remainingAmount = freeShippingTarget - subtotal;

  const progressPercentage = Math.min(
    (subtotal / freeShippingTarget) * 100,
    100,
  );

  // =========================
  // Increase Quantity Mutation
  // =========================
  const increaseMutation = useMutation({
    mutationFn: (id) =>
      axios.patch(`http://localhost:5000/cart/increase/${id}`),

    onSuccess: () => {
      refetch();

      toast.success("Quantity Updated");
    },

    onError: () => {
      toast.error("Failed To Update Quantity");
    },
  });

  // =========================
  // Decrease Quantity Mutation
  // =========================
  const decreaseMutation = useMutation({
    mutationFn: (id) =>
      axios.patch(`http://localhost:5000/cart/decrease/${id}`),

    onSuccess: () => {
      refetch();
    },

    onError: () => {
      toast.error("Minimum Quantity Is 1");
    },
  });

  // =========================
  // Delete Product Mutation
  // =========================
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/cart/${id}`),

    onSuccess: () => {
      refetch();

      toast.success("Product Removed");
    },

    onError: () => {
      toast.error("Delete Failed");
    },
  });

  // =========================
  // Clear Cart Mutation
  // =========================
  const clearCartMutation = useMutation({
    mutationFn: () =>
      axios.delete(`http://localhost:5000/cart/clear/${user.email}`),

    onSuccess: () => {
      refetch();

      toast.success("Cart Cleared Successfully");
    },

    onError: () => {
      toast.error("Failed To Clear Cart");
    },
  });
  // =========================
  // Recommended Products Fetch
  // =========================
  useEffect(() => {
    axios
      .get("http://localhost:5000/phones")
      .then((res) => {
        setRecommendedProducts(res.data?.phones?.slice(0, 4) || []);
      })
      .catch(() => {
        setRecommendedProducts([]);
      });
  }, []);

  // =========================
  // Coupon Apply Function
  // =========================
  const handleCouponApply = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") {
      setDiscountAmount(subtotal * 0.1);

      setAppliedCoupon("SAVE10");

      toast.success("10% discount applied");
    } else if (code === "SAVE20") {
      setDiscountAmount(subtotal * 0.2);

      setAppliedCoupon("SAVE20");

      toast.success("20% discount applied");
    } else {
      setDiscountAmount(0);

      setAppliedCoupon("");

      toast.error("Invalid coupon code");
    }
  };

  // =========================
  // Increase Quantity
  // =========================
  const handleIncrease = (id) => {
    increaseMutation.mutate(id);
  };

  // =========================
  // Decrease Quantity
  // =========================
  const handleDecrease = (id) => {
    decreaseMutation.mutate(id);
  };

  // =========================
  // Delete Product
  // =========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Product?",
      text: "This item will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // =========================
  // Clear Cart
  // =========================
  const handleClearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "All products will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCartMutation.mutate();
      }
    });
  };

  // =========================
  // Save For Later
  // =========================
  const handleSaveForLater = (item) => {
    const exists = savedProducts.find((product) => product._id === item._id);

    if (exists) {
      toast.error("Already Saved");

      return;
    }

    setSavedProducts([...savedProducts, item]);

    handleDelete(item._id);

    toast.success("Moved To Saved For Later");
  };
  // =========================
  // Loading UI
  // =========================
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="space-y-5">
          <div className="skeleton h-40"></div>
          <div className="skeleton h-40"></div>
          <div className="skeleton h-40"></div>
        </div>
      </section>
    );
  }

  // =========================
  // Empty Cart UI
  // =========================
  if (cart.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaShoppingBag className="mx-auto text-8xl text-gray-400" />

          <h2 className="text-4xl font-bold mt-6">Your Cart Is Empty</h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything yet.
          </p>

          <Link to="/" className="btn btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  // =========================
  // Main Return
  // =========================
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="max-w-7xl mx-auto px-4 py-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>

          <p className="text-gray-500 mt-2">{cart.length} Products</p>
        </div>

        <Link to="/" className="btn btn-outline">
          <FaArrowLeft />
          Continue Shopping
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{
                scale: 1.01,
              }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-contain"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    {/* Name */}
                    <h2 className="font-bold text-2xl">{item.name}</h2>

                    {/* Brand */}
                    <p className="text-primary mt-2">{item.brand}</p>

                    {/* Price */}
                    <div className="text-2xl font-bold mt-4">
                      ৳{item.discountPrice}
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 mt-6">
                      {/* Minus */}
                      <button
                        className="btn btn-outline"
                        onClick={() => handleDecrease(item._id)}
                      >
                        <FaMinus />
                      </button>

                      <span className="font-bold text-lg">{item.quantity}</span>

                      {/* Plus */}
                      <button
                        className="btn btn-outline"
                        onClick={() => handleIncrease(item._id)}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error btn-sm"
                      >
                        <FaTrash />
                        Delete
                      </button>

                      {/* Save For Later */}
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleSaveForLater(item)}
                      >
                        <FaHeart />
                        Save For Later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Right Side */}
        <div>
          {/* Sticky Payment Summary */}
          <div className="card bg-base-100 shadow-xl sticky top-24">
            <div className="card-body">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              {/* Coupon */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Coupon Code</h3>

                <div className="join w-full">
                  <input
                    type="text"
                    className="input input-bordered join-item flex-1"
                    placeholder="Enter coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />

                  <button
                    className="btn btn-primary join-item"
                    onClick={handleCouponApply}
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <p className="text-success mt-3">
                    Coupon Applied: {appliedCoupon}
                  </p>
                )}
              </div>

              {/* Free Shipping Progress */}
              <div className="mt-8">
                <p className="text-sm mb-3">
                  {remainingAmount > 0
                    ? `Spend ৳${remainingAmount} more to get FREE shipping`
                    : "Congratulations! FREE Shipping unlocked"}
                </p>

                <progress
                  className="progress progress-success w-full"
                  value={progressPercentage}
                  max="100"
                ></progress>
              </div>

              {/* Payment Summary */}
              <div className="space-y-5 mt-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>৳{shipping}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>

                  <span>-৳{discountAmount}</span>
                </div>

                <div className="divider"></div>

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span className="text-primary">৳{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="btn btn-primary w-full mt-8"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>

              {/* Clear Cart */}
              <button
                className="btn btn-error w-full mt-3"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>

              <div className="divider"></div>

              {/* Features */}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-success" />
                  Fast Delivery
                </div>

                <div className="flex items-center gap-3">
                  <FaLock className="text-primary" />
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Products */}
      {savedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Saved For Later</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {savedProducts.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="font-bold">{product.name}</h2>

                  <p className="text-primary">৳{product.discountPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Recommended Products</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 object-contain p-5"
                />
              </figure>

              <div className="card-body">
                <h2 className="line-clamp-2 font-bold">{product.name}</h2>

                <p className="text-primary font-bold">
                  ৳{product.discountPrice}
                </p>

                <Link
                  to={`/phone/${product.slug}`}
                  className="btn btn-primary btn-sm mt-3"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AddToCart;
