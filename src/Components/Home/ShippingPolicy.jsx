import {
  FaShippingFast,
  FaClock,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaShieldAlt,
  FaHeadset,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-content py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaShippingFast className="mx-auto text-6xl mb-5" />

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Shipping Policy
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Learn everything about our delivery process, shipping charges,
            estimated delivery times, and order tracking information.
          </p>
        </div>
      </section>

      {/* Shipping Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaTruck className="text-5xl text-primary" />
              <h2 className="font-bold text-xl mt-3">Nationwide Delivery</h2>
              <p className="text-gray-500">
                Fast and secure delivery across Bangladesh.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaClock className="text-5xl text-success" />
              <h2 className="font-bold text-xl mt-3">Fast Processing</h2>
              <p className="text-gray-500">
                Orders are processed within 24 hours.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaShieldAlt className="text-5xl text-warning" />
              <h2 className="font-bold text-xl mt-3">Safe Packaging</h2>
              <p className="text-gray-500">
                Products are packed with maximum protection.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaHeadset className="text-5xl text-secondary" />
              <h2 className="font-bold text-xl mt-3">Customer Support</h2>
              <p className="text-gray-500">
                Dedicated support for delivery assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkedAlt className="text-3xl text-primary" />
                  <h2 className="text-2xl font-bold">Delivery Coverage</h2>
                </div>

                <p className="text-gray-500 leading-8">
                  We provide delivery services throughout Bangladesh. Orders
                  inside Dhaka are generally delivered within 1-2 business days,
                  while deliveries outside Dhaka usually take 2-5 business days.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-3xl text-success" />
                  <h2 className="text-2xl font-bold">Processing Time</h2>
                </div>

                <p className="text-gray-500 leading-8">
                  Orders are verified and processed within 24 hours. Orders
                  placed on weekends or holidays may require additional
                  processing time.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaBoxOpen className="text-3xl text-warning" />
                  <h2 className="text-2xl font-bold">Packaging</h2>
                </div>

                <p className="text-gray-500 leading-8">
                  All smartphones and accessories are carefully packed to ensure
                  maximum protection during transportation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="card bg-base-100 shadow-2xl border">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-8">Shipping Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Inside Dhaka</h3>

                    <p className="text-gray-500">
                      Delivery Time: 1 - 2 Business Days
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Outside Dhaka</h3>

                    <p className="text-gray-500">
                      Delivery Time: 2 - 5 Business Days
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Order Tracking</h3>

                    <p className="text-gray-500">
                      Customers receive tracking updates via SMS or Email.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Shipping Charges</h3>

                    <p className="text-gray-500">
                      Shipping fees may vary depending on location and
                      promotional offers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Cash on Delivery</h3>

                    <p className="text-gray-500">
                      Cash on Delivery service is available in selected areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="hero bg-primary rounded-3xl text-primary-content shadow-2xl">
            <div className="hero-content text-center py-16">
              <div>
                <FaShippingFast className="mx-auto text-6xl mb-5" />

                <h2 className="text-4xl font-bold mb-5">
                  Fast, Secure & Reliable Shipping
                </h2>

                <p className="max-w-3xl mx-auto opacity-90 mb-8">
                  We are committed to delivering your orders safely and on time.
                  Customer satisfaction and secure delivery are our highest
                  priorities.
                </p>

                <button className="btn btn-neutral btn-lg">
                  Contact Customer Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
