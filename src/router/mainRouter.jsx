import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/signup";
import LoginPage from "../pages/login";
import MainLayout from "../layouts/mainLayouts";
import PrivateRoute from "./privateRoute.jsx";
import ProfilePage from "../pages/proflie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
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
    ],
  },
]);

export default router;
