import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../main";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/admin/login`,
        { username, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (data.msg === "Welcome admin!") {
        toast.success(data.msg);
        localStorage.setItem("isAdminAuthenticated", "true");
        navigate("/admin-panel");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Admin Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Admin Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Admin Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Go Back Button */}
        <button
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate("/login")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
