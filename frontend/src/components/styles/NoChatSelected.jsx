import { Box, Typography } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

const NoChatSelected = () => {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        p: 6,
        bgcolor: "background.paper",
        opacity: 0.8
      }}
    >
      <Box sx={{ maxWidth: "md", textAlign: "center" }}>
        {/* Icon Display */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 4,
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(-10px)",
                },
              },
            }}
          >
            <MessageIcon sx={{ fontSize: 32, color: "primary.main" }} />
          </Box>
        </Box>

        {/* Welcome Text */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Welcome to Chatty!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a conversation from the sidebar to start chatting
        </Typography>
      </Box>
    </Box>
  );
};

export default NoChatSelected;