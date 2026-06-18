import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

const FlashSaleDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/phones/flash-sale/${id}`,
        );

        setProduct(res.data.product);
        setRelated(res.data.related || []);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/flash-sale" className="btn btn-primary mt-4">
          Back To Flash Sale
        </Link>
      </div>
    );
  }

  const saveAmount = (product.price || 0) - (product.discountPrice || 0);

  const stockPercent =
    product.stock > 0 ? (product.sold / product.stock) * 100 : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/flash-sale">Flash Sale</Link>
          </li>
          <li>{product.name}</li>
        </ul>
      </div>

      {/* MAIN CARD */}
      <div className="card bg-base-100 shadow-xl border">
        <div className="grid lg:grid-cols-2 gap-10 p-6">
          {/* IMAGE */}
          <div className="bg-base-200 rounded-2xl p-6 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] object-contain"
            />
          </div>

          {/* INFO */}
          <div>
            <div className="badge badge-error mb-4">Flash Sale</div>

            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="text-gray-500">Brand: {product.brand}</p>

            <div className="flex items-center gap-2 text-warning mt-2">
              <FaStar /> {product.rating}
              <span className="text-gray-500">({product.totalReviews})</span>
            </div>

            {/* PRICE */}
            <div className="mt-4 flex gap-4 items-center">
              <span className="text-4xl font-bold text-primary">
                ৳{product.discountPrice}
              </span>

              <span className="line-through text-gray-400">
                ৳{product.price}
              </span>

              <span className="badge badge-error">
                -{product.discountPercentage}%
              </span>
            </div>

            <div className="alert alert-success mt-4">Save ৳{saveAmount}</div>

            {/* STOCK */}
            <progress
              className="progress progress-error w-full mt-4"
              value={stockPercent}
              max="100"
            />

            {/* QUANTITY */}
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-24 mt-5"
            />

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5">
              <button className="btn btn-primary flex-1">
                <FaShoppingCart /> Add To Cart
              </button>

              <button className="btn btn-secondary flex-1">
                <FaBolt /> Buy Now
              </button>

              <button className="btn btn-outline">
                <FaHeart />
              </button>
            </div>

            {/* SERVICES */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <FaTruck /> Free Delivery
              </div>
              <div className="flex gap-2">
                <FaShieldAlt />
                {product.warranty?.officialWarranty}
              </div>
              <div className="flex gap-2">
                <FaUndo />
                {product.warranty?.replacementPolicy}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div className="mt-10 card border p-6">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>

        <table className="table w-full">
          <tbody>
            {Object.entries(product.specifications || {}).map(([k, v]) => (
              <tr key={k}>
                <td className="font-semibold capitalize">{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {related.map((item) => (
            <div key={item._id} className="card border">
              <img src={item.image} className="h-40 object-contain p-3" />

              <div className="p-3">
                <h3 className="text-sm font-bold">{item.name}</h3>

                <Link
                  to={`/flash-sale/${item._id}`}
                  className="btn btn-sm btn-primary mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSaleDetails;
