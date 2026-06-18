// PhoneDetails.jsx (PART 1)

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaThLarge,
} from "react-icons/fa";

const PhoneDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // -------------------------
  // FETCH SINGLE PHONE
  // -------------------------
  useEffect(() => {
    const fetchPhone = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/phones/slug/${slug}`,
        );

        setPhone(res.data.phone);
        setRelated(res.data.related || []);
      } catch (error) {
        console.log(error);
        setPhone(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [slug]);

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // -------------------------
  // NOT FOUND
  // -------------------------
  if (!phone) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <Link to="/" className="btn btn-primary mt-5">
          Back Home
        </Link>
      </div>
    );
  }

  const discount = ((phone.price - phone.discountPrice) / phone.price) * 100;
  // PhoneDetails.jsx (PART 2)

  return (
    <section className="bg-base-200 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* TOP NAV ACTIONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm"
          >
            <FaArrowLeft /> Back
          </button>

          <Link to="/all-brands" className="btn btn-primary btn-sm">
            <FaThLarge /> Browse All Phones
          </Link>
        </div>

        {/* MAIN PRODUCT CARD */}
        <div className="grid lg:grid-cols-2 gap-10 bg-base-100 p-6 rounded-2xl shadow-lg">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div className="border rounded-xl p-4 bg-white">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-[420px] object-contain"
              />
            </div>

            {/* GALLERY */}
            <div className="grid grid-cols-4 gap-2">
              {phone.gallery?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-20 object-cover rounded border hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div>
            <p className="text-primary font-semibold">{phone.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-bold mt-2">
              {phone.name}
            </h1>
            {/* RATING */}
            <div className="flex items-center gap-2 mt-3 text-warning">
              <FaStar />
              <span className="font-semibold">{phone.rating}</span>
              <span className="text-gray-500">
                ({phone.totalReviews} reviews)
              </span>
            </div>
            <p className="text-gray-500 mt-1">Sold: {phone.sold} units</p>
            {/* PRICE */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-4xl font-bold text-primary">
                ${phone.discountPrice}
              </span>

              <span className="line-through text-gray-400">${phone.price}</span>

              <span className="badge badge-error">
                -{Math.round(discount)}%
              </span>
            </div>
            {/* DESCRIPTION */}
            <p className="mt-5 text-gray-600 leading-7">{phone.description}</p>
            {/* COLORS */}
            <div className="mt-6">
              <h3 className="font-bold mb-2">Colors</h3>

              <div className="flex flex-wrap gap-2">
                {phone.colors?.map((c, i) => (
                  <span key={i} className="badge badge-outline">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            {/* VARIANTS */}
            <div className="mt-6">
              <h3 className="font-bold mb-2">Variants</h3>

              <div className="grid grid-cols-2 gap-3">
                {phone.variants?.map((v, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 border rounded-xl cursor-pointer transition ${
                      selectedVariant?.ram === v.ram
                        ? "border-primary bg-base-200"
                        : ""
                    }`}
                  >
                    <p className="font-semibold">{v.ram}</p>
                    <p>{v.storage}</p>
                    <p className="text-primary font-bold">${v.price}</p>
                  </div>
                ))}
              </div>
            </div>
            // PhoneDetails.jsx (PART 3)
            {/* QUANTITY */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="btn btn-outline"
              >
                <FaMinus />
              </button>

              <span className="text-xl font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn btn-outline"
              >
                <FaPlus />
              </button>
            </div>
            {/* ACTION BUTTONS */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <button className="btn btn-primary">
                <FaShoppingCart />
                Add To Cart
              </button>

              <button className="btn btn-error">
                <FaBolt />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="bg-base-100 p-6 mt-10 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-5">Specifications</h2>

          <table className="table w-full">
            <tbody>
              {Object.entries(phone.specifications || {}).map(([k, v]) => (
                <tr key={k}>
                  <td className="font-semibold capitalize">{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related?.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 border hover:shadow-lg transition"
              >
                <img src={item.image} className="h-40 object-contain p-3" />

                <div className="p-3">
                  <h3 className="text-sm font-bold line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-primary font-bold">
                    ${item.discountPrice}
                  </p>

                  <Link
                    to={`/phone/${item.slug}`}
                    className="btn btn-primary btn-sm w-full mt-2"
                  >
                    View
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

export default PhoneDetails;
