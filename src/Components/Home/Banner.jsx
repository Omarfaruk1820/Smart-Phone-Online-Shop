import { useState } from "react";
import { FaBolt, FaShoppingCart, FaTags, FaArrowRight } from "react-icons/fa";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  const [offers] = useState([
    {
      id: 1,
      title: "Mega Smartphone Sale 2026",
      subtitle: "Up to 40% OFF on Latest Flagship Phones",
      highlight: "Limited Time Offer",
      image:
        "https://i.ibb.co.com/y3HPhxY/bobby-raj-sirimani-lkhz29-AXTTc-unsplash.jpg",
      discount: "40% OFF",
      endDate: moment().add(5, "days").format("MMMM DD, YYYY"),
      btnText: "Shop Now",
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: 2,
      title: "Buy 1 Get Accessories FREE",
      subtitle: "Exclusive deal on premium smartphones",
      highlight: "Hot Deal",
      image:
        "https://i.ibb.co.com/tT4DfkgZ/amanz-f-Yru5-LNy-Ji-M-unsplash.jpg",
      discount: "FREE GIFTS",
      endDate: moment().add(3, "days").format("MMMM DD, YYYY"),
      btnText: "Explore Deals",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: 3,
      title: "Latest 5G Smartphones",
      subtitle: "Experience next-gen speed & performance",
      highlight: "New Arrival",
      image:
        "https://i.ibb.co.com/yFfdPf4L/marios-gkortsilas-v-yctr-Wm-RHo-unsplash.jpg",
      discount: "NEW",
      endDate: moment().add(10, "days").format("MMMM DD, YYYY"),
      btnText: "View Collection",
      color: "from-green-600 to-emerald-700",
    },
  ]);

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {offers.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative w-full h-[80vh] flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="relative z-12 max-w-4xl text-center px-4">
                <div className="flex justify-center mb-4">
                  <span className="bg-red-500 px-4 py-1 rounded-full text-sm flex items-center gap-2">
                    <FaBolt /> {item.highlight}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {item.title}
                </h1>

                <p className="text-gray-200 text-lg mb-4">
                  {item.subtitle}
                </p>

                <div className="flex justify-center items-center gap-4 mb-6">
                  <span className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2">
                    <FaTags /> {item.discount}
                  </span>

                  <span className="text-sm text-gray-300">
                    Ends: {item.endDate}
                  </span>
                </div>

                <Link
                  to="/shop"
                  className="btn btn-primary px-6 py-3 text-lg flex items-center gap-2"
                >
                  <FaShoppingCart />
                  {item.btnText}
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Feature Strip */}
      <div className="bg-base-200 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-4 text-sm">
          <div>🚚 Free Delivery Across Bangladesh</div>
          <div>🔒 100% Secure Payment System</div>
          <div>📞 24/7 Customer Support</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;