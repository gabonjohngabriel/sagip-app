/**
 * ChatLocalStorage.js
 * Utility functions to handle local storage operations for doctor chat messages
 */

/**
 * Load chat messages for a specific doctor from local storage
 * 
 * @param {number} doctorId - The unique ID of the doctor
 * @param {string} doctorName - The name of the doctor (used as fallback if no messages exist)
 * @returns {Array} - Array of message objects
 */
export const loadChatMessages = (doctorId, doctorName) => {
    try {
      const savedMessages = localStorage.getItem(`chat_${doctorId}`);
      
      if (savedMessages) {
        return JSON.parse(savedMessages);
      } else {
        // Create initial welcome message if no messages exist
        const initialMessage = {
          text: `SAGIP MEDICAL BOT \n\n I'm ${doctorName}. How can I help you today?`,
          sender: "doctor",
          timestamp: new Date().toISOString(),
        };
        
        // Save and return the initial message
        saveChatMessages(doctorId, [initialMessage]);
        return [initialMessage];
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
      return [];
    }
  };
  
  /**
   * Save chat messages for a specific doctor to local storage
   * 
   * @param {number} doctorId - The unique ID of the doctor
   * @param {Array} messages - Array of message objects to save
   * @returns {boolean} - Success status
   */
  export const saveChatMessages = (doctorId, messages) => {
    try {
      localStorage.setItem(`chat_${doctorId}`, JSON.stringify(messages));
      return true;
    } catch (error) {
      console.error("Error saving chat messages:", error);
      return false;
    }
  };
  
  /**
   * Clear chat messages for a specific doctor from local storage
   * 
   * @param {number} doctorId - The unique ID of the doctor
   * @returns {boolean} - Success status
   */
  export const clearChatMessages = (doctorId) => {
    try {
      localStorage.removeItem(`chat_${doctorId}`);
      return true;
    } catch (error) {
      console.error("Error clearing chat messages:", error);
      return false;
    }
  };
  
  /**
   * Check if chat history exists for a specific doctor
   * 
   * @param {number} doctorId - The unique ID of the doctor
   * @returns {boolean} - Whether chat history exists
   */
  export const hasChatHistory = (doctorId) => {
    return localStorage.getItem(`chat_${doctorId}`) !== null;
  };
  
  /**
   * Get the number of unread messages for a doctor
   * This is a placeholder function - you would need to implement
   * logic to track which messages have been read
   * 
   * @param {number} doctorId - The unique ID of the doctor
   * @returns {number} - Number of unread messages
   */
  export const getUnreadCount = (doctorId) => {
    // This would need implementation based on how you track read/unread status
    // For now returning 0
    return 0;
  };