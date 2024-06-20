import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/signup";
import LoginPage from "../pages/login";
import MainLayout from "../layouts/mainLayouts";
import PrivateRoute from "./privateRoute.jsx";
import ProfilePage from "../pages/profile.jsx";
import HomePage from "../pages/home.jsx";
import ResetPasswordPage from "../pages/resetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "resetPassword",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

export default router;
