import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import phones from "../../data/phones.json";

import { FaSearch, FaShoppingCart, FaMobileAlt } from "react-icons/fa";

const brands = [
  "All",
  "Samsung",
  "Apple",
  "Xiaomi",
  "Vivo",
  "Oppo",
  "Realme",
  "OnePlus",
  "Nokia",
  "Motorola",
  "Google Pixel",
  "Honor",
  "Huawei",
  "Infinix",
  "Tecno",
  "Itel",
];

const AllBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("low");

  const filteredProducts = useMemo(() => {
    let filtered = phones.filter((phone) => {
      const matchesBrand =
        selectedBrand === "All" || phone.brand === selectedBrand;

      const matchesSearch =
        phone.name?.toLowerCase().includes(search.toLowerCase()) ||
        phone.model?.toLowerCase().includes(search.toLowerCase());

      return matchesBrand && matchesSearch;
    });

    if (sort === "low") {
      filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return filtered;
  }, [selectedBrand, search, sort]);

  return (
    <section className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 ">
          <h1 className="text-4xl text-center font-bold mb-3">All Smartphone Brands</h1>

          <p className="text-gray-500 text-center">
            Explore premium smartphones from top brands around the world.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search smartphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-12"
            />
          </div>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="low">Price: Low → High</option>

            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* Brands */}
        <div className="flex flex-wrap gap-3 mb-10">
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

        {/* Count */}
        <div className="mb-6">
          <h3 className="font-semibold">
            {filteredProducts.length} Products Found
          </h3>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <FaMobileAlt className="mx-auto text-5xl mb-4 opacity-30" />

            <h3 className="text-2xl font-bold">No Products Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((phone) => (
              <div
                key={phone._id}
                className="card bg-base-100 border hover:shadow-xl transition-all duration-300"
              >
                <figure className="p-4">
                  <Link to={`/phone/${phone.slug}`}>
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="h-60 object-contain"
                    />
                  </Link>
                </figure>

                <div className="card-body">
                  <p className="text-primary text-sm font-medium">
                    {phone.brand}
                  </p>

                  <Link to={`/phone/${phone.slug}`}>
                    <h2 className="card-title text-base hover:text-primary">
                      {phone.name}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      ${phone.discountPrice}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ${phone.price}
                    </span>
                  </div>

                  <div className="card-actions mt-3">
                    <Link
                      to={`/phone/${phone.slug}`}
                      className="btn btn-primary btn-sm w-full"
                    >
                      View Details
                    </Link>

                    <button className="btn btn-outline btn-sm w-full">
                      <FaShoppingCart />
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBrands;
