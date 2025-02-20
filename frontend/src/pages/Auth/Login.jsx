import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-wrap items-center justify-center lg:justify-between h-screen">
        <div className="w-full lg:w-1/2 px-8 lg:px-16 py-8 lg:py-0">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <h1 className="text-3xl font-bold mb-6 text-white">Welcome Back</h1>
              <p className="text-gray-400 mb-8">Please sign in to your account</p>

              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium
                    hover:bg-teal-600 transition-colors duration-200 transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader />
                      <span className="ml-2">Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <p className="text-center text-gray-400">
                  New Customer?{" "}
                  <Link
                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                    className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
                  >
                    Create an account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 h-screen">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;