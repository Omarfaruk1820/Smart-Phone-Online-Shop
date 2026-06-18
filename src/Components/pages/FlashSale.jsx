import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const limit = 8;

  // API FETCH (IMPORTANT FIX)
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

  // BRAND LIST
  const brands = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.brand))];
  }, [products]);

  // WISHLIST
  const handleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // CART
  const handleAddCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev;
      return [...prev, product];
    });
  };
  // FILTER + SORT
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

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold flex items-center gap-2">
            <FaBolt className="text-warning" />
            Flash Sale Deals
          </h2>

          <p className="text-gray-500 mt-2">
            Limited time premium smartphone offers
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            className="select select-bordered"
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

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold">No Flash Sale Products Found</h3>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
              >
                <figure className="relative">
                  <Link to={`/flash-sale/${product._id}`}>
                    <img
                      src={product.image}
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
                  <h2 className="font-bold">{product.name}</h2>

                  <div className="flex gap-2">
                    <span className="text-primary font-bold">
                      ৳{product.discountPrice}
                    </span>

                    <span className="line-through text-gray-400">
                      ৳{product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCart(product)}
                    className="btn btn-primary mt-3"
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-10">
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
    </section>
  );
};

export default FlashSale;
