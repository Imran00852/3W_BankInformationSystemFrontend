import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const server =
  "https://3-w-bank-information-system-backend.vercel.app/api";
export const context = createContext({
  isAuthenticated: false,
  loading: false,
  user: {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </context.Provider>
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
