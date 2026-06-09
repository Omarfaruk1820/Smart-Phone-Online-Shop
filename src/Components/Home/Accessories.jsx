import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import accessoriesData from "../../data/accessories.json";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";

const Accessories = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LOAD DATA
  useEffect(() => {
    try {
      setProducts(accessoriesData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load accessories data");
      setLoading(false);
    }
  }, []);

  // CATEGORY
  const categories = useMemo(() => {
    const list = products.map((p) => p.category?.trim());
    return ["All", ...new Set(list)];
  }, [products]);

  // SEARCH + FILTER
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();

    return products.filter((item) => {
      const categoryMatch =
        activeCategory === "All"
          ? true
          : item.category?.trim() === activeCategory;

      const searchMatch =
        item.name?.toLowerCase().includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [products, activeCategory, search]);

  if (loading) {
    return <p className="p-10 text-center">Loading Accessories...</p>;
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-6">
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
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* PRODUCTS */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/accessories/${item.id}`)}
                className="card bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer transition"
              >

                {/* IMAGE */}
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-60 w-full object-cover"
                  />
                </figure>

                {/* CONTENT */}
                <div className="card-body">

                  <h2 className="card-title text-sm">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {item.brand}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    {item.rating}
                  </div>

                  {/* PRICE */}
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">
                      ৳{item.price}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ৳{item.oldPrice}
                    </span>
                  </div>

                  <button className="btn btn-primary btn-sm mt-2">
                    <FaShoppingCart />
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Accessories;