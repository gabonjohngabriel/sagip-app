import { useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";

const LoginPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        throw new Error("Please enter both email and password");
      }
      
      console.log("Attempting login with:", formData.email);
      const response = await login(formData);

      if (response.success) {
        console.log("Login successful, navigating to chat");
        navigate("/choose/chat");
      } else {
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Error handling is done in the useAuthStore login function
    }
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
          bgcolor: "white",
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* LOGO */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Logo />
              <Typography
                className={`${styles.poppins}`}
                variant="h6"
                fontWeight="bold"
              >
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
            SAGIP APP
            <br />
            An App for Patients and Doctors.
          </Typography>

          <Typography
            className={`${styles.poppins}`}
            variant="body1"
            sx={{ mb: 4, color: "#7f7f7f" }}
          >
            Welcome back! Please login to your account to continue.
          </Typography>

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit}>
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    bgcolor: "#f9f9f9",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputProps={{
                  endAdornment: formData.email ? (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        bgcolor: "#e6f7f1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#43c492",
                      }}
                    >
                      ✓
                    </Box>
                  ) : null,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                className={`${styles.poppins}`}
                variant="caption"
                sx={{ mb: 0.5, display: "block", color: "text.secondary" }}
              >
                PASSWORD
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    bgcolor: "#f9f9f9",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography className={`${styles.poppins}`} variant="body2">
                    REMEMBER ME
                  </Typography>
                }
              />
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  className={`${styles.poppins} ${styles.greenText}`}
                  variant="body2"
                  color="primary"
                >
                  FORGOT
                </Typography>
              </Link>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={`${styles.poppins} ${styles.cardhover} ${styles.green}`}
                disabled={isLoggingIn}
                sx={{
                  py: 1.5,
                  bgcolor: "#67b7fb",
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: "normal",
                  "&:hover": {
                    bgcolor: "#5aa8eb",
                  },
                }}
              >
                {isLoggingIn ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1, color: "white" }}
                    />
                    Loading...
                  </>
                ) : (
                  "LOGIN"
                )}
              </Button>

              <Button
                component={Link}
                className={`${styles.poppins} ${styles.greenText} ${styles.greenBorder} ${styles.cardhover}`}
                to="/choose/signup"
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: "none",
                  borderColor: "#67b7fb",
                  color: "#67b7fb",
                  fontWeight: "normal",
                  "&:hover": {
                    borderColor: "#5aa8eb",
                    bgcolor: "transparent !important",
                  },
                }}
              >
                SIGNUP
              </Button>
            </Box>

            <Typography
              className={`${styles.poppins}`}
              variant="body2"
              color="text.secondary"
              align="center"
            >
              By signing up, you agree to our company's{" "}
              <Link
                to="/terms"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                style={{ textDecoration: "none", color: "#000" }}
              >
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
            background:
              "linear-gradient(45deg,rgb(201, 255, 210),rgb(208, 255, 216),rgb(214, 255, 219))",
            overflow: "hidden",
          }}
        >
          {/* This would typically be an image with the bubbles, but for this implementation
            we're keeping it as a simple gradient background */}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
