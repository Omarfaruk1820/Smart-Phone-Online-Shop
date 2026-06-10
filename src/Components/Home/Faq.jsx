import { useState } from "react";
import {
  FaQuestionCircle,
  FaSearch,
  FaTruck,
  FaUndo,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";

const faqData = [
  {
    category: "Orders",
    question: "How can I place an order?",
    answer:
      "Browse products, add your desired smartphone to the cart, proceed to checkout, and complete payment securely.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Inside Dhaka delivery usually takes 1-2 days, while nationwide delivery takes 2-5 business days.",
  },
  {
    category: "Payment",
    question: "Which payment methods are available?",
    answer:
      "We accept Cash on Delivery, bKash, Nagad, Rocket, Visa, MasterCard and online payment gateways.",
  },
  {
    category: "Warranty",
    question: "Do smartphones come with official warranty?",
    answer:
      "Yes. Most smartphones come with official brand warranty depending on the manufacturer.",
  },
  {
    category: "Returns",
    question: "Can I return a product?",
    answer:
      "Yes. You can request a return within 7 days according to our return policy.",
  },
  {
    category: "Refund",
    question: "How do refunds work?",
    answer:
      "Approved refunds are processed within 3-7 working days through your original payment method.",
  },
  {
    category: "Account",
    question: "Do I need an account to order?",
    answer:
      "No. Guest checkout is available, but creating an account helps track orders easily.",
  },
  {
    category: "Support",
    question: "How can I contact customer support?",
    answer:
      "You can contact us via phone, email, WhatsApp, or live chat support.",
  },
];

const Faq = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-content py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaQuestionCircle className="mx-auto text-6xl mb-5" />

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Frequently Asked Questions
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Find answers about orders, delivery, warranty, returns, payments,
            and customer support.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search FAQs..."
              className="input input-bordered w-full pl-12 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaTruck className="text-4xl text-primary" />
              <h2 className="font-bold">Shipping</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaUndo className="text-4xl text-success" />
              <h2 className="font-bold">Returns</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaCreditCard className="text-4xl text-secondary" />
              <h2 className="font-bold">Payments</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaShieldAlt className="text-4xl text-warning" />
              <h2 className="font-bold">Warranty</h2>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="card bg-base-100 shadow-2xl border">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold">No FAQ Found</h3>

                <p className="text-gray-500 mt-2">Try another keyword.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-plus bg-base-200"
                  >
                    <input type="radio" name="faq-accordion" />

                    <div className="collapse-title text-lg font-semibold">
                      {faq.question}
                    </div>

                    <div className="collapse-content">
                      <p className="text-gray-500">{faq.answer}</p>

                      <div className="badge badge-primary mt-3">
                        {faq.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero bg-primary rounded-3xl text-primary-content shadow-2xl">
            <div className="hero-content text-center py-14">
              <div>
                <FaHeadset className="mx-auto text-6xl mb-5" />

                <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>

                <p className="max-w-2xl mx-auto opacity-90 mb-8">
                  Our customer support team is available to help you with
                  orders, warranty claims, payments, returns, and technical
                  support.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="btn btn-neutral">
                    <FaHeadset />
                    Live Chat Support
                  </button>

                  <button className="btn btn-success">
                    <FaWhatsapp />
                    WhatsApp Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
