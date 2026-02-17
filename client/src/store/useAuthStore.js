import { create } from "zustand";
import { login as loginService, register as registerService } from "../api/services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: !!localStorage.getItem("token"),
  isChecking: true,

  registration: async (credentials) => {
    try {
      const data = await registerService(credentials);
      localStorage.setItem("token", data.token)
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Помилка реєстрації",
      };
    }
  },

  login: async (credentials) => {
    try {
      const data = await loginService(credentials);
      localStorage.setItem("token", data.token);
      set({ user: data.user, isAuth: true });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Помилка логіну",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuth: false });
  },
}));


export default useAuthStore;
