import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../utils/authServices";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userData();
      if (data) setUser(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!user;
  // const isAuthenticated = true;

  return isAuthenticated ? children : navigate("/login");
  // return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
