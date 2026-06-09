import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserLock,
  FaCookieBite,
  FaDatabase,
  FaLock,
  FaUserCheck,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  // Simple native JS date (no moment.js)
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const privacyHighlights = [
    "100% Secure Shopping Experience",
    "SSL Encrypted Transactions",
    "Protected Customer Data",
    "Safe Payment Gateway",
    "Privacy First Policy",
    "Trusted Smartphone Marketplace",
  ];

  const usageItems = [
    "Process Orders",
    "Customer Support",
    "Fraud Prevention",
    "Website Improvement",
    "Marketing Updates",
    "Product Recommendations",
  ];

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 text-center">
        <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto leading-7">
          At MobileHub, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        <div className="mt-6 badge badge-primary">
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {privacyHighlights.map((item, index) => (
            <span
              key={index}
              className="bg-base-200 px-4 py-2 rounded-full text-sm text-primary font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-md sticky top-24">
            <div className="card-body text-sm space-y-3">
              <a href="#collection" className="hover:text-primary">
                Information Collection
              </a>
              <a href="#usage" className="hover:text-primary">
                How We Use Data
              </a>
              <a href="#cookies" className="hover:text-primary">
                Cookies Policy
              </a>
              <a href="#security" className="hover:text-primary">
                Data Security
              </a>
              <a href="#rights" className="hover:text-primary">
                Your Rights
              </a>
              <a href="#contact" className="hover:text-primary">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3 space-y-8">
          {/* COLLECTION */}
          <div id="collection" className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="card-title gap-2">
                <FaDatabase className="text-primary" />
                Information We Collect
              </h2>

              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Full Name</li>
                <li>• Email Address</li>
                <li>• Phone Number</li>
                <li>• Shipping Address</li>
                <li>• Order History</li>
                <li>• Device Information</li>
              </ul>
            </div>
          </div>

          {/* USAGE */}
          <div id="usage" className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="card-title gap-2">
                <FaUserCheck className="text-primary" />
                How We Use Your Data
              </h2>

              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {usageItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-base-200 p-3 rounded-lg"
                  >
                    <FaCheckCircle className="text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COOKIES */}
          <div id="cookies" className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="card-title gap-2">
                <FaCookieBite className="text-primary" />
                Cookies Policy
              </h2>

              <p className="text-gray-600 leading-7">
                We use cookies to improve website performance, analyze traffic,
                and personalize your shopping experience.
              </p>
            </div>
          </div>

          {/* SECURITY */}
          <div id="security" className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="card-title gap-2">
                <FaLock className="text-primary" />
                Data Security
              </h2>

              <p className="text-gray-600 leading-7">
                We use SSL encryption, secure servers, and industry-standard
                protection systems to keep your data safe.
              </p>
            </div>
          </div>

          {/* RIGHTS */}
          <div id="rights" className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="card-title gap-2">
                <FaUserLock className="text-primary" />
                Your Rights
              </h2>

              <ul className="mt-4 space-y-2 text-gray-600">
                <li>✓ Access Your Data</li>
                <li>✓ Update Information</li>
                <li>✓ Delete Account</li>
                <li>✓ Control Marketing Preferences</li>
                <li>✓ Request Data Export</li>
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div id="contact" className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Questions About Privacy?
              </h2>

              <p className="mt-2">
                Contact our support team for any privacy-related concerns.
              </p>

              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <FaEnvelope /> support@mobilehub.com
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt /> +880 1234-567890
                </p>
              </div>

              <Link to="/contact" className="btn btn-secondary mt-6 w-fit">
                Contact Support <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;