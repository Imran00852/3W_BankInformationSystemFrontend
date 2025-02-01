import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import BankDetails from "./pages/BankDetails";
import AdminPanel from "./pages/AdminPanel";
import toast, { Toaster } from "react-hot-toast";
import { context, server } from "./main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";
const App = () => {
  const { setUser, setIsAuthenticated, setLoading, isAuthenticated, user } =
    useContext(context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsAuthenticated(false);
        setUser({});
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to={`/${user?._id}`} /> : <Register />
          }
        />

        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <BankDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
