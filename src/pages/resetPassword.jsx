import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logout, tokenDecode } from "../utils/authServices";
import axios from "axios";
import envConfig from "../config/envConfig";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    setMessage(null);

    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${envConfig.publicApi}/auth/reset-password`,
        {
          email: data.email,
          newPassword: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data && response?.data?.status === 200) {
        setMessage(response?.data?.message);
        logout();
        window.location.href = "/login";
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      reset();
    }
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
                disabled={loading}
              />
              {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
              {message && (
                <p style={{ color: "green", textAlign: "center" }}>{message}</p>
              )}
              {errorMessage && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {errorMessage}
                </p>
              )}
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
