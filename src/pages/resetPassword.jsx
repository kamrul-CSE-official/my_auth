import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { tokenDecode } from "../utils/authServices";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const decodedUser = tokenDecode(token);
      if (decodedUser) {
        setUser(decodedUser);
        setValue("name", decodedUser.name);
        setValue("email", decodedUser.email);
      } else {
        navigate("/login");
      }
    }
  }, [token, navigate, setValue]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(data);
    // Implement password reset logic here
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      {token ? (
        user ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={user.img || "https://via.placeholder.com/150"}
                alt="Profile"
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
                disabled
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
                disabled
              />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="New Password"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
              {errors.password && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.password.message}
                </p>
              )}
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                type="password"
                placeholder="Confirm Password"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
              {errors.confirmPassword && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.confirmPassword.message}
                </p>
              )}
              <input
                type="submit"
                value="Reset Password"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              />
            </form>
          </div>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResetPasswordPage;
