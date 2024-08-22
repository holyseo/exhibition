import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Login success!");
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex items-start justify-center h-screen bg-gray-100">
        {!user ? (
          <div className="w-full max-w-md p-6 mt-20 space-y-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                <label className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <div className="mt-2 text-red-600">{error}</div>}
              {success && <div className="mt-2 text-green-600">{success}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 text-white rounded-lg bg-sky-800 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="mt-10 text-center">
                New around here?{" "}
                <a
                  href="/register"
                  className="font-bold text-blue-800 underline"
                >
                  Sign up!
                </a>
              </div>
            </form>
          </div>
        ) : (
          navigate("/")
        )}
      </div>
    </>
  );
};

export default Login;
