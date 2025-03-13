import { Box, Avatar, Typography, IconButton, Badge } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <Box
      sx={{
        p: 1.5,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* AVATAR */}
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: isOnline ? "success.main" : "text.disabled",
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        >
          <Avatar
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            sx={{ width: 40, height: 40 }}
          />
        </Badge>

        {/* User info */}
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {selectedUser.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isOnline ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>

      {/* Close button */}
      <IconButton size="small" onClick={() => setSelectedUser(null)}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
export default ChatHeader;