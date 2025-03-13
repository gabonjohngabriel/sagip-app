import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Checkbox,
  FormControlLabel,
  Divider,
  Badge,
  ButtonBase,
} from "@mui/material";
import { People as UsersIcon } from "@mui/icons-material";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();

    // UPDATE
    const interval = setInterval(() => {
      getUsers();
    }, 10000); // 

    return () => clearInterval(interval);
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: 80, lg: 288 },
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <UsersIcon sx={{ fontSize: 24 }} />
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            Contacts
          </Typography>
        </Box>

        {/* ONLINE */}
        <Box
          sx={{
            mt: 1.5,
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
            }
            label={<Typography variant="body2">Show online only</Typography>}
          />
          <Typography variant="caption" color="text.secondary">
            ({onlineUsers.length - 1} online)
          </Typography>
        </Box>
      </Box>

      <Box sx={{ overflowY: "auto", width: "100%", py: 1.5 }}>
        {filteredUsers.map((user) => (
          <ButtonBase
            key={user._id}
            onClick={() => setSelectedUser(user)}
            sx={{
              width: "100%",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              justifyContent: { xs: "center", lg: "flex-start" },
              textAlign: "left",
              transition: "background-color 0.2s",
              bgcolor:
                selectedUser?._id === user._id
                  ? "action.selected"
                  : "transparent",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: onlineUsers.includes(user._id)
                      ? "success.main"
                      : "transparent",
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              >
                <Avatar
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  sx={{ width: 48, height: 48 }}
                />
              </Badge>
            </Box>

            {/* User info - only visible on larger screens */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography variant="body1" fontWeight="medium" noWrap>
                {user.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </Typography>
            </Box>
          </ButtonBase>
        ))}

        {filteredUsers.length === 0 && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography color="text.secondary">No online users</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
