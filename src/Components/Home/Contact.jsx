import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaHeadset,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact MobileHub
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">
          Have questions about smartphones, orders, warranty, delivery,
          payments, or technical support? Our team is always ready to help you.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaPhoneAlt className="text-4xl text-primary" />
              <h2 className="card-title">Call Us</h2>
              <p>+880 1712-345678</p>
              <p>+880 1912-345678</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaEnvelope className="text-4xl text-primary" />
              <h2 className="card-title">Email Us</h2>
              <p>support@mobilehub.com</p>
              <p>sales@mobilehub.com</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaMapMarkerAlt className="text-4xl text-primary" />
              <h2 className="card-title">Our Location</h2>
              <p>Dhaka, Bangladesh</p>
              <p>MobileHub Corporate Office</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaClock className="text-4xl text-primary" />
              <h2 className="card-title">Business Hours</h2>
              <p>Sat - Thu</p>
              <p>09:00 AM - 10:00 PM</p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form + Support */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-2xl border">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-6">
                Send Us A Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-6">

            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <FaHeadset className="text-5xl mb-3" />
                <h2 className="text-3xl font-bold">Customer Support</h2>
                <p>
                  Need help with orders, warranty claims, refunds,
                  product information or technical support?
                </p>
                <button className="btn btn-neutral mt-4">
                  Live Chat Support
                </button>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4">
                  Why Shop With Us?
                </h3>

                <ul className="space-y-2">
                  <li>✅ 100% Genuine Smartphones</li>
                  <li>✅ Official Brand Warranty</li>
                  <li>✅ Secure Payment Gateway</li>
                  <li>✅ Fast Nationwide Delivery</li>
                  <li>✅ Dedicated Customer Service</li>
                  <li>✅ Easy Return Policy</li>
                </ul>
              </div>
            </div>

            {/* Social */}
            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>

                <div className="flex gap-4">
                  <button className="btn btn-circle btn-primary">
                    <FaFacebookF />
                  </button>

                  <button className="btn btn-circle btn-secondary">
                    <FaInstagram />
                  </button>

                  <button className="btn btn-circle btn-success">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

   {/* Google Map */}
<section className="max-w-7xl mx-auto px-4 pb-20">
  <div className="card bg-base-100 shadow-xl border overflow-hidden">
    <div className="card-body">
      <h2 className="text-3xl font-bold mb-6">
        Visit Our Store
      </h2>

      <div className="rounded-xl overflow-hidden w-full h-[450px]">
        <iframe
          title="Google Map - MobileHub Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.950527526817!2d90.3912588759567!3d23.750916188796876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAyLjkiTiA5MMKwMjMnMjguNSJF!5e0!3m2!1sen!2sbd!4v1710000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</section>

      {/* FAQ Banner */}
      <section className="bg-base-200 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Quick Answers?
          </h2>

          <p className="text-lg text-gray-500 mb-6">
            Visit our FAQ section to find answers about orders,
            delivery, payments, warranty and returns.
          </p>

          <button className="btn btn-primary btn-lg">
            View FAQs
          </button>
        </div>
      </section>

    </div>
  );
};

export default Contact;