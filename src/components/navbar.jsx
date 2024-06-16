import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          gap: "50px",
          margin: "30px",
          border: "1px solid",
          padding: "20px 50px",
        }}
      >
        <li style={{ listStyle: "none", color: "orange", fontWeight: "bold" }}>
          <Link style={{ color: "orange" }} to="/">
            MY AUTH
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
