import { jwtDecode } from "jwt-decode";

export const userData = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const tokenDecode = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
