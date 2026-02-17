import api from "../axios";

export const login = async (data) => {
  const res = await api.post("/api/auth/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/api/auth/register", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

