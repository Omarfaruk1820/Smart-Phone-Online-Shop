import { Link } from "react-router-dom";
import moment from "moment";
import Marquee from "react-fast-marquee";

import {
  FaShieldAlt,
  FaUserLock,
  FaCookieBite,
  FaDatabase,
  FaLock,
  FaUserCheck,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const lastUpdated = moment().format("MMMM DD, YYYY");

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
    <div className="w-full">
      {/* Top Notice Marquee */}
      <div className="bg-base-200 py-2">
        <Marquee pauseOnHover speed={50}>
          {privacyHighlights.map((item, index) => (
            <span
              key={index}
              className="mx-6 text-sm font-medium text-primary"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-8">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <FaShieldAlt className="text-primary text-5xl" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>

          <p className="text-lg text-gray-500 leading-8 max-w-3xl mx-auto">
            At MobileHub, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, store, and safeguard
            your personal information.
          </p>

          <div className="mt-8">
            <div className="badge badge-primary badge-lg">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-20 grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="font-bold text-xl mb-4">Quick Navigation</h3>

                <div className="space-y-3 text-sm">
                  <a href="#collection" className="block hover:text-primary">
                    Information Collection
                  </a>
                  <a href="#usage" className="block hover:text-primary">
                    How We Use Data
                  </a>
                  <a href="#cookies" className="block hover:text-primary">
                    Cookies Policy
                  </a>
                  <a href="#security" className="block hover:text-primary">
                    Data Security
                  </a>
                  <a href="#rights" className="block hover:text-primary">
                    Your Rights
                  </a>
                  <a href="#contact" className="block hover:text-primary">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Information Collection */}
          <div id="collection" className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaDatabase className="text-primary" />
                Information We Collect
              </h2>

              <ul className="space-y-3 mt-4 text-gray-600">
                <li>• Full Name</li>
                <li>• Email Address</li>
                <li>• Phone Number</li>
                <li>• Billing & Shipping Address</li>
                <li>• Order History</li>
                <li>• Payment Information</li>
              </ul>
            </div>
          </div>

          {/* Usage */}
          <div id="usage" className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaUserCheck className="text-primary" />
                How We Use Your Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {usageItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-base-200 p-4 rounded-lg"
                  >
                    <FaCheckCircle className="text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div id="cookies" className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaCookieBite className="text-primary" />
                Cookies Policy
              </h2>
              <p className="text-gray-600 leading-7">
                We use cookies to improve user experience, analyze traffic, and
                personalize content.
              </p>
            </div>
          </div>

          {/* Security */}
          <div id="security" className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaLock className="text-primary" />
                Data Security
              </h2>
              <p className="text-gray-600 leading-7">
                We use SSL encryption, secure servers, and industry-standard
                protection systems.
              </p>
            </div>
          </div>

          {/* Rights */}
          <div id="rights" className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaUserLock className="text-primary" />
                Your Rights
              </h2>

              <ul className="space-y-2 mt-4 text-gray-600">
                <li>✓ Access Your Data</li>
                <li>✓ Update Information</li>
                <li>✓ Delete Account</li>
                <li>✓ Control Marketing</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-3xl">
                Questions About Privacy?
              </h2>

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
    </div>
  );
};

export default PrivacyPolicy;