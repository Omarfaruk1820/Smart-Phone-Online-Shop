import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import flashProducts from "../../data/flashSaleData.json";

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
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    return flashProducts.find((item) => String(item.id) === String(id));
  }, [id]);

  const relatedProducts = useMemo(() => {
    return flashProducts.filter((item) => item.id !== product?.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>

        <Link to="/flash-sale" className="btn btn-primary">
          Back To Flash Sale
        </Link>
      </section>
    );
  }

  const discountAmount = product.oldPrice - product.price;

  return (
    <section className="bg-base-200 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-8">
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

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl border">
          <div className="grid lg:grid-cols-2 gap-10 p-8">
            {/* Image */}
            <div>
              <div className="bg-base-200 rounded-2xl p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="badge badge-error text-white mb-4">
                Flash Sale
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 text-warning mb-5">
                <FaStar />
                <span>{product.rating}</span>
                <span className="text-gray-500">(125 Reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-4xl font-bold text-primary">
                  ৳{product.price.toLocaleString()}
                </h2>

                <span className="line-through text-gray-400 text-xl">
                  ৳{product.oldPrice.toLocaleString()}
                </span>

                <div className="badge badge-error">-{product.discount}%</div>
              </div>

              <div className="alert alert-success mb-5">
                Save ৳{discountAmount.toLocaleString()}
              </div>

              <p className="text-base-content/70 leading-8 mb-6">
                Premium smartphone with flagship performance, long-lasting
                battery life and professional camera system. Grab this exclusive
                flash deal before stock runs out.
              </p>

              {/* Stock */}
              <div className="mb-6">
                <p className="font-semibold">
                  Stock Available: {product.stock}
                </p>

                <progress
                  className="progress progress-error w-full mt-2"
                  value={(product.sold / product.stock) * 100}
                  max="100"
                ></progress>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-semibold">Quantity</span>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input input-bordered w-28"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="btn btn-primary flex-1">
                  <FaShoppingCart />
                  Add To Cart
                </button>

                <button className="btn btn-secondary flex-1">
                  <FaBolt />
                  Buy Now
                </button>

                <button className="btn btn-outline">
                  <FaHeart />
                </button>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <FaTruck className="text-primary" />
                  Free Nationwide Delivery
                </div>

                <div className="flex gap-3 items-center">
                  <FaShieldAlt className="text-success" />
                  Official Brand Warranty
                </div>

                <div className="flex gap-3 items-center">
                  <FaUndo className="text-warning" />
                  Easy Return Policy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="card bg-base-100 shadow-xl mt-10 border">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6">Specifications</h2>

            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Display</td>
                    <td>6.8-inch AMOLED</td>
                  </tr>

                  <tr>
                    <td>Processor</td>
                    <td>Snapdragon 8 Elite</td>
                  </tr>

                  <tr>
                    <td>RAM</td>
                    <td>12GB</td>
                  </tr>

                  <tr>
                    <td>Storage</td>
                    <td>256GB</td>
                  </tr>

                  <tr>
                    <td>Battery</td>
                    <td>5000mAh</td>
                  </tr>

                  <tr>
                    <td>Camera</td>
                    <td>50MP Triple Camera</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="card bg-base-100 shadow-xl mt-10 border">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

            <div className="space-y-6">
              <div className="border rounded-xl p-5">
                <h3 className="font-bold">Rahim Ahmed</h3>

                <p className="text-warning">★★★★★</p>

                <p className="mt-3 text-base-content/70">
                  Excellent phone. Camera quality and battery backup are
                  amazing.
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-bold">Karim Hasan</h3>

                <p className="text-warning">★★★★★</p>

                <p className="mt-3 text-base-content/70">
                  Fast delivery and authentic product. Highly recommended.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Related Flash Deals</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-lg border">
                <figure className="p-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 object-contain"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="font-bold">{item.name}</h3>

                  <p className="text-primary text-xl font-bold">
                    ৳{item.price.toLocaleString()}
                  </p>

                  <Link
                    to={`/flash-sale/${item.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleDetails;
