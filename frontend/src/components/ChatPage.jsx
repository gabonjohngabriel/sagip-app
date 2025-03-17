import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Phone, MoreVertical, Send, Mic, Image } from "lucide-react";
import useStyles from "./Styles";
import Logo from "./Logo";
import { useChatStore } from "./store/useChatStore";
import { useAuthStore } from "./store/useAuthStore";

const ChatPage = () => {
  const styles = useStyles();
  const messageInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);
  const [isDebug, setIsDebug] = useState(true);


  // STORE
  const {
    users,
    selectedUser,
    messages,
    isUsersLoading,
    isMessagesLoading,
    sendingMessage,
    getUsers,
    setSelectedUser,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    clearUnreadCount,
    refreshUsersList
  } = useChatStore();
  
  const { socket, onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    // Debug logging
    console.log("ChatPage mounted");
    console.log("authUser:", authUser);
    console.log("socket:", socket);
    console.log("users:", users);
    
    // Check if the token exists
    const token = localStorage.getItem("token");
    console.log("Token exists:", !!token);
    
    if (!authUser) {
      console.warn("No authenticated user found");
      setError("Please log in to access the chat");
    }
    
    if (!socket && authUser) {
      console.warn("Socket not initialized but user is authenticated");
      // Try to connect the socket manually
      useAuthStore.getState().connectSocket();
    }
  }, [authUser, socket, users]);
  
  useEffect(() => {
    if (!authUser && !useAuthStore.getState().isCheckingAuth) {
      // Only show error if we're not currently checking auth
      setError("Please log in to access the chat");
      // Optionally redirect to login page
      // window.location.href = "/login";
    } else if (authUser && !socket) {
      // If we have a user but no socket, try to connect
      useAuthStore.getState().connectSocket();
    }
  }, [authUser, socket]);
  
  // FETCH USERS AND SET UP SOCKETS
  useEffect(() => {
    let intervalId;
  
    const fetchData = async () => {
      try {
        await getUsers();
        if (socket) {
          subscribeToMessages();
  
          // Set up a periodic refresh of the users list
          intervalId = setInterval(() => {
            refreshUsersList();
          }, 1000); // Refresh every 30 seconds
        }
      } catch (err) {
        setError("Failed to connect. Please refresh the page.");
      }
    };
  
    fetchData();
  
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (socket) unsubscribeFromMessages();
    };
  }, [socket]);
    
  // When user is selected, clear unread count
  useEffect(() => {
    if (selectedUser) {
      clearUnreadCount(selectedUser._id);
    }
  }, [selectedUser]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    if (!selectedUser) {
      setError("Please select a user to send a message");
      return;
    }

    try {
      await sendMessage({
        text: messageText,
        receiverId: selectedUser._id,
      });
      setMessageText("");

      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
      scrollToBottom();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, [setSelectedUser]);

  const isUserOnline = useCallback((userId) => {
    return onlineUsers.includes(userId);
  }, [onlineUsers]);

  const handleCloseError = () => {
    setError(null);
  };

  const sidebarItems = [
    { icon: "📊", label: "Profile"},
    { icon: "📅", label: "Appointment" },
    { icon: "💬", label: "Messages", badge: users.length },
    { icon: "🔔", label: "Notifications"},
    { icon: "📈", label: "E-Pharmacy" },
    { icon: "💳", label: "E-Payment" },
    { icon: "⭐", label: "Reviews" },
    { icon: "❓", label: "Help" },
  ];

  return (
    <Box
      className={`${styles.root} ${styles.center2}`}
      sx={{ display: "flex", height: "100%", bgcolor: "#f7f7f7"}}
    >
      {/* ERROR */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
      
      {/* MAIN */}
      <Box
        sx={{
          height: "75vh",
          display: "flex",
          bgcolor: "#fff",
          borderRadius: 6,
          width: "100%",
          overflow: "hidden",
          boxShadow: "1px 4px 10px rgba(0, 255, 21, 0.1)",
        }}
      >
        {/* SIDEBAR */}
        <Box
          className={`${styles.poppins}`}
          sx={{
            width: 250,
            bgcolor: "#208a3c",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box 
          className={`${styles.cardsContainer}`}
          sx={{ 
            mb: 4, 
            lineHeight: "15px",
          }}>
            <Typography
              className={`${styles.poppins} ${styles.bold}`}
              variant="h6"
              sx={{
                display: "flex",
                letterSpacing: -1,
                alignItems: "center",
                mb: 4,
              }}
            >
              <Box sx={{ borderRadius: 1, p: 0.5, mr: 1 }}>
                <Logo />
              </Box>
              SAGIP
            </Typography>

            {sidebarItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  mr: 1,
                  py: 1,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <Box 
                sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon} {item.label}
                </Box>
                {item.badge && (
                  <Badge badgeContent={item.badge} color="error" />
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: "auto", display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {authUser?.fullName?.[0] || "U"}
            </Avatar>
            <Box>
              <Typography 
              className={`${styles.poppins} ${styles.bold}`}
              sx={{ml: 0.25, mb: 0.25}}
              variant="body2">{authUser?.fullName || "User"}</Typography>
              <Typography
                className={`${styles.poppins}`}
                variant="caption"
                sx={{ ml: 0.25, mb: 0.25, bgcolor: "#ffffff75", px: 1, borderRadius: 1 }}
              >
                {authUser?.role || "User"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* MESSAGE LIST */}
        <Box
          sx={{
            width: 280,
            borderRight: "1px solid #eee",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
className={`${styles.poppins} ${styles.bold}`}
variant="h6"
sx={{ p: 2, borderBottom: "1px solid #eee" }}
>
Messages
</Typography>

{/* TABS */}
<Box sx={{ display: "flex", px: 1, pt: 1 }}>
<Box
  className={`${styles.poppins} ${styles.bold}`}
  sx={{
    bgcolor: "#208a3c",
    color: "white",
    px: 2,
    py: 0.5,
    borderRadius: 4,
    mr: 1,
  }}
>
  General
  <Typography
    className={`${styles.poppins}`}
    component="span"
    sx={{
      bgcolor: "#fff",
      color: "#208a3c",
      px: 1,
      borderRadius: 4,
      ml: 1,
    }}
  >
    {users.length}
  </Typography>
</Box>
<Box
  className={`${styles.poppins} ${styles.bold}`}
  sx={{ color: "#777", px: 2, py: 0.5 }}
>
  Archive{" "}
  <Typography component="span" sx={{ color: "#777", ml: 1 }}>
    0
  </Typography>
</Box>
</Box>

{/* SEARCH */}
<Box sx={{ p: 2 }}>
<TextField
  size="small"
  placeholder="Search..."
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Search size={20} />
      </InputAdornment>
    ),
  }}
  sx={{
    bgcolor: "#f5f5f5",
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      fontFamily: "Poppins, sans-serif",
    },
  }}
/>
</Box>

{/* LIST */}
<Box sx={{ overflow: "auto", flex: 1 }}>
{isUsersLoading ? (
  <Box sx={{ p: 2, textAlign: "center" }}>
    <CircularProgress size={24} color="primary" />
    <Typography color="text.secondary" sx={{ mt: 1 }}>Loading users...</Typography>
  </Box>
) : users.length === 0 ? (
  <Box sx={{ p: 2, textAlign: "center" }}>
    <Typography color="text.secondary">No users found</Typography>
  </Box>
) : (
  users.map((user) => {
    const isOnline = isUserOnline(user._id);
    const isSelected = selectedUser && selectedUser._id === user._id;
    
    return (
      <Box
        key={user._id}
        sx={{
          display: "flex",
          p: 1.5,
          borderBottom: "1px solid #f5f5f5",
          bgcolor: isSelected ? "#f5f5f5" : "transparent",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#f9f9f9"
          }
        }}
        onClick={() => handleUserSelect(user)}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: isOnline ? "#208a3c" : "#bdbdbd",
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        >
          <Avatar className={`${styles.poppins}`} sx={{ mr: 1.5 }}>
            {user.fullName ? user.fullName[0] : "U"}
          </Avatar>
        </Badge>
        <Box sx={{ flex: 1, overflow: "hidden", ml: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={`${styles.poppins}`}
              variant="body2"
              sx={{ fontWeight: user.unreadCount > 0 ? "bold" : "normal" }}
            >
              {user.fullName}
            </Typography>
            <Typography
              className={`${styles.poppins}`}
              variant="caption"
              color="text.secondary"
            >
              {user.lastMessage?.createdAt
                ? new Date(
                    user.lastMessage.createdAt
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={`${styles.poppins}`}
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ maxWidth: "70%" }}
            >
              {user.lastMessage?.text || "No messages yet"}
            </Typography>
            {user.unreadCount > 0 ? (
              <Badge
                badgeContent={user.unreadCount}
                color="error"
                sx={{ ml: 1 }}
              />
            ) : (
              user.lastMessage && <Box sx={{ color: "#0f0", fontSize: 16 }}>✓</Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  })
)}
</Box>
</Box>

{/* CHAT AREA */}
{!selectedUser ? (
<Box
sx={{
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: 4,
}}
>
<Typography
  variant="h5"
  className={`${styles.poppins} ${styles.bold}`}
  sx={{ mb: 2 }}
>
  Select a conversation
</Typography>
<Typography
  variant="body1"
  color="text.secondary"
  className={`${styles.poppins}`}
  sx={{ textAlign: "center" }}
>
  Choose a user from the list to start messaging
</Typography>
</Box>
) : (
<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
{/* CHAT HEADER */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    borderBottom: "1px solid #eee",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: isUserOnline(selectedUser._id)
            ? "#208a3c"
            : "#bdbdbd",
          boxShadow: (theme) =>
            `0 0 0 2px ${theme.palette.background.paper}`,
        },
      }}
    >
      <Avatar className={`${styles.poppins}`} sx={{ mr: 1.5 }}>
        {selectedUser.fullName ? selectedUser.fullName[0] : "U"}
      </Avatar>
    </Badge>
    <Box>
      <Typography
        className={`${styles.poppins}`}
        variant="body1"
        mb={-1}
        sx={{ fontWeight: "bold" }}
      >
        {selectedUser.fullName}
      </Typography>
      <Typography
        className={`${styles.poppins}`}
        variant="caption"
        color="text.secondary"
      >
        {isUserOnline(selectedUser._id) ? "Online" : "Offline"}
      </Typography>
    </Box>
  </Box>
  <Box>
    <IconButton>
      <Phone size={20} />
    </IconButton>
    <IconButton>
      <MoreVertical size={20} />
    </IconButton>
  </Box>
</Box>

{/* MESSAGES */}
<Box
  ref={messagesContainerRef}
  sx={{
    flex: 1,
    p: 2,
    overflow: "auto",
    bgcolor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
  }}
>
  {isMessagesLoading ? (
    <Box sx={{ p: 2, textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress size={30} color="primary" />
    </Box>
  ) : messages.length === 0 ? (
    <Box sx={{ p: 2, textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography color="text.secondary">
        No messages yet. Start the conversation!
      </Typography>
    </Box>
  ) : (
    messages.map((message, index) => {
      const isOwnMessage = message.senderId !== selectedUser._id;
      const messageRef = index === messages.length - 1 ? messageEndRef : null;
      
      return (
        <Box
          key={message._id || `temp-${index}`}
          ref={messageRef}
          sx={{
            display: "flex",
            flexDirection: isOwnMessage ? "row-reverse" : "row",
            mb: 1.5,
            maxWidth: "80%",
            alignSelf: isOwnMessage ? "flex-end" : "flex-start",
            opacity: message.isOptimistic ? 0.7 : 1,
          }}
        >
          <Avatar
            className={`${styles.poppins}`}
            sx={{
              width: 32,
              height: 32,
              mr: isOwnMessage ? 0 : 1,
              ml: isOwnMessage ? 1 : 0,
              bgcolor: isOwnMessage ? "#208a3c" : "#6c757d",
            }}
          >
            {isOwnMessage ? authUser?.fullName?.[0] || "U" : selectedUser.fullName?.[0] || "U"}
          </Avatar>
          <Box
            sx={{
              bgcolor: isOwnMessage ? "#dcf8c6" : "#fff",
              p: 1.5,
              borderRadius: 2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              maxWidth: "70%",
              position: "relative",
            }}
          >
            <Typography
              className={`${styles.poppins}`}
              variant="body2"
              sx={{ wordBreak: "break-word" }}
            >
              {message.text}
            </Typography>
            {message.image && (
              <Box component="img" src={message.image} alt="Shared image" 
                   sx={{ maxWidth: "100%", borderRadius: 1, mt: 1 }} />
            )}
            <Typography
              className={`${styles.poppins}`}
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
                textAlign: "right",
                mt: 0.5,
              }}
            >
              {message.isOptimistic ? "Sending..." : new Date(message.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </Typography>
          </Box>
        </Box>
      );
    })
  )}
</Box>

{/* MESSAGE INPUT */}
<Box
  component="form"
  onSubmit={handleSendMessage}
  sx={{
    p: 2,
    borderTop: "1px solid #eee",
    display: "flex",
    alignItems: "center",
  }}
>
  <TextField
    inputRef={messageInputRef}
    fullWidth
    placeholder="Type a message..."
    value={messageText}
    onChange={(e) => setMessageText(e.target.value)}
    variant="outlined"
    size="small"
    disabled={sendingMessage}
    sx={{
      mr: 1,
      "& .MuiOutlinedInput-root": {
        borderRadius: 4,
        bgcolor: "#f5f5f5",
        fontFamily: "Poppins, sans-serif",
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <Image size={20} />
          </IconButton>
          <IconButton>
            <Mic size={20} />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
  <IconButton
    type="submit"
    disabled={sendingMessage || !messageText.trim()}
    sx={{
      bgcolor: "#208a3c",
      color: "#fff",
      "&:hover": { bgcolor: "#1a7032" },
      "&.Mui-disabled": {
        bgcolor: "#9ac7a7",
        color: "#fff",
      },
    }}
  >
    {sendingMessage ? (
      <CircularProgress size={20} color="inherit" />
    ) : (
      <Send size={20} />
    )}
  </IconButton>
</Box>
</Box>
)}
</Box>
</Box>
);
};

export default ChatPage;