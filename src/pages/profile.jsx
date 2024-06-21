import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, userData } from "../utils/authServices";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userData();
        if (data) {
          setUser(data);
        } else {
          setError("Error loading user data.");
        }
      } catch (error) {
        setError("Error loading user data.");
        navigate("/login");
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-pic">
        <img
          src={user.img || "https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div style={{ margin: "30px 10px" }}>
        <button onClick={handleLogout} style={{ backgroundColor: "red" }}>
          Logout
        </button>
        <Link
          to={`/resetPassword?token=${localStorage.getItem("accessToken")}`}
        >
          <button style={{ backgroundColor: "blue" }}>Reset password</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
