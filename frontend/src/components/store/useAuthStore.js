import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Use a hardcoded BASE_URL instead of import.meta.env.MODE
// For production, you might want to use window.location.origin or a specific URL
const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002/api"
  : "https://sagip-app.onrender.com/api";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
      return { success: true };
    } catch (error) {
      toast.error(error.response.data.message);
      return { success: false, error: error.response.data.message };
    } finally {
      set({ isSigningUp: false });
    }
  },

login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    console.log("Full login response:", res);
    console.log("Response data:", res.data);
    console.log("Response headers:", res.headers);

    // If you know exactly where the token should be, use that directly
    const token = res.data.token; // Or whatever the correct path is
    
    if (token) {
      localStorage.setItem("token", token);
      set({
        authUser: res.data.user || res.data,
        token: token,
      });
      
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true };
    } else {
      console.error("Token not found in response:", res);
      throw new Error("No token received from server");
    }
  } catch (error) {

      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Attempting to connect socket for user:", authUser._id);

    // Make sure we have a valid SOCKET_URL
    if (!SOCKET_URL) {
      console.error("Socket URL is missing or invalid");
      return;
    }

    try {
      const socket = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"], // Try websocket first, fallback to polling
      });

      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.connect();
      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    } catch (err) {
      console.error("Error initializing socket:", err);
    }
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
