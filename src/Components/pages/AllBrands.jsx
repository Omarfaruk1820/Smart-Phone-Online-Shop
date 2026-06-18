// AllBrands.jsx (PART 1)

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaSearch, FaStar, FaBolt, FaShoppingCart } from "react-icons/fa";

const AllBrands = () => {
  const navigate = useNavigate();

  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sort, setSort] = useState("low");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 12;

  // -------------------------
  // FETCH PHONES
  // -------------------------
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/phones?page=${currentPage}&limit=${itemsPerPage}`,
        );

        setPhones(res.data.phones || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.log(error);
        setPhones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [currentPage]);

  // -------------------------
  // DEBOUNCE SEARCH
  // -------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // -------------------------
  // BRANDS
  // -------------------------
  const brands = useMemo(() => {
    return ["All", ...new Set(phones.map((p) => p.brand).filter(Boolean))];
  }, [phones]);

  // -------------------------
  // FILTER + SORT
  // -------------------------
  const filteredProducts = useMemo(() => {
    let data = [...phones];

    if (selectedBrand !== "All") {
      data = data.filter((p) => p.brand === selectedBrand);
    }

    if (debouncedSearch) {
      data = data.filter((p) =>
        `${p.name} ${p.model} ${p.brand}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      );
    }

    switch (sort) {
      case "low":
        data.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "high":
        data.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;
      case "sold":
        data.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }

    return data;
  }, [phones, selectedBrand, debouncedSearch, sort]);

  // -------------------------
  // ADD TO CART
  // -------------------------
  const addToCart = (phone) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item._id === phone._id);

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({ ...phone, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  // AllBrands.jsx (PART 2)

  return (
    <section className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">All Smartphones</h1>
          <p className="text-gray-500">
            Premium mobile collection with best deals
          </p>
        </div>
        {/* SEARCH + SORT */}
        <div className="flex flex-col lg:flex-row gap-3 justify-between mb-6">
          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              className="input input-bordered w-full pl-10"
              placeholder="Search phones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="sold">Best Selling</option>
          </select>
        </div>
        {/* BRAND FILTER */}
        <div className="flex flex-wrap gap-2 mb-6">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`btn btn-sm ${
                selectedBrand === brand ? "btn-primary" : "btn-outline"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((phone) => (
            <div
              key={phone._id}
              className="card bg-base-100 shadow border hover:shadow-xl transition"
            >
              {/* IMAGE CLICK → NAVIGATE DETAILS PAGE */}
              <figure className="p-4 relative">
                {phone.flashSale && (
                  <span className="badge badge-error absolute top-3 left-3">
                    <FaBolt /> Sale
                  </span>
                )}

                <img
                  src={phone.image}
                  alt={phone.name}
                  className="h-52 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => navigate(`/phone/${phone.slug}`)}
                />
              </figure>

              <div className="card-body">
                <h2 className="font-bold line-clamp-2">{phone.name}</h2>

                <p className="text-sm text-primary">{phone.brand}</p>

                <div className="flex items-center gap-1 text-warning">
                  <FaStar /> {phone.rating}
                </div>

                <div className="flex gap-2">
                  <span className="text-primary font-bold">
                    ${phone.discountPrice}
                  </span>
                  <span className="line-through text-gray-400">
                    ${phone.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(phone)}
                  className="btn btn-primary w-full mt-3"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
       
        {/* PAGINATION */}
        <div className="flex justify-center mt-10 gap-2">
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
        </div>
      </div>
    </section>
  );
};

export default AllBrands;
