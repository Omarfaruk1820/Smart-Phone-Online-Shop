import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const ITEMS_PER_PAGE = 12;

const Accessories = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { refetch } = useCart();

  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);

  // =====================
  // FETCH ACCESSORIES
  // =====================
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://smart-phone-online-shop-by-node.vercel.app/accessories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, sort]);

  // =====================
  // ADD TO CART
  // =====================
  const handleAddCart = async (item) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      productId: item._id,
      name: item.name,
      brand: item.brand,
      image: item.image,
      price: item.oldPrice || item.price,
      discountPrice: item.price,
      quantity: 1,
      userEmail: user.email,
    };

    try {
      const res = await axios.post("https://smart-phone-online-shop-by-node.vercel.app/cart", cartItem);

      if (res.data.success) {
        refetch();

        toast.success(`${item.name} added successfully 🛒`, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim();

  const categories = useMemo(() => {
    const list = products.map((p) => p.category);

    return ["All", ...new Set(list)];
  }, [products]);

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

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return result;
  }, [products, search, activeCategory, sort]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold">Mobile Accessories</h2>

        <p className="text-gray-500 mt-3">
          Premium accessories for smartphones
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-4 left-4 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-12"
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
          className="select select-bordered w-full md:w-64"
        >
          <option value="newest">Newest</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="rating">Top Rating</option>
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition duration-300"
            >
              <figure
                className="p-4 cursor-pointer"
                onClick={() => navigate(`/accessories/${item.slug}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 object-contain"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-sm line-clamp-2">{item.name}</h2>

                <p className="text-xs text-gray-500">{item.brand}</p>

                <div className="flex items-center gap-2 text-warning">
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
                  onClick={() => handleAddCart(item)}
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
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 flex-wrap">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {index + 1}
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

export default Accessories;
