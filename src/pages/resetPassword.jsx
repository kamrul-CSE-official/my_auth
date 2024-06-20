import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div>
      Reset password
      <br />
      {token && <p>{token}</p>}
    </div>
  );
};

export default ResetPasswordPage;
