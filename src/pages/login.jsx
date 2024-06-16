import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
          <Link to="#">Forget password !</Link>
        </div>

        <button style={{ marginTop: "30px" }} type="submit">
          Login
        </button>
      </form>
      <Link to="/signup">Do not have an account? Sign Up</Link>
    </div>
  );
};

export default LoginPage;
