import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import flashProducts from "../../data/flashSaleData.json";

import {
  FaBolt,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaFire,
} from "react-icons/fa";

const FlashSale = () => {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 48);

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <div className="badge badge-error gap-2 px-4 py-4 text-white mb-4">
              <FaFire />
              Live Flash Sale
            </div>

            <h2 className="text-4xl font-bold mb-3 flex items-center gap-3">
              <FaBolt className="text-warning" />
              Flash Sale Deals
            </h2>

            <p className="text-base-content/70 max-w-xl">
              Grab the hottest smartphone deals before the timer runs out.
              Limited stock available.
            </p>
          </div>

          {/* Countdown */}
          <div className="flex gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-error text-white rounded-xl p-4 min-w-[75px] text-center shadow-lg"
              >
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-xs uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {flashProducts.map((product) => {
            const stockPercentage = (product.sold / product.stock) * 100;

            return (
              <div
                key={product.id}
                className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <figure className="relative overflow-hidden">
                

                  <Link to={`/flash-sale/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-72 w-full object-cover hover:scale-105 transition duration-500"
                    />
                  </Link>

                  <div className="absolute top-4 left-4 badge badge-error text-white font-bold">
                    -{product.discount}%
                  </div>

                  <button className="absolute top-4 right-4 btn btn-circle btn-sm bg-white border-none text-error">
                    <FaHeart />
                  </button>
                </figure>

                {/* Body */}
                <div className="card-body">
                  <div className="flex items-center gap-2 text-warning">
                    <FaStar />
                    <span>{product.rating}</span>
                  </div>

                  <h3 className="card-title text-lg">{product.name}</h3>

                  <div className="flex items-center gap-3">
                    <span className="text-primary text-2xl font-bold">
                      ৳{product.price.toLocaleString()}
                    </span>

                    <span className="line-through text-gray-400">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sold: {product.sold}</span>
                      <span>Stock: {product.stock}</span>
                    </div>

                    <progress
                      className="progress progress-error w-full"
                      value={stockPercentage}
                      max="100"
                    ></progress>
                  </div>

                  <div className="card-actions mt-4">
                    <button className="btn btn-primary flex-1">
                      <FaShoppingCart />
                      Add To Cart
                    </button>

                    <button className="btn btn-outline">
                      <FaArrowRight />
                    </button>

                    <Link
                      to={`/flash-sale/${product.id}`}
                      className="btn btn-outline"
                    >
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        {/* <div className="text-center mt-12">
          <Link to="/flash-sale" className="btn btn-primary btn-lg">
            View All Flash Deals
            <FaArrowRight />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default FlashSale;
