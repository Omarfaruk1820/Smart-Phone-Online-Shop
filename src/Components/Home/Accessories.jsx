// Accessories.jsx (PART 1)

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

const Accessories = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);

  // -------------------------
  // FETCH FROM API (AXIOS)
  // -------------------------
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/accessories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        );

        setProducts(res.data.accessories || []);
        setTotalPages(res.data.totalPages || 1);

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load accessories from server");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [currentPage]);

  // reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, sort]);

  // -------------------------
  // NORMALIZE TEXT
  // -------------------------
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim();

  // -------------------------
  // CATEGORY LIST
  // -------------------------
  const categories = useMemo(() => {
    const list = products.map((p) => p.category);
    return ["All", ...new Set(list)];
  }, [products]);

  // -------------------------
  // FILTER + SORT
  // -------------------------
  const filteredProducts = useMemo(() => {
    const q = normalize(search);

    let result = products.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        normalize(item.category) === normalize(activeCategory);

      const searchMatch =
        normalize(item.name).includes(q) || normalize(item.brand).includes(q);

      return categoryMatch && searchMatch;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);

    if (sort === "high") result.sort((a, b) => b.price - a.price);

    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    if (sort === "newest")
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );

    return result;
  }, [products, search, activeCategory, sort]);

  // -------------------------
  // LOADING UI
  // -------------------------
  if (loading) {
    return <div className="text-center py-20">Loading Accessories...</div>;
  }

  // -------------------------
  // ERROR UI
  // -------------------------
  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }
  // Accessories.jsx (PART 2)

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Mobile Accessories
      </h1>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
            placeholder="Search accessories..."
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm ${
              activeCategory === cat ? "btn-primary" : "btn-outline"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="flex justify-center mb-10">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full md:w-60"
        >
          <option value="newest">Newest</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Top Rating</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/accessories/${item.slug}`)}
              className="card bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer transition"
            >
              <figure className="p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 object-contain"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-sm">{item.name}</h2>

                <p className="text-xs text-gray-500">{item.brand}</p>

                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  {item.rating}
                </div>

                <div className="flex gap-2">
                  <span className="text-primary font-bold">৳{item.price}</span>
                  <span className="line-through text-gray-400 text-sm">
                    ৳{item.oldPrice}
                  </span>
                </div>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="btn btn-primary btn-sm mt-2"
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
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Accessories;
