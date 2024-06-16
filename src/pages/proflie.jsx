const ProfilePage = () => {
  // Mock user data for demonstration purposes
  const user = {
    profilePic: "https://via.placeholder.com/150", // Placeholder image URL
    fullName: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-pic">
        <img src={user.profilePic} alt="Profile" />
      </div>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div style={{ margin: "30px 10px" }}>
        <button style={{ backgroundColor: "red" }}>Logout</button>
        <button style={{ backgroundColor: "blue" }}>Reset password</button>
      </div>
    </div>
  );
};

export default ProfilePage;
