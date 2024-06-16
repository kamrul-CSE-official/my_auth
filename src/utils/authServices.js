import { jwtDecode } from "jwt-decode";

export const userData = async () => {
  const token = (await localStorage.getItem("accessToken")) || null;
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};

export const logout = async () => {
  await localStorage.removeItem("accessToken");
};
