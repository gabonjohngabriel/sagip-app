import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Button, IconButton } from "@mui/material";
import { 
  Logout as LogoutIcon, 
  ChatBubble as MessageIcon, 
  Settings as SettingsIcon, 
  Person as UserIcon 
} from "@mui/icons-material";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <AppBar 
      position="fixed" 
      color="default"
      elevation={0}
      sx={{ 
        borderBottom: 1, 
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        bgcolor: "background.default",
      }}
    >
      <Toolbar sx={{ height: 64, maxWidth: "lg", width: "100%", mx: "auto", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 1 }}>
            <Box 
              sx={{ 
                width: 36, 
                height: 36, 
                borderRadius: 2, 
                bgcolor: "primary.light", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              <MessageIcon sx={{ fontSize: 20, color: "primary.main" }} />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Chatty
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button 
            component={Link} 
            to="/settings" 
            size="small" 
            startIcon={<SettingsIcon fontSize="small" />}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            Settings
          </Button>
          <IconButton 
            component={Link} 
            to="/settings" 
            sx={{ display: { xs: "flex", sm: "none" } }}
            size="small"
          >
            <SettingsIcon fontSize="small" />
          </IconButton>

          {authUser && (
            <>
              <Button 
                component={Link} 
                to="/profile" 
                size="small" 
                startIcon={<UserIcon fontSize="small" />}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Profile
              </Button>
              <IconButton 
                component={Link} 
                to="/profile" 
                sx={{ display: { xs: "flex", sm: "none" } }}
                size="small"
              >
                <UserIcon fontSize="small" />
              </IconButton>

              <Button 
                onClick={logout} 
                size="small" 
                startIcon={<LogoutIcon fontSize="small" />}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Logout
              </Button>
              <IconButton 
                onClick={logout}
                sx={{ display: { xs: "flex", sm: "none" } }}
                size="small"
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;