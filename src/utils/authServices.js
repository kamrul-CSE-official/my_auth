import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) {
      return true; // If no exp field, consider token expired
    }
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // If there's an error decoding, consider token expired
  }
};

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
