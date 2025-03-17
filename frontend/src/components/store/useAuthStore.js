import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Define the API and socket URLs
const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002/api"
  : "https://sagip-app.onrender.com/api";

const SOCKET_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5002"
  : "https://sagip-app.onrender.com";

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
      const token = localStorage.getItem("token");
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }
      
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      localStorage.removeItem("token"); // Clear invalid token
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      
      // Make sure we properly handle the token
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        set({ authUser: res.data.user || res.data });
        toast.success("Account created successfully");
        get().connectSocket();
        return { success: true };
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("Login response:", res.data);
      
      // Handle various response formats
      let token = null;
      let user = null;
      
      // Check different possible token locations
      if (res.data.token) {
        token = res.data.token;
        user = res.data.user || res.data;
      } else if (res.data.user && res.data.user.token) {
        token = res.data.user.token;
        user = res.data.user;
      } else if (typeof res.data === 'object') {
        // Try to find the token in any top-level property
        for (const key in res.data) {
          if (typeof res.data[key] === 'string' && res.data[key].length > 20) {
            // This is likely the token
            token = res.data[key];
            user = res.data;
            break;
          }
        }
      }
      
      if (!token) {
        console.error("Token not found in response:", res.data);
        throw new Error("No token received from server");
      }
      
      // Store token and user data
      localStorage.setItem("token", token);
      set({ authUser: user });
      
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.error(error.response?.data?.message || "Error during logout");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Attempting to connect socket for user:", authUser._id);

    try {
      const socket = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"],
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
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));