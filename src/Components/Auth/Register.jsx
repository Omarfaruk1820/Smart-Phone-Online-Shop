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

    if (password !== confirmPassword) return setError("Passwords do not match");
    if (password.length < 6) return setError("Min 6 characters required");

    try {
      setLoading(true);

      await createUser(email, password, name);

      setSuccess("Account created successfully!");
      form.reset();

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-3xl bg-base-100 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button onClick={handleGoogle} className="btn btn-outline w-full">
          <FaGoogle /> Google Sign Up
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            className="input w-full"
            placeholder="Name"
            required
          />
          <input
            name="email"
            className="input w-full"
            placeholder="Email"
            required
          />
          <input
            name="phone"
            className="input w-full"
            placeholder="Phone"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input w-full"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="input w-full"
              placeholder="Confirm Password"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
