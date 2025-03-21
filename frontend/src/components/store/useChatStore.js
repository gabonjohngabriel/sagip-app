import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  sendingMessage: false,

  getUsers: async () => {
    const token = localStorage.getItem("token");
    const authUser = useAuthStore.getState().authUser;

    if (!token || !authUser) {
      console.warn("⚠ No token or user found! Redirecting to login...");
      return;
    }

    set({ isUsersLoading: true });

    try {
      // If using temporary token, append user ID to URL
      const url = token.startsWith("temp_")
        ? `/messages/users?userId=${authUser._id}`
        : "/messages/users";

      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ users: res.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to load users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    set({ sendingMessage: true });

    try {
      // Create optimistic message
      const optimisticMessage = {
        _id: `temp-${Date.now()}`,
        text: messageData.text,
        senderId: useAuthStore.getState().authUser._id,
        receiverId: selectedUser._id,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      // Add optimistic message to UI
      set({ messages: [...messages, optimisticMessage] });

      // SEND TO SERVER
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Replace optimistic message with real one
      set({
        messages: messages
          .filter((msg) => msg._id !== optimisticMessage._id)
          .concat(res.data),
      });

      // Refresh user list to update last message for all tabs/windows
      get().refreshUsersList();

      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      // Remove failed optimistic message
      set({
        messages: messages.filter((msg) => !msg.isOptimistic),
      });
    } finally {
      set({ sendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Listen for any new message regardless of selected user
    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, users } = get();
      const authUser = useAuthStore.getState().authUser;

      // If message is from or to the current user, update the messages list
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.receiverId === selectedUser._id)
      ) {
        // Only add if not already in the messages list (avoid duplicates)
        const messageExists = messages.some(
          (msg) => msg._id === newMessage._id
        );
        if (!messageExists) {
          set({
            messages: [...messages, newMessage],
          });
        }
      }

      // ALWAYS UPDATE
      get().refreshUsersList();

      // If the message is intended for the current user but they're viewing a different conversation
      if (
        newMessage.receiverId === authUser._id &&
        (!selectedUser || selectedUser._id !== newMessage.senderId)
      ) {
        // Increment unread count for the sender
        const updatedUsers = users.map((user) => {
          if (user._id === newMessage.senderId) {
            return {
              ...user,
              unreadCount: (user.unreadCount || 0) + 1,
              lastMessage: newMessage,
            };
          }
          return user;
        });

        set({ users: updatedUsers });
      }
    });

    // LISTENER FOR STATUS
    socket.on("userStatusChanged", ({ userId, status }) => {
      const { users } = get();
      // UPDATE
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isOnline: status === "online" };
        }
        return user;
      });

      set({ users: updatedUsers });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("userStatusChanged");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });

    // FETCH
    if (selectedUser) {
      get().getMessages(selectedUser._id);
      // CLEAR UNREAD
      get().clearUnreadCount(selectedUser._id);
    }
  },

  clearUnreadCount: async (userId) => {
    try {
      // READ MESSAGES
      await axiosInstance.post(`/messages/read/${userId}`);

      // UPDATE
      const updatedUsers = get().users.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            unreadCount: 0,
          };
        }
        return user;
      });

      set({ users: updatedUsers });
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  },

  // REFRESH
  refreshUsersList: async () => {
    const token = localStorage.getItem("token");

    // Don't rely on authUser from store initially to avoid circular reference
    let userId = null;

    if (token && token.startsWith("temp_")) {
      userId = token.split("_")[1];
    } else if (useAuthStore.getState().authUser) {
      userId = useAuthStore.getState().authUser._id;
    }

    if (!token) {
      console.warn("⚠ Cannot refresh users: No token found");
      return { success: false };
    }

    try {
      let url = "/messages/users";
      // If using temp token, always include userId in query
      if (userId && token.startsWith("temp_")) {
        url = `/messages/users?userId=${userId}`;
      }

      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ users: res.data });
      return { success: true };
    } catch (error) {
      console.error("Failed to refresh users list:", error);
      return { success: false, error: error.message };
    }
  },
}));
