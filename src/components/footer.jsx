import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div style={{ margin: "100px", border: "1px solid", padding: "10px" }}>
      This is footer. <br />
      <div
        style={{
          listStyle: "none",
          fontWeight: "bold",
          display: "flex",
          gap: "10px",
        }}
      >
        <Link style={{ color: "orange" }} to="/">
          MY AUTH
        </Link>
        @ {year}
      </div>
    </div>
  );
};

export default Footer;
