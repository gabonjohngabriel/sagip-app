import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Fade,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useStyles from "../Styles";
import axios from "axios";
import Logo from "../Logo";
import SagipLogoAnimation from "../SagipLogoAnimation";

const LoginPage = ({ onLogin }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPage, setShowPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // CALL
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        onLogin(response.data.token);
        navigate("/dashboard");
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={`${styles.root}`}
      sx={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}
    >
      <Fade in={true} timeout={1000}>
        <Container className={`${styles.main}`} component="main" maxWidth="sm">
          <Paper
            className={`${styles.green}`}
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              position: "relative",
              zIndex: 1,
              backdropFilter: "blur(5px)",
              background: "rgba(67, 160, 71, 0.85)",
            }}
          >
            <Box className={` ${styles.center}`} sx={{ mb: 4 }}>
              <Logo />
              <Typography
                sx={{ letterSpacing: -1 }}
                variant="h4"
                component="h1"
                className={`${styles.bold} ${styles.poppins}`}
              >
                WELCOME BACK
              </Typography>
              <Typography
                variant="body2"
                className={`${styles.poppins}`}
                color="rgb(255, 255, 255)"
              >
                Login to your account to continue.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  className: `${styles.poppins} ${styles.white}`,
                }}
                InputLabelProps={{
                  className: `${styles.poppins} ${styles.white}`,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  className: `${styles.poppins} ${styles.white}`,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#ffffff95" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  className: `${styles.poppins} ${styles.white}`,
                }}
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography className={`${styles.poppins}`} variant="body2">
                    Unavailable to login?
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={`${styles.whitebg} ${styles.poppins}`}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
              <Divider sx={{ my: 2 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={styles.poppins}
                >
                  OR
                </Typography>
              </Divider>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2" className={styles.poppins}>
                    Don't have an account?{" "}
                    <Link
                      to="/choose/signup"
                      className={`${styles.poppins} ${styles.noUnderline}`}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                        className={`${styles.poppins} ${styles.white} ${styles.bold}`}
                      >
                        Sign Up
                      </Typography>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
};

export default LoginPage;
