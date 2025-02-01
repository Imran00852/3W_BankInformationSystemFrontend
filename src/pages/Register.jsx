import { useContext, useState } from "react";
import { data, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState();
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/register`,
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.msg);
      setLoading(false);
      setUserId(data.user._id);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsAuthenticated(false);
      setRedirect(true);
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  if (isAuthenticated && userId) return <Navigate to={`/${userId}`} />;
  if (redirect) return <Navigate to={"/register"} />;
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Sign Up</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
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
              required
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary text-decoration-none">
            Sign In
          </Link>
        </p>

        <p className="text-center mt-2">
          <strong>Admin?</strong>{" "}
          <Link
            to={"/admin-login"}
            className="text-danger text-decoration-none"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
