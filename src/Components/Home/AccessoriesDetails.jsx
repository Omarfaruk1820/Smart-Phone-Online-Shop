import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import accessoriesData from "../../data/accessories.json";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const AccessoriesDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = accessoriesData.find(
      (item) => item.id === Number(id)
    );

    setProduct(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">
          Product Not Found
        </h2>
        <Link className="btn btn-primary mt-4" to="/accessories">
          Back
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* BACK */}
        <Link
          to="/accessories"
          className="flex items-center gap-2 mb-6"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="bg-base-200 p-6 rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain max-h-[400px]"
            />
          </div>

          {/* INFO */}
          <div>

            <h1 className="text-3xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mb-3">
              Brand: {product.brand}
            </p>

            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              <FaStar />
              {product.rating}
            </div>

            <div className="text-2xl font-bold text-primary mb-4">
              ৳{product.price}
            </div>

            <div className="space-y-2 mb-6">
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Original Product
              </p>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Fast Delivery
              </p>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Secure Payment
              </p>
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary flex-1">
                <FaShoppingCart />
                Add To Cart
              </button>

              <button className="btn btn-outline btn-error flex-1">
                <FaHeart />
                Wishlist
              </button>
            </div>

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 border p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-2">
            Description
          </h2>

          <p className="text-gray-600">
            {product.name} is a premium quality product from{" "}
            {product.brand}.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AccessoriesDetails;