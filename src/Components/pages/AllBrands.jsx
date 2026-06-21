import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { FaSearch, FaStar, FaBolt, FaShoppingCart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../Auth/AuthProvider";
import useCart from "../Hook/useCart";

const AllBrands = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { refetch } = useCart();

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("All");

  const [sort, setSort] = useState("low");

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 12;

  // Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // React Query
  const { data = {}, isLoading } = useQuery({
    queryKey: ["phones", currentPage],

    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/phones?page=${currentPage}&limit=${limit}`,
      );

      return res.data;
    },
  });

  const phones = data?.phones || [];

  const totalPages = data?.totalPages || 1;

  // Brand List
  const brands = useMemo(() => {
    return ["All", ...new Set(phones.map((phone) => phone.brand))];
  }, [phones]);

  // Filter + Sort
  const filteredPhones = useMemo(() => {
    let data = [...phones];

    if (selectedBrand !== "All") {
      data = data.filter((item) => item.brand === selectedBrand);
    }

    if (debouncedSearch) {
      data = data.filter((item) =>
        `${item.name} ${item.brand}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      );
    }

    switch (sort) {
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
        data.sort((a, b) => a.discountPrice - b.discountPrice);
    }

    return data;
  }, [phones, selectedBrand, debouncedSearch, sort]);
  // Add To Cart
  const handleAddToCart = async (phone) => {
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
      discountPrice: phone.discountPrice,
      userEmail: user.email,
    };

    try {
      await axios.post("http://localhost:5000/cart", cartData);

      await refetch();

      toast.success(`${phone.name} added to cart successfully`, {
        position: "top-right",
      });
    } catch {
      toast.error(`Failed to add ${phone.name}`, {
        position: "top-right",
      });
    }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow">
              <div className="skeleton h-52 w-full"></div>

              <div className="card-body">
                <div className="skeleton h-5 w-full"></div>

                <div className="skeleton h-5 w-24"></div>

                <div className="skeleton h-10 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">All Smartphones</h1>

        <p className="text-gray-500 mt-2">Premium Mobile Collection</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4" />

          <input
            type="text"
            placeholder="Search phone..."
            className="input input-bordered pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="low">Low Price</option>

          <option value="high">High Price</option>

          <option value="rating">Top Rated</option>

          <option value="sold">Best Selling</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`btn btn-sm ${
              selectedBrand === brand ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhones.map((phone) => (
          <motion.div
            whileHover={{
              y: -8,
            }}
            key={phone._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl duration-300"
          >
            <figure className="relative p-5">
              {phone.flashSale && (
                <span className="badge badge-error absolute top-3 left-3 gap-1">
                  <FaBolt />
                  Sale
                </span>
              )}

              <img
                src={phone.image}
                alt={phone.name}
                className="h-52 object-contain cursor-pointer"
                onClick={() => navigate(`/phone/${phone.slug}`)}
              />
            </figure>

            <div className="card-body">
              <h2 className="font-bold line-clamp-2">{phone.name}</h2>

              <div className="flex items-center gap-2 text-warning">
                <FaStar />

                {phone.rating}
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-primary">
                  ৳{phone.discountPrice}
                </span>

                <span className="line-through text-gray-400">
                  ৳{phone.price}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(phone)}
                className="btn btn-primary mt-4"
              >
                <FaShoppingCart />
                Add To Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center flex-wrap gap-2 mt-12">
        {[...Array(totalPages)].map((_, i) => (
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

export default AllBrands;
