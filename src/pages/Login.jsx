import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { data, Link, Navigate } from "react-router-dom";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState(null);

  const { setLoading, setIsAuthenticated, isAuthenticated, loading } =
    useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.msg);
      setUserId(data.user._id);
      setLoading(false);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
      setRedirect(true);
      setIsAuthenticated(false);
    }
  };

  // Redirect on failed login
  useEffect(() => {
    if (redirect) setRedirect(false); // Reset redirect state
  }, [redirect]);

  if (loading) return <Loader />;
  if (isAuthenticated && userId) return <Navigate to={`/${userId}`} />;
  if (redirect) return <Navigate to={"/login"} />;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-primary text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
