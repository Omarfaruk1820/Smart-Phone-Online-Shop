import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { FaGoogle, FaEye, FaEyeSlash, FaMobileAlt } from "react-icons/fa";

import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Email Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const email = form.email.value.trim();

    const password = form.password.value;

    try {
      setLoading(true);

      await signInUser(email, password);

      form.reset();

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;

        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await signInWithGoogle();

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      setError("Google login failed.", error);
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

              <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>

              <p className="text-lg leading-relaxed opacity-90">
                Login to access your account, track orders, manage wishlist, and
                enjoy exclusive smartphone deals.
              </p>

              <div className="space-y-4 mt-10">
                <p>✅ Secure Authentication</p>

                <p>✅ Order Tracking & Purchase History</p>

                <p>✅ Wishlist & Favorites</p>

                <p>✅ Exclusive Flash Sales</p>

                <p>✅ Member Discounts</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 md:p-10 lg:p-14">
            <div className="max-w-md mx-auto">
              {/* Heading */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Login Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Sign in to continue shopping
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn btn-outline w-full"
              >
                <FaGoogle />
                Continue with Google
              </button>

              <div className="divider">OR</div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="label">
                    <span className="font-medium">Email Address</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
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
                      placeholder="Enter your password"
                      className="input input-bordered w-full pr-12"
                      required
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                    />

                    <span className="text-sm">Remember Me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-primary text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Logging In...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-bold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-8 bg-base-200 rounded-xl p-4">
                <p className="text-center text-sm text-gray-500">
                  🔒 Your account information is securely encrypted and
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

export default Login;
