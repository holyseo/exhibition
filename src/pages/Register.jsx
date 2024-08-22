import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (password !== confirmPw) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Registration successful! Please check your email to confirm your account."
      );
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 mt-20 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="mt-2 text-red-600">{error}</div>}
          {success && <div className="mt-2 text-green-600">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 text-white rounded-lg bg-sky-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-10 text-center">
            Already with us?{" "}
            <a href="/login" className="font-bold text-blue-800 underline">
              Log in.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
