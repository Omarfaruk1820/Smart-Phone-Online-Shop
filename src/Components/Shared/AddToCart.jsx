import { useMemo, useState } from "react";
import moment from "moment";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
  FaTruck,
  FaTag,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      name: "Samsung Galaxy S25 Ultra",
      brand: "Samsung",
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/bd/2501/gallery/bd-galaxy-s25-ultra-s938-sm-s938bzkgbkd-thumb-544701539",
      price: 320,
      discountPrice: 298,
      quantity: 1,
    },
    {
      _id: 2,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      image:
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg",
      price: 450,
      discountPrice: 429,
      quantity: 1,
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Totals
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <section className="bg-base-200 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <FaShoppingBag className="text-primary" />
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-2">
              {cartItems.length} Items in your cart
            </p>
          </div>

          <Link to="/" className="btn btn-outline">
            <FaArrowLeft />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center py-20">
                  <FaShoppingBag className="text-6xl text-gray-400" />
                  <h2 className="text-3xl font-bold mt-4">
                    Your Cart is Empty
                  </h2>
                  <p className="text-gray-500">
                    Add some products to start shopping.
                  </p>

                  <Link to="/" className="btn btn-primary mt-6">
                    Shop Now
                  </Link>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full md:w-40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{item.name}</h2>

                        <p className="text-gray-500">Brand: {item.brand}</p>

                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-2xl font-bold text-primary">
                            ${item.discountPrice}
                          </span>

                          <span className="line-through text-gray-400">
                            ${item.price}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mt-6">
                          <div className="join">
                            <button
                              className="btn join-item"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              <FaMinus />
                            </button>

                            <button className="btn join-item">
                              {item.quantity}
                            </button>

                            <button
                              className="btn join-item"
                              onClick={() => increaseQuantity(item._id)}
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item._id)}
                            className="btn btn-error btn-outline"
                          >
                            <FaTrash />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-primary">
                          ${(item.discountPrice * item.quantity).toFixed(2)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side */}
          <div>
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                {/* Coupon */}
                <div className="mt-5">
                  <label className="font-medium flex items-center gap-2 mb-2">
                    <FaTag />
                    Coupon Code
                  </label>

                  <div className="join w-full">
                    <input
                      type="text"
                      placeholder="Enter coupon"
                      className="input input-bordered join-item w-full"
                    />

                    <button className="btn btn-primary join-item">Apply</button>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn btn-primary mt-6 w-full">
                  Proceed To Checkout
                </button>

                <div className="divider"></div>

                {/* Security */}
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <FaTruck className="text-success" />
                    Estimated Delivery:
                    {moment().add(3, "days").format("DD MMM YYYY")}
                  </div>

                  <div className="flex items-center gap-3">
                    <FaLock className="text-primary" />
                    Secure SSL Protected Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddToCart;
