import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaMobileAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return setError("Password must contain at least one special character.");
    }

    try {
      setLoading(true);

      await createUser(email, password, name);

      // Future MongoDB Save
      const userInfo = {
        name,
        email,
        phone,
        role: "customer",
        createdAt: new Date(),
      };

      console.log(userInfo);

      setSuccess("Account created successfully!");

      form.reset();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Google Register
  const handleGoogleRegister = async () => {
    try {
      setLoading(true);

      await signInWithGoogle();

      navigate("/");
    } catch (err) {
      setError(err?.message || "Google Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-6 md:py-10">
      <div className="w-full max-w-7xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-primary via-secondary to-accent text-white p-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <FaMobileAlt className="text-5xl" />

                <h1 className="text-5xl font-bold">MobileHub</h1>
              </div>

              <h2 className="text-4xl font-bold mb-6">Join MobileHub Today</h2>

              <p className="text-lg leading-relaxed opacity-90">
                Create your account and enjoy exclusive smartphone deals, order
                tracking, wishlist management and member-only discounts.
              </p>

              <div className="space-y-4 mt-10">
                <p>✅ Order Tracking & Purchase History</p>

                <p>✅ Save Favorite Products</p>

                <p>✅ Exclusive Flash Sale Access</p>

                <p>✅ Secure Checkout</p>

                <p>✅ Personalized Shopping Experience</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 md:p-10 lg:p-14">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Register and start shopping
                </p>
              </div>

              {/* Google Register */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="btn btn-outline w-full"
              >
                <FaGoogle />
                Continue with Google
              </button>

              <div className="divider">OR</div>

              {/* Error */}
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="alert alert-success mb-4">
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="label">
                    <span className="font-medium">Full Name</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="font-medium">Email Address</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="font-medium">Phone Number</span>
                  </label>

                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter phone number"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="label">
                    <span className="font-medium">Password</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
                      className="input input-bordered w-full pr-12"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-4 right-4"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="label">
                    <span className="font-medium">Confirm Password</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="input input-bordered w-full pr-12"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-4 right-4"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mt-1"
                    required
                  />

                  <span className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary font-semibold">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-bold">
                    Login Now
                  </Link>
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4 mt-8">
                <p className="text-center text-sm text-gray-500">
                  🔒 Your personal information is encrypted and securely
                  protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
