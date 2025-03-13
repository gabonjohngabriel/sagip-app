import { useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "./Logo";
import useStyles from "./Styles";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUpPage = () => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <Box
      className={`${styles.root}`}
      sx={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}
    >
      <Box 
        sx={{ 
          height: "100vh", 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          bgcolor: "white"
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ 
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          {/* LOGO */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1
            }}>
              <Logo/>
              <Typography variant="h6" fontWeight="bold">
                SAGIP
              </Typography>
            </Box>
          </Box>

          {/* HEADLINE */}
          <Typography 
            className={`${styles.poppins} ${styles.bold}`}
            variant="h2" 
            letterSpacing={-1} 
            sx={{ mb: 1 }}
          >
            SAGIP APP<br/>Create Your Account.
          </Typography>
          
          <Typography 
            className={`${styles.poppins}`}
            variant="body1" 
            sx={{ mb: 4, color: "#7f7f7f" }}
          >
            Get started with your free account
          </Typography>
          
          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                className={`${styles.poppins}`}
                variant="caption" 
                sx={{ mb: 0.5, display: "block", color: "text.secondary" }}
              >
                FULL NAME
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: '#f9f9f9',
                    fontFamily: 'Poppins, sans-serif'
                  }
                }}
                InputProps={{
                  endAdornment: formData.fullName ? (
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      bgcolor: "#e6f7f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#43c492",
                    }}>
                      ✓
                    </Box>
                  ) : null
                }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                className={`${styles.poppins}`}
                variant="caption" 
                sx={{ mb: 0.5, display: "block", color: "text.secondary" }}
              >
                EMAIL
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="example@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: '#f9f9f9',
                    fontFamily: 'Poppins, sans-serif'
                  }
                }}
                InputProps={{
                  endAdornment: formData.email && /\S+@\S+\.\S+/.test(formData.email) ? (
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      bgcolor: "#e6f7f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#43c492",
                    }}>
                      ✓
                    </Box>
                  ) : null
                }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography 
                className={`${styles.poppins}`}
                variant="caption" 
                sx={{ mb: 0.5, display: "block", color: "text.secondary" }}
              >
                PASSWORD
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: '#f9f9f9',
                    fontFamily: 'Poppins, sans-serif'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Box 
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'action.active'
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </Box>
                  )
                }}
              />
            </Box>
            
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={`${styles.poppins} ${styles.cardhover} ${styles.green}`}
                disabled={isSigningUp}
                sx={{ 
                  py: 1.5,
                  bgcolor: "#67b7fb",
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: "normal",
                  '&:hover': {
                    bgcolor: "#5aa8eb"
                  }
                }}
              >
                {isSigningUp ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                    Loading...
                  </>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </Button>
              
              <Button
                component={Link}
                className={`${styles.poppins} ${styles.greenText} ${styles.greenBorder} ${styles.cardhover}`}
                to="/choose/login"
                variant="outlined"
                fullWidth
                sx={{ 
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: "none",
                  borderColor: "#67b7fb",
                  color: "#67b7fb",
                  fontWeight: "normal",
                  '&:hover': {
                    borderColor: "#5aa8eb",
                    bgcolor: "transparent !important"
                  }
                }}
              >
                LOGIN
              </Button>
            </Box>
            
            <Typography 
              className={`${styles.poppins}`}
              variant="body2" 
              color="text.secondary" 
              align="center"
            >
              By signing up, you agree to our company's{" "}
              <Link to="/terms" style={{ textDecoration: "none", color: "#000" }}>
                Terms and Conditions
              </Link>
              {" "}and{" "}
              <Link to="/privacy" style={{ textDecoration: "none", color: "#000" }}>
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Decorative Background */}
        <Box 
          sx={{ 
            display: { xs: "none", md: "block" },
            position: "relative",
            background: "linear-gradient(45deg,rgb(201, 255, 210),rgb(208, 255, 216),rgb(214, 255, 219))",
            overflow: "hidden"
          }}
        >
          {/* This would typically be an image with the bubbles, but for this implementation
              we're keeping it as a simple gradient background */}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;