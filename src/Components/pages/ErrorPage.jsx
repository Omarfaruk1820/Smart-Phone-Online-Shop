import { Link, useRouteError } from "react-router-dom";
import {
  FaHome,
  FaMobileAlt,
  FaSearch,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-error/10 text-error mb-6">
              <FaExclamationTriangle />
              <span className="font-semibold">
                Page Not Found
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black text-primary">
              404
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Oops! This Page Doesn't Exist
            </h2>

            <p className="text-base-content/70 mt-6 text-lg leading-relaxed max-w-2xl">
              The page you're looking for may have been moved,
              deleted, renamed, or is temporarily unavailable.
              Let's get you back to exploring the latest
              smartphones and exclusive deals.
            </p>

            {error && (
              <div className="alert alert-error mt-6 max-w-xl">
                <span>
                  {error.statusText ||
                    error.message ||
                    "Unexpected Error"}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              <Link
                to="/"
                className="btn btn-primary"
              >
                <FaHome />
                Back To Home
              </Link>

              <Link
                to="/AllBrands"
                className="btn btn-outline"
              >
                <FaMobileAlt />
                Browse Phones
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-ghost"
              >
                <FaArrowLeft />
                Go Back
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="relative">

              {/* Background Glow */}
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full"></div>

              {/* Main Card */}
              <div className="relative bg-base-100 border shadow-2xl rounded-3xl p-10 w-full max-w-md">

                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaMobileAlt className="text-6xl text-primary" />
                  </div>
                </div>

                <h3 className="text-center text-2xl font-bold mb-4">
                  Smartphone Store
                </h3>

                <p className="text-center text-base-content/70 mb-8">
                  Find the latest smartphones, accessories,
                  smart watches and exclusive offers.
                </p>

                <div className="join w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered join-item w-full"
                  />

                  <button className="btn btn-primary join-item">
                    <FaSearch />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-8">
                  <div className="bg-base-200 rounded-xl p-3 text-center">
                    <div className="font-bold text-primary">
                      500+
                    </div>
                    <div className="text-xs">
                      Phones
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-xl p-3 text-center">
                    <div className="font-bold text-primary">
                      50+
                    </div>
                    <div className="text-xs">
                      Brands
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-xl p-3 text-center">
                    <div className="font-bold text-primary">
                      24/7
                    </div>
                    <div className="text-xs">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Suggestions */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold mb-8">
            Popular Destinations
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/"
              className="card bg-base-100 border shadow hover:shadow-lg transition-all"
            >
              <div className="card-body items-center text-center">
                <FaHome className="text-3xl text-primary" />
                <span className="font-semibold">
                  Home
                </span>
              </div>
            </Link>

            <Link
              to="/AllBrands"
              className="card bg-base-100 border shadow hover:shadow-lg transition-all"
            >
              <div className="card-body items-center text-center">
                <FaMobileAlt className="text-3xl text-primary" />
                <span className="font-semibold">
                  Smartphones
                </span>
              </div>
            </Link>

            <Link
              to="/accessories"
              className="card bg-base-100 border shadow hover:shadow-lg transition-all"
            >
              <div className="card-body items-center text-center">
                <FaSearch className="text-3xl text-primary" />
                <span className="font-semibold">
                  Accessories
                </span>
              </div>
            </Link>

            <Link
              to="/contact"
              className="card bg-base-100 border shadow hover:shadow-lg transition-all"
            >
              <div className="card-body items-center text-center">
                <FaExclamationTriangle className="text-3xl text-primary" />
                <span className="font-semibold">
                  Contact
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;