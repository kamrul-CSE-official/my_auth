import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import envConfig from "../config/envConfig";

const LoginPage = () => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);
    try {
      const req = await axios.post(`${envConfig.publicApi}/auth/login`, data);
      if (req?.data?.status === 200) {
        localStorage.setItem("accessToken", req?.data?.data?.accessToken);
        setMessage("Login successful!");
        window.location.href = "/profile";
      } else {
        setErrorMessage(req?.data?.message);
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleForgetPassword = async () => {
    const email = getValues("email");
    if (!email) {
      setErrorMessage("Email is required to reset password.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setErrorMessage(null);
    try {
      const req = await axios.post(
        `${envConfig.publicApi}/auth/forget-password`,
        { email }
      );
      if (req?.data?.status === 200) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setErrorMessage(req?.data?.message);
      }
    } catch (error) {
      console.log("Error during password reset:", error);
      setErrorMessage(
        "Failed to send password reset link. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && (
        <p style={{ fontSize: "20px" }} className="error-text">
          {errorMessage}
        </p>
      )}
      {message && <p style={{ color: "green", fontSize: "20px" }}>{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "100%" }}>
          <label htmlFor="email">Email</label>
          <input
            style={{ width: "100%" }}
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="password">Password</label>
          <input
            style={{ width: "100%" }}
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
          <button
            type="button"
            style={{ padding: "5px", margin: "10px" }}
            onClick={handleForgetPassword}
            disabled={loading}
          >
            Forget password!
          </button>
        </div>

        <button style={{ marginTop: "30px" }} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
};

export default LoginPage;
