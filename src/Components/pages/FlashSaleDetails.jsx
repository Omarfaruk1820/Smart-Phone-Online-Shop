import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const FlashSaleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { refetch } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // ====================
  // FETCH PRODUCT
  // ====================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/phones/flash-sale/${id}`,
        );

        setProduct(res.data.product);
        setRelated(res.data.related || []);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ====================
  // ADD TO CART
  // ====================
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity,
      userEmail: user.email,
    };

    try {
      const res = await axios.post("http://localhost:5000/cart", cartItem);

      if (res.data.success) {
        refetch();

        toast.success(`${product.name} added successfully 🛒`, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to add product", error);
    }
  };

  // ====================
  // BUY NOW
  // ====================
  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="skeleton h-[500px] w-full rounded-2xl"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-4xl font-bold">Product Not Found</h2>

        <Link to="/flash-sale" className="btn btn-primary mt-6">
          Back To Flash Sale
        </Link>
      </div>
    );
  }

  const saveAmount = (product.price || 0) - (product.discountPrice || 0);

  const stockPercent =
    product.stock > 0 ? (product.sold / product.stock) * 100 : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/flash-sale">Flash Sale</Link>
          </li>

          <li>{product.name}</li>
        </ul>
      </div>

      <div className="card bg-base-100 shadow-2xl border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
          {/* IMAGE */}
          <div className="bg-base-200 rounded-3xl p-6 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[450px] object-contain"
            />
          </div>

          {/* INFO */}
          <div>
            <div className="badge badge-error mb-4">Flash Sale</div>

            <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>

            <p className="text-gray-500 mt-2">Brand: {product.brand}</p>

            <div className="flex items-center gap-2 text-warning mt-4">
              <FaStar />
              <span>{product.rating}</span>

              <span className="text-gray-500">({product.totalReviews})</span>
            </div>

            {/* PRICE */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="text-4xl font-bold text-primary">
                ৳{product.discountPrice}
              </span>

              <span className="line-through text-gray-400">
                ৳{product.price}
              </span>

              <div className="badge badge-error">
                -{product.discountPercentage}%
              </div>
            </div>

            <div className="alert alert-success mt-5">Save ৳{saveAmount}</div>

            {/* STOCK */}
            <progress
              className="progress progress-error w-full mt-5"
              value={stockPercent}
              max="100"
            ></progress>

            {/* QUANTITY */}
            <div className="mt-6">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input input-bordered w-24"
              />
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <button onClick={handleAddToCart} className="btn btn-primary">
                <FaShoppingCart />
                Add To Cart
              </button>

              <button onClick={handleBuyNow} className="btn btn-secondary">
                <FaBolt />
                Buy Now
              </button>

              <button className="btn btn-outline">
                <FaHeart />
              </button>
            </div>
            {/* SERVICES */}
            <div className="mt-8 space-y-3">
              <div className="flex gap-3">
                <FaTruck className="text-primary" />
                Free Delivery
              </div>

              <div className="flex gap-3">
                <FaShieldAlt className="text-success" />
                {product.warranty?.officialWarranty}
              </div>

              <div className="flex gap-3">
                <FaUndo className="text-warning" />
                {product.warranty?.replacementPolicy}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div className="card border mt-10 p-6">
        <h2 className="text-3xl font-bold mb-6">Specifications</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              {Object.entries(product.specifications || {}).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="font-bold capitalize">{key}</td>

                    <td>{value}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 border hover:shadow-xl duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 object-contain p-4"
              />

              <div className="card-body">
                <h2 className="font-bold line-clamp-2">{item.name}</h2>

                <p className="text-primary font-bold">৳{item.discountPrice}</p>

                <Link
                  to={`/flash-sale/${item._id}`}
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

export default FlashSaleDetails;
