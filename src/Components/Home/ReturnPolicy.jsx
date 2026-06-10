import {
  FaUndoAlt,
  FaBoxOpen,
  FaClipboardCheck,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

const ReturnPolicy = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-content py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaUndoAlt className="mx-auto text-6xl mb-5" />

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Return & Refund Policy
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            We want you to shop with confidence. Read our return and refund
            policy to understand how replacements, returns, and refunds work.
          </p>
        </div>
      </section>

      {/* Policy Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaBoxOpen className="text-5xl text-primary" />
              <h2 className="font-bold text-xl mt-3">Easy Returns</h2>

              <p className="text-gray-500">
                Return eligible products within 7 days.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaExchangeAlt className="text-5xl text-success" />
              <h2 className="font-bold text-xl mt-3">Replacement Support</h2>

              <p className="text-gray-500">
                Defective products can be replaced easily.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaMoneyBillWave className="text-5xl text-warning" />
              <h2 className="font-bold text-xl mt-3">Fast Refunds</h2>

              <p className="text-gray-500">
                Refunds are processed quickly after approval.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body items-center text-center">
              <FaHeadset className="text-5xl text-secondary" />
              <h2 className="font-bold text-xl mt-3">Customer Support</h2>

              <p className="text-gray-500">
                Dedicated support team for return assistance.
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
                  <FaClipboardCheck className="text-3xl text-primary" />
                  <h2 className="text-2xl font-bold">
                    Eligible Return Conditions
                  </h2>
                </div>

                <ul className="space-y-3 text-gray-500">
                  <li>✅ Product must be unused and in original condition.</li>
                  <li>✅ Original packaging and accessories are required.</li>
                  <li>✅ Return request must be submitted within 7 days.</li>
                  <li>✅ Proof of purchase is mandatory.</li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <FaTimesCircle className="text-3xl text-error" />
                  <h2 className="text-2xl font-bold">Non-Returnable Items</h2>
                </div>

                <ul className="space-y-3 text-gray-500">
                  <li>❌ Products damaged by misuse.</li>
                  <li>❌ Missing accessories or packaging.</li>
                  <li>❌ Software-related issues after activation.</li>
                  <li>❌ Products returned after the return window.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="card bg-base-100 shadow-2xl border">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-8">Return Process</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />

                  <div>
                    <h3 className="font-bold text-lg">
                      Step 1: Submit Request
                    </h3>

                    <p className="text-gray-500">
                      Contact our support team and provide your order details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />

                  <div>
                    <h3 className="font-bold text-lg">
                      Step 2: Product Inspection
                    </h3>

                    <p className="text-gray-500">
                      Our team reviews the product and verifies eligibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />

                  <div>
                    <h3 className="font-bold text-lg">Step 3: Approval</h3>

                    <p className="text-gray-500">
                      Approved returns proceed to replacement or refund.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaCheckCircle className="text-success text-2xl mt-1" />

                  <div>
                    <h3 className="font-bold text-lg">
                      Step 4: Refund Process
                    </h3>

                    <p className="text-gray-500">
                      Refunds are generally completed within 3–7 working days.
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
                <FaUndoAlt className="mx-auto text-6xl mb-5" />

                <h2 className="text-4xl font-bold mb-5">
                  Shop With Confidence
                </h2>

                <p className="max-w-3xl mx-auto opacity-90 mb-8">
                  Your satisfaction is our priority. Our hassle-free return
                  policy ensures a secure and reliable shopping experience.
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

export default ReturnPolicy;
