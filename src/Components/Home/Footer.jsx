import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>

              <p className="text-neutral-content/70">
                Subscribe to receive the latest smartphone launches, exclusive
                deals, flash sales, and technology news.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full text-black"
              />

              <button className="btn btn-primary px-8">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold text-primary">
              MobileHub
            </Link>

            <p className="mt-4 text-neutral-content/70 leading-7">
              MobileHub is your trusted destination for premium smartphones,
              accessories, and smart gadgets from the world's leading brands
              including Samsung, Apple, Xiaomi, Vivo, Oppo, OnePlus, and more.
            </p>

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+880 1822637989</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>Omarfaruk@mobilehub.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="footer-title">Shop</h3>

            <div className="flex flex-col gap-3">
              <Link to="/AllBrands" className="link link-hover">
                All Smartphones
              </Link>

              <Link to="/flash-sale" className="link link-hover">
                Flash Sale
              </Link>

              <Link to="/featured" className="link link-hover">
                Featured Products
              </Link>

              <Link to="/new-arrivals" className="link link-hover">
                New Arrivals
              </Link>

              <Link to="/best-sellers" className="link link-hover">
                Best Sellers
              </Link>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="footer-title">Top Brands</h3>

            <div className="flex flex-col gap-3">
              <Link to="/brand/Samsung" className="link link-hover">
                Samsung
              </Link>

              <Link to="/brand/Apple" className="link link-hover">
                Apple
              </Link>

              <Link to="/brand/Xiaomi" className="link link-hover">
                Xiaomi
              </Link>

              <Link to="/brand/Vivo" className="link link-hover">
                Vivo
              </Link>

              <Link to="/brand/Oppo" className="link link-hover">
                Oppo
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-title">Customer Support</h3>

            <div className="flex flex-col gap-3">
              <Link to="/contact" className="link link-hover">
                Contact Us
              </Link>

              <Link to="/faq" className="link link-hover">
                FAQ
              </Link>

              <Link to="/Shipping-Policy" className="link link-hover">
                Shipping Policy
              </Link>

              <Link to="/Return-Policy" className="link link-hover">
                Return Policy
              </Link>

              <Link to="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Social */}
      <div className="border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Payment */}
            <div>
              <h4 className="font-semibold mb-3 text-center lg:text-left">
                Secure Payment Methods
              </h4>

              <div className="flex items-center gap-4 text-4xl">
                <FaCcVisa />
                <FaCcMastercard />
                <FaCcPaypal />
                <FaGooglePay />
                <FaApplePay />
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-3 text-center lg:text-left">
                Follow Us
              </h4>

              <div className="flex gap-4">
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/omar.faruk.469436"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>

                  <a
                    href="https://www.instagram.com/omarfarukfci9th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>

                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-outline"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-content/70 text-center">
              © {currentYear} Omar Faruk. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/Terms&Conditions" className="hover:text-primary">
                Terms & Conditions
              </Link>

              <Link to="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>

              <Link to="/cookies" className="hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
