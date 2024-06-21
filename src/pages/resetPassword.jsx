import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  return (
    <div>
      Reset password
      <br />
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default ResetPasswordPage;
