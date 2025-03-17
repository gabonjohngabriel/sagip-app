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
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return { success: false, error: "No token found" };
      }
      
      // If using our temporary token workaround
      if (token.startsWith('temp_')) {
        const userId = token.split('_')[1];
        
        // Fetch user data directly instead of using auth/check
        const res = await axiosInstance.get(`/users/${userId}`);
        
        if (res.data && res.data._id) {
          set({ authUser: res.data });
          get().connectSocket();
          return { success: true };
        } else {
          throw new Error("Failed to fetch user data");
        }
      } else {
        // Standard token flow
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket();
        return { success: true };
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      localStorage.removeItem("token");
      set({ authUser: null });
      return { success: false, error: error.response?.data?.message || "Authentication failed" };
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
      // First, try normal login
      const res = await axiosInstance.post("/auth/login", data);
      
      if (res.data && res.data.token) {
        // Server returned proper token
        localStorage.setItem("token", res.data.token);
        set({ authUser: res.data.user || res.data });
        toast.success("Logged in successfully");
        get().connectSocket();
        return { success: true };
      } 
      else if (res.data && res.data._id) {
        // Server returned user but no token - use temporary token
        const tempToken = `temp_${res.data._id}_${Date.now()}`;
        localStorage.setItem("token", tempToken);
        set({ authUser: res.data });
        console.log("Using temporary token as workaround");
        toast.success("Logged in successfully");
        get().connectSocket();
        return { success: true };
      }
      else {
        throw new Error("Invalid response from server");
      }
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
    if (!authUser || !authUser._id) {
      console.warn("Cannot connect socket: No authenticated user");
      return;
    }
    
    // Disconnect existing socket if it exists
    get().disconnectSocket();
  
    try {
      const token = localStorage.getItem("token");
      
      const socket = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
          // Don't send the temporary token to the server
          // as it might reject it
          token: token.startsWith('temp_') ? undefined : token
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
        // If connection fails due to authentication, clear token
        if (error.message?.includes("authentication")) {
          localStorage.removeItem("token");
          set({ authUser: null });
        }
      });
  
      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        if (reason === "io server disconnect") {
          // Server disconnected us, try to reconnect
          socket.connect();
        }
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

  checkTokenExpiration: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    try {
      // If you're using JWT, you could decode it here to check expiration
      // For simple implementation, we'll just verify with the server
      return axiosInstance.get("/auth/check-token")
        .then(() => true)
        .catch(() => {
          // Token invalid or expired
          localStorage.removeItem("token");
          set({ authUser: null });
          return false;
        });
    } catch (error) {
      return false;
    }
  }
  
}));