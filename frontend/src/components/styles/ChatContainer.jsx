import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
    
  if (isMessagesLoading) {
    return (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
      <ChatHeader />

      <Box 
      
      sx={{ flex: 1, overflowY: "auto", p: 2, "& > *": { mb: 2 } }}>
  {messages.map((message, index) => (
    <Box
      key={message._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.senderId === authUser._id ? "flex-end" : "flex-start",
      }}
      ref={index === messages.length - 1 ? messageEndRef : null}
    >
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1 }}>
              <Avatar
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
                sx={{ width: 32, height: 32, border: "1px solid #ddd" }}
              />
              <Typography variant="caption" color="text.secondary">
                {formatMessageTime(message.createdAt)}
              </Typography>
            </Box>
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: "80%",
                borderRadius: 2,
                bgcolor: message.senderId === authUser._id ? "primary.light" : "background.paper",
                color: message.senderId === authUser._id ? "primary.contrastText" : "text.primary",
              }}
            >
              {message.image && (
                <Box
                  component="img"
                  src={message.image}
                  alt="Attachment"
                  sx={{
                    maxWidth: { sm: 200 },
                    width: "100%",
                    borderRadius: 1,
                    mb: message.text ? 1 : 0,
                  }}
                />
              )}
              {message.text && <Typography variant="body2">{message.text}</Typography>}
            </Paper>
          </Box>
        ))}
      </Box>

      <MessageInput />
    </Box>
  );
};
export default ChatContainer;