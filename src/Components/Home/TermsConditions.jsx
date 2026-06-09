import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaUserCheck,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const TermsConditions = () => {
  return (
    <section className="bg-base-100 min-h-screen">

      {/* Hero Section */}
      <div className="bg-base-200 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">

          <div className="flex flex-col items-center text-center">

            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <FaFileContract className="text-primary text-4xl" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Terms & Conditions
            </h1>

            <p className="max-w-3xl text-gray-500 text-lg">
              Please read these Terms and Conditions carefully before using
              our online smartphone store and purchasing any products.
            </p>

            <div className="badge badge-primary badge-lg mt-6">
              Last Updated: June 2026
            </div>

          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-16">

        <div className="space-y-8">

          {/* Introduction */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Welcome to MobileHub
              </h2>

              <p className="leading-8 text-gray-600">
                By accessing and using our website, you agree to comply
                with and be bound by these Terms and Conditions.
                These terms govern your use of our website, products,
                and services.
              </p>
            </div>
          </div>

          {/* Accounts */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaUserCheck className="text-primary" />
                User Accounts
              </h2>

              <ul className="space-y-3 list-disc ml-6 text-gray-600">
                <li>
                  You are responsible for maintaining your account security.
                </li>
                <li>
                  Provide accurate and complete registration information.
                </li>
                <li>
                  You must notify us immediately of any unauthorized access.
                </li>
                <li>
                  We reserve the right to suspend fraudulent accounts.
                </li>
              </ul>
            </div>
          </div>

          {/* Orders */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaShoppingBag className="text-primary" />
                Orders & Purchases
              </h2>

              <ul className="space-y-3 list-disc ml-6 text-gray-600">
                <li>
                  All orders are subject to product availability.
                </li>
                <li>
                  We reserve the right to cancel suspicious orders.
                </li>
                <li>
                  Product images are for illustration purposes only.
                </li>
                <li>
                  Specifications may vary depending on manufacturer updates.
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaCreditCard className="text-primary" />
                Pricing & Payments
              </h2>

              <ul className="space-y-3 list-disc ml-6 text-gray-600">
                <li>
                  Prices may change without prior notice.
                </li>
                <li>
                  Promotional offers are available for a limited time.
                </li>
                <li>
                  Payment must be completed before shipment.
                </li>
                <li>
                  We accept secure online payment methods.
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaTruck className="text-primary" />
                Shipping & Delivery
              </h2>

              <ul className="space-y-3 list-disc ml-6 text-gray-600">
                <li>
                  Delivery timelines may vary by location.
                </li>
                <li>
                  Shipping delays may occur due to unforeseen circumstances.
                </li>
                <li>
                  Customers must provide a valid delivery address.
                </li>
              </ul>
            </div>
          </div>

          {/* Returns */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaUndo className="text-primary" />
                Returns & Refunds
              </h2>

              <ul className="space-y-3 list-disc ml-6 text-gray-600">
                <li>
                  Products may be returned according to our Return Policy.
                </li>
                <li>
                  Returned items must be unused and in original packaging.
                </li>
                <li>
                  Refunds are processed after inspection and approval.
                </li>
              </ul>
            </div>
          </div>

          {/* Warranty */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl gap-3">
                <FaShieldAlt className="text-primary" />
                Warranty Policy
              </h2>

              <p className="leading-8 text-gray-600">
                Warranty coverage depends on the manufacturer’s policy.
                Customers should retain purchase invoices and warranty cards
                for future claims.
              </p>
            </div>
          </div>

          {/* Liability */}
          <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Limitation of Liability
              </h2>

              <p className="leading-8 text-gray-600">
                MobileHub shall not be liable for indirect, incidental,
                or consequential damages arising from the use of our
                products or services.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="card bg-primary text-primary-content">
            <div className="card-body">

              <h2 className="card-title text-3xl">
                Need Assistance?
              </h2>

              <p>
                If you have any questions regarding these Terms &
                Conditions, please contact our support team.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mt-4">

                <div className="flex items-center gap-3">
                  <FaEnvelope />
                  support@mobilehub.com
                </div>

                <div className="flex items-center gap-3">
                  <FaPhoneAlt />
                  +880 1234-567890
                </div>

              </div>

              <div className="mt-6">
                <Link
                  to="/contact"
                  className="btn btn-secondary"
                >
                  Contact Us
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TermsConditions;