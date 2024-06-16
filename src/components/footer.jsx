const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div style={{ margin: "100px", border: "1px solid", padding: "10px" }}>
      This is footer. @ {year}
    </div>
  );
};

export default Footer;
