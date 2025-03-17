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
      
      // Try standard token check first
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket();
        return { success: true };
      } catch (error) {
        // If standard check fails and we have a temp token, try that approach
        if (token && token.startsWith('temp_')) {
          const userId = token.split('_')[1];
          
          try {
            // Fetch user data directly instead of using auth/check
            const res = await axiosInstance.get(`/users/${userId}`);
            
            if (res.data && res.data._id) {
              set({ authUser: res.data });
              get().connectSocket();
              return { success: true };
            } else {
              throw new Error("Failed to fetch user data");
            }
          } catch (tempError) {
            console.error("Temp token approach failed:", tempError);
            throw tempError; // Re-throw to be caught by outer catch
          }
        } else {
          throw error; // Re-throw original error
        }
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
    
  logout: async (silent = false) => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ authUser: null });
      if (!silent) {
        toast.success("Logged out successfully");
      }
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      set({ authUser: null });
      if (!silent) {
        toast.error(error.response?.data?.message || "Error during logout");
      }
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
      if (!token) {
        console.warn("Cannot connect socket: No token found");
        return;
      }
      
      const socketOptions = {
        query: {
          userId: authUser._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"],
      };
      
      // Add token to query if it's not a temp token
      if (!token.startsWith('temp_')) {
        socketOptions.query.token = token;
      }
      
      const socket = io(SOCKET_URL, socketOptions);
    
      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });
  
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        // If connection fails due to authentication, clear token
        if (error.message?.includes("authentication")) {
          console.warn("Socket authentication error. Checking token validity...");
          get().checkTokenExpiration()
            .then(isValid => {
              if (!isValid) {
                localStorage.removeItem("token");
                set({ authUser: null });
              }
            });
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

  checkTokenExpiration: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    try {
      // Try the standard token check endpoint
      await axiosInstance.get("/auth/check-token");
      return true;
    } catch (error) {
      // If standard check fails and we have a temp token, try that approach
      if (token.startsWith('temp_')) {
        const userId = token.split('_')[1];
        
        try {
          // Check if we can still access user data
          const res = await axiosInstance.get(`/users/${userId}`);
          return !!(res.data && res.data._id);
        } catch (tempError) {
          console.error("Temp token validation failed:", tempError);
          localStorage.removeItem("token");
          set({ authUser: null });
          return false;
        }
      } else {
        // Standard token is invalid
        localStorage.removeItem("token");
        set({ authUser: null });
        return false;
      }
    }
  }  
  
}));