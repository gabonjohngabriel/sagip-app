import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: localStorage.getItem("chat-theme") || "coffee", 
      fontSize: "medium",
      notificationSound: true,
      
      setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
      },
      
      setFontSize: (fontSize) => {
        set({ fontSize });
      },
      
      toggleNotificationSound: () => {
        set((state) => ({ notificationSound: !state.notificationSound }));
      }
    }),
    {
      name: "chat-preferences",
      getStorage: () => localStorage,
    }
  )
);