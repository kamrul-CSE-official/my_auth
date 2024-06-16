import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userData } from "../utils/authServices";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userData();
      setUser(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const isAuthenticated = !!user;
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
