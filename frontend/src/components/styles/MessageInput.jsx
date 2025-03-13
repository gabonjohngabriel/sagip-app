import React, { useState } from "react";
import { Send, Paperclip, Mic, X } from "lucide-react";
import { useRealTimeChat } from "../hooks/useRealTimeChat";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState("");
  const { isMessageSending } = useChatStore();
  
  const {
    message,
    setMessage,
    handleMessageChange,
    handleSendMessage,
    isOtherUserTyping,
    messageInputRef
  } = useRealTimeChat();

  // Handle file attachment
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAttachment(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setAttachmentPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove attachment
  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentPreview("");
  };

  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Add emoji to message
  const onEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    messageInputRef.current?.focus();
  };

  // Toggle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };
  
  // Enhanced send message handler to include attachment
  const onSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim() && !attachment) return;
    
    // Create message data object with text and/or attachment
    const messageData = {};
    
    if (message.trim()) {
      messageData.text = message;
    }
    
    if (attachment) {
      messageData.image = attachment;
    }
    
    // Use the hook's handler but pass our data
    handleSendMessage(e, messageData);
    
    // Reset attachment state
    setAttachment(null);
    setAttachmentPreview("");
  };

  return (
    <div className="border-t p-3">
      {/* Typing indicator */}
      {isOtherUserTyping && (
        <div className="text-sm text-base-content/70 mb-1 animate-pulse">
          User is typing...
        </div>
      )}

      {/* Attachment preview */}
      {attachmentPreview && (
        <div className="relative inline-block mb-2">
          <img
            src={attachmentPreview}
            alt="Attachment preview"
            className="h-24 rounded-md object-cover"
          />
          <button
            onClick={removeAttachment}
            className="absolute -top-2 -right-2 bg-base-300 rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="p-2 bg-base-200 rounded-md mb-2">
          {/* Emoji picker component would go here */}
          <div className="flex flex-wrap gap-1">
            {["😊", "👍", "❤️", "😂", "😍", "🎉", "🔥", "👏"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => onEmojiClick(emoji)}
                className="text-xl hover:bg-base-300 p-1 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={onSendMessage} className="flex items-center gap-2">
        {/* Attachment button */}
        <label className="btn btn-circle btn-sm btn-ghost">
          <Paperclip size={20} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAttachment}
          />
        </label>

        {/* Emoji button */}
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="btn btn-circle btn-sm btn-ghost"
        >
          😊
        </button>

        {/* Text input */}
        <input
          ref={messageInputRef}
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          disabled={isMessageSending}
        />

        {/* Voice message button */}
        <button
          type="button"
          onClick={toggleRecording}
          className={`btn btn-circle btn-sm ${
            isRecording ? "btn-error" : "btn-ghost"
          }`}
        >
          <Mic size={20} />
        </button>

        {/* Send button */}
        <button
          type="submit"
          className="btn btn-circle btn-primary"
          disabled={(!message.trim() && !attachment) || isMessageSending}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;