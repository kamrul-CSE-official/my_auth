import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <div>
      Reset password
      <br />
      {token && <p>{token}</p>}
    </div>
  );
};

export default ResetPasswordPage;
