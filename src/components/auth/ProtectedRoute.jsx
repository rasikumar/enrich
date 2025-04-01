/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/not-authorized" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      return <Navigate to="/session-expired" replace />; // Redirect to session expired page
    }

    // if (decodedToken.email !== "blogger@enrichminds.co.in") {
    //   localStorage.removeItem("jwtToken");
    //   return <Navigate to="/not-authorized" replace />;
    // }
  } catch (error) {
    // console.error("Error decoding token:", error);
    localStorage.removeItem("jwtToken");
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
