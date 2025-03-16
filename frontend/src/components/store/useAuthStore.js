import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Use a hardcoded BASE_URL instead of import.meta.env.MODE
// For production, you might want to use window.location.origin or a specific URL
const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002"  // Match your API server port
    : "https://sagip-app.onrender.com";  // Or wherever your socket server is hosted

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
      
      // Check if token exists in the expected format
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        set({ 
          authUser: res.data.user || res.data, // Handle both formats
          token: res.data.token 
        });
      } 
      // Handle case where API returns user directly without nesting
      else if (res.data && res.data._id) {
        // Look for token somewhere else in the response, or generate a default one for testing
        const token = res.data.token || res.headers?.authorization?.split(' ')[1];
        if (token) {
          localStorage.setItem("token", token);
          set({ 
            authUser: res.data,
            token: token
          });
        } else {
          console.warn("API response missing token, authentication may fail");
          set({ authUser: res.data });
        }
      }      
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
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
  
    const socket = io(SOCKET_URL, {
      query: {
        userId: authUser._id,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
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
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
