import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const AccessoriesDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { refetch } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH ACCESSORY
  // ======================
  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/accessories/slug/${slug}`,
        );

        setProduct(res.data.accessory);
        setRelatedProducts(res.data.related || []);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessory();

    window.scrollTo(0, 0);
  }, [slug]);

  // ======================
  // ADD TO CART
  // ======================
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
      price: product.oldPrice || product.price,
      discountPrice: product.price,
      quantity: 1,
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
      toast.error("Failed to add product");
    }
  };

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="skeleton h-[500px] rounded-3xl"></div>
      </div>
    );
  }

  // ======================
  // NOT FOUND
  // ======================
  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <Link to="/accessories" className="btn btn-primary mt-6">
          Back to Accessories
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary mb-8"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-5">
        {product.isFeatured && (
          <span className="badge badge-info">Featured</span>
        )}

        {product.bestSeller && (
          <span className="badge badge-warning">Best Seller</span>
        )}

        {product.newArrival && (
          <span className="badge badge-success">New Arrival</span>
        )}

        {product.flashSale && (
          <span className="badge badge-error">Flash Sale</span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 bg-base-100 rounded-3xl shadow-xl p-6">
        {/* IMAGE */}
        <div className="bg-base-200 rounded-2xl p-8 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[450px] object-contain"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

          <p className="mt-3 text-gray-500">
            Brand :<span className="font-bold ml-2">{product.brand}</span>
          </p>

          <p className="text-gray-500">
            Category :<span className="font-bold ml-2">{product.category}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-5 text-warning">
            <FaStar />

            <span>{product.rating}</span>

            <span className="text-gray-400">
              ({product.totalReviews} Reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex flex-wrap gap-4 items-center mt-7">
            <span className="text-4xl font-bold text-primary">
              ৳{product.price}
            </span>

            <span className="line-through text-gray-400">
              ৳{product.oldPrice}
            </span>

            <span className="badge badge-success">-{product.discount}%</span>
          </div>

          {/* WARRANTY */}
          <div className="bg-base-200 rounded-2xl p-5 mt-7">
            <h2 className="font-bold flex items-center gap-2 mb-3">
              <FaBoxOpen />
              Warranty
            </h2>

            <p>{product.warranty?.officialWarranty}</p>

            <p>{product.warranty?.replacementPolicy}</p>
          </div>

          {/* FEATURES */}
          <div className="space-y-3 mt-7">
            <div className="flex gap-2">
              <FaCheckCircle className="text-green-500" />
              Original Product
            </div>

            <div className="flex gap-2">
              <FaCheckCircle className="text-green-500" />
              Fast Delivery
            </div>

            <div className="flex gap-2">
              <FaCheckCircle className="text-green-500" />
              Secure Payment
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <button onClick={handleAddToCart} className="btn btn-primary">
              <FaShoppingCart />
              Add To Cart
            </button>

            <button className="btn btn-outline btn-error">
              <FaHeart />
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-base-100 rounded-3xl shadow-xl mt-10 p-8">
        <h2 className="text-2xl font-bold mb-5">Description</h2>

        <p className="text-gray-600 leading-8">
          {product.name} is a premium
          {` ${product.category} `}
          product from {product.brand}. It offers excellent build quality,
          durability and reliable performance.
        </p>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition cursor-pointer"
                onClick={() => navigate(`/accessories/${item.slug}`)}
              >
                <figure className="p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 object-contain"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="font-bold text-sm line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-500">{item.brand}</p>

                  <div className="flex items-center gap-2 text-warning">
                    <FaStar />

                    {item.rating}
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold text-primary">
                      ৳{item.price}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ৳{item.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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

export default AccessoriesDetails;
