import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "100%" }}>
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            style={{ width: "100%" }}
            type="file"
            id="profilePic"
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

        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">Do you have an account ? Login</Link>
    </div>
  );
};

export default SignupPage;
