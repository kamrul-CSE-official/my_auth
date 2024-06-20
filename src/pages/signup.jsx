import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import envConfig from "../config/envConfig";
import { useState } from "react";

const SignupPage = () => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loding, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePic", data.profilePic[0]);
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const req = await axios.post(
        `${envConfig.publicApi}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      if (req?.data?.status === 200) {
        setMessage(req?.data?.message);
      } else {
        setErrorMessage(req?.data?.message);
      }
      reset();
    } catch (error) {
      setErrorMessage("Signup fail!");
      console.error("Error during signup:", error);
      setLoading(false);
      reset();
    } finally {
      setLoading(false);
      reset();
    }
  };

  const password = watch("password");

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errorMessage && (
        <p style={{ fontSize: "20px" }} className="error-text">
          {errorMessage}
        </p>
      )}
      {message && <p style={{ color: "green", fontSize: "20px" }}>{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "100%" }}>
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            style={{ width: "100%" }}
            type="file"
            id="profilePic"
            accept="image/png, image/gif, image/jpeg"
            {...register("profilePic", {
              required: "Profile picture is required",
            })}
          />
          {errors.profilePic && (
            <p className="error-text">{errors.profilePic.message}</p>
          )}
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="fullName">Full Name</label>
          <input
            style={{ width: "100%" }}
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="error-text">{errors.fullName.message}</p>
          )}
        </div>

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
        </div>

        <div style={{ width: "100%" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            style={{ width: "100%" }}
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

        {!loding ? (
          <button type="submit">Sign Up</button>
        ) : (
          <button>Loading....</button>
        )}
      </form>
      <Link to="/login">Do you have an account? Login</Link>
    </div>
  );
};

export default SignupPage;
