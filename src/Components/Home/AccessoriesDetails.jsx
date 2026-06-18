// AccessoriesDetails.jsx (PART 1)

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

const AccessoriesDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

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

    // scroll top
    window.scrollTo(0, 0);
  }, [slug]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Product Not Found</h2>

        <Link to="/accessories" className="btn btn-primary mt-5">
          Back to Accessories
        </Link>
      </div>
    );
  }
  // AccessoriesDetails.jsx (PART 2)

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary mb-6"
      >
        <FaArrowLeft />
        Back
      </button>
      {/* BADGES */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.isFeatured && (
          <span className="badge badge-primary">Featured</span>
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
      {/* MAIN CARD */}
      <div className="grid lg:grid-cols-2 gap-10 bg-base-100 rounded-2xl shadow-lg p-6">
        {/* IMAGE */}
        <div className="bg-base-200 rounded-xl p-6 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[450px] object-contain"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>

          <p className="text-gray-500">
            Category: <span className="font-semibold">{product.category}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500 mt-4">
            <FaStar />

            <span>{product.rating}</span>

            <span className="text-gray-400">
              ({product.totalReviews} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-4xl font-bold text-primary">
              ৳{product.price}
            </span>

            <span className="line-through text-gray-400">
              ৳{product.oldPrice}
            </span>

            <span className="badge badge-success">-{product.discount}%</span>
          </div>

          {/* Stock */}
          <div className="mt-5">
            <p>
              Stock Status :
              <span className="text-green-600 font-bold ml-2">
                {product.stockStatus}
              </span>
            </p>

            <p className="text-gray-500 mt-2">Sold : {product.sold} units</p>
          </div>

          {/* Warranty */}
          <div className="bg-base-200 rounded-xl p-4 mt-6">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <FaBoxOpen />
              Warranty
            </h3>

            <p>{product.warranty?.officialWarranty}</p>

            <p>{product.warranty?.replacementPolicy}</p>
          </div>

          {/* Features */}
          <div className="space-y-2 mt-6">
            <p className="flex gap-2 items-center">
              <FaCheckCircle className="text-green-500" />
              Original Product
            </p>

            <p className="flex gap-2 items-center">
              <FaCheckCircle className="text-green-500" />
              Fast Delivery
            </p>

            <p className="flex gap-2 items-center">
              <FaCheckCircle className="text-green-500" />
              Secure Payment
            </p>
          </div>

          {/* Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <button className="btn btn-primary">
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
      // AccessoriesDetails.jsx (PART 3)
      {/* DESCRIPTION */}
      <div className="bg-base-100 rounded-2xl shadow mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">Description</h2>

        <p className="text-gray-600 leading-8">
          {product.name} is a premium {product.category} product from{" "}
          {product.brand}. It provides excellent performance, premium build
          quality, and long-term durability.
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
                className="card bg-base-100 shadow hover:shadow-2xl transition cursor-pointer"
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
                  <h2 className="text-sm font-bold line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-500">{item.brand}</p>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />

                    {item.rating}
                  </div>

                  <div className="flex gap-2">
                    <span className="text-primary font-bold">
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
    </section>
  );
};

export default AccessoriesDetails;
