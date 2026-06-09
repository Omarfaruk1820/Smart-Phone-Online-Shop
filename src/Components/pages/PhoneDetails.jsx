import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import phones from "../../data/phones.json";

import {
  FaArrowLeft,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaBolt,
} from "react-icons/fa";

const PhoneDetails = () => {
  const { slug } = useParams();

  const phone = useMemo(() => {
    return phones.find((item) => item.slug === slug);
  }, [slug]);

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Product Not Found
          </h2>

          <Link to="/" className="btn btn-primary">
            Back To Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((phone.price - phone.discountPrice) / phone.price) * 100
  );

  const relatedPhones = phones
    .filter(
      (item) =>
        item.brand === phone.brand &&
        item._id !== phone._id
    )
    .slice(0, 4);

  return (
    <section className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">

        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/">Smartphones</Link>
            </li>

            <li>{phone.name}</li>
          </ul>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="btn btn-outline btn-sm mb-8"
        >
          <FaArrowLeft />
          Back
        </Link>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            {/* Main Image */}
            <div className="bg-base-200 rounded-3xl p-8">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-[500px] object-contain"
              />
            </div>

            {/* Gallery */}
            {phone.gallery?.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {phone.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="bg-base-200 rounded-xl p-3"
                  >
                    <img
                      src={image}
                      alt={`${phone.name}-${index}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* Brand */}
            <div className="badge badge-primary badge-lg mb-4">
              {phone.brand}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {phone.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <FaStar className="text-warning text-lg" />

              <span className="font-semibold">
                {phone.rating}
              </span>

              <span className="text-gray-500">
                ({phone.reviews?.length || 0} Reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-7 mb-8">
              {phone.description}
            </p>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4 mb-6">

              <span className="text-4xl font-bold text-primary">
                ${phone.discountPrice}
              </span>

              <span className="line-through text-2xl text-gray-400">
                ${phone.price}
              </span>

              <span className="badge badge-error badge-lg">
                -{discountPercent}%
              </span>

            </div>

            {/* Stock */}
            <div className="mb-8">
              {phone.stock > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="badge badge-success badge-lg">
                    In Stock
                  </div>

                  <span className="text-sm text-gray-500">
                    Only {phone.stock} left
                  </span>
                </div>
              ) : (
                <div className="badge badge-error badge-lg">
                  Out Of Stock
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mb-8">

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

            {/* Specifications */}
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Specifications
                </h2>

                <div className="overflow-x-auto">
                  <table className="table">

                    <tbody>

                      <tr>
                        <td className="font-semibold">
                          Display
                        </td>
                        <td>
                          {phone.specifications?.display}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          Processor
                        </td>
                        <td>
                          {phone.specifications?.processor}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          RAM
                        </td>
                        <td>
                          {phone.specifications?.ram}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          Storage
                        </td>
                        <td>
                          {phone.specifications?.storage}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          Battery
                        </td>
                        <td>
                          {phone.specifications?.battery}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          Camera
                        </td>
                        <td>
                          {phone.specifications?.camera}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-semibold">
                          Operating System
                        </td>
                        <td>
                          {phone.specifications?.os}
                        </td>
                      </tr>

                    </tbody>

                  </table>
                </div>

              </div>
            </div>

            {/* Product Description */}
            <div className="card bg-base-200 shadow-md mt-6">
              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Product Description
                </h2>

                <p className="leading-8 text-gray-600">
                  {phone.description}
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* Related Phones */}
        <div className="mt-20">

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">
              Related Phones
            </h2>

            <Link
              to="/"
              className="btn btn-outline btn-sm"
            >
              View All Phones
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedPhones.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 border hover:shadow-xl transition-all duration-300"
              >
                <figure className="p-4">
                  <Link to={`/phone/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-52 object-contain"
                    />
                  </Link>
                </figure>

                <div className="card-body pt-0">

                  <div className="badge badge-primary">
                    {item.brand}
                  </div>

                  <Link to={`/phone/${item.slug}`}>
                    <h2 className="card-title text-base hover:text-primary line-clamp-2">
                      {item.name}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-lg">
                      ${item.discountPrice}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ${item.price}
                    </span>
                  </div>

                  <Link
                    to={`/phone/${item.slug}`}
                    className="btn btn-primary btn-sm w-full mt-2"
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

export default PhoneDetails;