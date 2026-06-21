import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaBolt,
} from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const FlashSale = () => {
  const { user } = useContext(AuthContext);

  // ✅ Correct
  const { refetch } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [wishlist, setWishlist] = useState([]);

  const limit = 8;

  // =========================
  // FETCH FLASH SALE PRODUCTS
  // =========================
  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/phones/flash-sale?page=${currentPage}&limit=${limit}`,
        );

        setProducts(res.data.flashSaleProducts || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSale();
  }, [currentPage]);

  // =========================
  // BRANDS
  // =========================
  const brands = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.brand))];
  }, [products]);

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity: 1,
      userEmail: user.email,
    };

    try {
      const res = await axios.post("http://localhost:5000/cart", cartItem);

      if (res.data.success) {
        refetch();

        toast.success(`${product.name} added to cart successfully 🛒`, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to add product",error);
    }
  };
  // =========================
  // FILTER + SORT
  // =========================
  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (search) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedBrand !== "All") {
      items = items.filter((p) => p.brand === selectedBrand);
    }

    switch (sortBy) {
      case "low":
        items.sort((a, b) => a.discountPrice - b.discountPrice);
        break;

      case "high":
        items.sort((a, b) => b.discountPrice - a.discountPrice);
        break;

      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;

      case "new":
        items.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;

      default:
        break;
    }

    return items;
  }, [products, search, selectedBrand, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton h-80 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold flex justify-center items-center gap-3">
            <FaBolt className="text-error" />
            Flash Sale Deals
          </h2>

          <p className="text-gray-500 mt-3">
            Limited time premium smartphone offers
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search phones..."
              className="input input-bordered w-full pl-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <FaSearch className="absolute left-4 top-4 text-gray-400" />
          </div>

          <select
            className="select select-bordered w-full"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
            <option value="rating">Rating</option>
            <option value="new">Newest</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl duration-300"
            >
              <figure className="relative">
                <Link to={`/flash-sale/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 object-contain p-5"
                  />
                </Link>

                <div className="badge badge-error absolute top-4 left-4">
                  -{product.discountPercentage}%
                </div>

                <button
                  onClick={() => handleWishlist(product._id)}
                  className="btn btn-circle btn-sm absolute top-4 right-4"
                >
                  <FaHeart
                    className={
                      wishlist.includes(product._id) ? "text-red-500" : ""
                    }
                  />
                </button>
              </figure>

              <div className="card-body">
                <h2 className="font-bold line-clamp-2">{product.name}</h2>

                <div className="flex items-center gap-2 text-warning">
                  <FaStar />
                  <span>{product.rating}</span>
                </div>

                <div className="flex gap-2 mt-2">
                  <span className="text-primary text-xl font-bold">
                    ৳{product.discountPrice}
                  </span>

                  <span className="line-through text-gray-400">
                    ৳{product.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddCart(product)}
                  className="btn btn-primary mt-4"
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center flex-wrap gap-2 mt-10">
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              className={`btn btn-sm ${
                currentPage === p + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(p + 1)}
            >
              {p + 1}
            </button>
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

export default FlashSale;
