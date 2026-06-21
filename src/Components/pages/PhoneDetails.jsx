import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaThLarge,
} from "react-icons/fa";

import useCart from "../Hook/useCart";
import { AuthContext } from "../Auth/AuthProvider";

const PhoneDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { refetch } = useCart();

  const [phone, setPhone] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // -------------------------
  // FETCH PHONE
  // -------------------------
  useEffect(() => {
    if (!slug) return;

    const fetchPhone = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://smart-phone-online-shop-by-node.vercel.app/phones/slug/${slug}`,
        );

        setPhone(res.data.phone);
        setRelated(res.data.related || []);
      } catch (error) {
        console.log(error);
        setPhone(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [slug]);

  // -------------------------
  // DEFAULT VARIANT
  // -------------------------
  useEffect(() => {
    if (phone?.variants?.length) {
      setSelectedVariant(phone.variants[0]);
    }
  }, [phone]);

  // discount calculation
  const discount = phone
    ? ((phone.price - phone.discountPrice) / phone.price) * 100
    : 0;
  // -------------------------
  // ADD TO CART
  // -------------------------
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartData = {
      productId: phone._id,
      name: phone.name,
      brand: phone.brand,
      image: phone.image,
      price: phone.price,
      discountPrice: selectedVariant?.price || phone.discountPrice,
      quantity,
      userEmail: user.email,
    };

    try {
      const res = await axios.post("https://smart-phone-online-shop-by-node.vercel.app/cart", cartData);

      if (res.data.success) {
        refetch();

        toast.success(`${phone.name} added to cart 🛒`);
      }
    } catch (error) {
      toast.error("Failed to add product", error);
    }
  };

  // -------------------------
  // BUY NOW
  // -------------------------
  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="skeleton h-96 w-full"></div>
      </div>
    );
  }

  // -------------------------
  // NOT FOUND
  // -------------------------
  if (!phone) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <Link to="/" className="btn btn-primary mt-6">
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* TOP NAV */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          <FaArrowLeft /> Back
        </button>

        <Link to="/all-brands" className="btn btn-primary">
          <FaThLarge /> Browse All Phones
        </Link>
      </div>

      {/* MAIN GRID */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-base-100 p-4 sm:p-6 rounded-2xl shadow-xl"
      >
        {/* IMAGE */}
        <div className="flex justify-center items-center border rounded-xl p-4">
          <img
            src={phone.image}
            alt={phone.name}
            className="w-full max-h-[400px] object-contain"
          />
        </div>

        {/* INFO */}
        <div>
          <p className="text-primary font-semibold">{phone.brand}</p>

          <h1 className="text-2xl sm:text-4xl font-bold mt-2">{phone.name}</h1>

          <div className="flex items-center gap-2 mt-3 text-warning">
            <FaStar />
            <span>{phone.rating}</span>
            <span className="text-gray-500">
              ({phone.totalReviews} Reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex flex-wrap gap-3 mt-6 items-center">
            <span className="text-3xl font-bold text-primary">
              ৳{selectedVariant?.price || phone.discountPrice}
            </span>

            <span className="line-through text-gray-400">৳{phone.price}</span>

            <span className="badge badge-error">-{Math.round(discount)}%</span>
          </div>

          <p className="mt-4 text-gray-600">{phone.description}</p>

          {/* VARIANTS */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {phone.variants?.map((variant, index) => (
              <div
                key={index}
                onClick={() => setSelectedVariant(variant)}
                className={`border rounded-xl p-3 cursor-pointer transition ${
                  selectedVariant?.ram === variant.ram
                    ? "border-primary bg-base-200"
                    : ""
                }`}
              >
                <p className="font-semibold">{variant.ram}</p>
                <p className="text-sm">{variant.storage}</p>
                <p className="text-primary font-bold">৳{variant.price}</p>
              </div>
            ))}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <button
              className="btn btn-outline"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <FaMinus />
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              className="btn btn-outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FaPlus />
            </button>
          </div>

          {/* BUTTONS */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <button onClick={handleAddToCart} className="btn btn-primary">
              <FaShoppingCart /> Add To Cart
            </button>

            <button onClick={handleBuyNow} className="btn btn-error">
              <FaBolt /> Buy Now
            </button>
          </div>
          {/* SPECIFICATIONS */}
          {phone.specifications && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">Specifications</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(phone.specifications).map(
                  ([key, value], index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="text-gray-500 text-sm">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* RELATED PRODUCTS */}
      <div className="mt-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Related Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <div
              key={item._id}
              className="card border hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 object-contain p-3"
              />

              <div className="card-body">
                <h2 className="font-bold line-clamp-2">{item.name}</h2>

                <p className="text-primary font-bold">৳{item.discountPrice}</p>

                <Link
                  to={`/phone/${item.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster
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
      />
    </section>
  );
};

export default PhoneDetails;
