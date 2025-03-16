import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  Fade,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-providers";
import "leaflet-routing-machine";
import "./Map.css";
import MapComponent from "./MapComponent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SagipLogoAnimation from "./SagipLogoAnimation";

const ChooseMap = () => {
  const styles = useStyles();
  const [showPage, setShowPage] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckout = () => {
    // Implement checkout functionality if needed
  };

  const handleAnimationComplete = () => {
    setShowPage(true);
  };
  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <Box
      className={`${styles.root} ${styles.backgroundGreenTheme}`}
      sx={{ minHeight: "100vh" }}
    >
      {/* HEADER from PharmacyPage.js */}
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          bgcolor: "#fff",
          borderRadius: 5,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              className={`${styles.poppins} ${styles.bold}`}
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#2e7d32",
                mr: 1,
              }}
            >
              <Logo
                component="span"
                sx={{
                  display: "inline-block",
                  mr: 0.5,
                  color: "white",
                  p: 0.5,
                }}
              />
              SAGIP
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 2,
                border: "1px solid #e0e0e0",
                borderRadius: "16px",
                p: "5px 10px",
                fontSize: "0.75rem",
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption">Pampanga</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              placeholder="Search"
              variant="outlined"
              InputProps={{
                className: styles.poppins,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: "50px", bgcolor: "#f5f5f5" },
              }}
              sx={{ width: 280, mr: 2 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/choose/healthprofessionals")}
              className={`${styles.poppins} ${styles.green}`}
              variant="contained"
              color="primary"
              size="small"
              sx={{
                mr: 1,
                borderRadius: "16px",
                display: { xs: "none", sm: "flex" },
                textTransform: "none",
              }}
            >
              Medical Professionals
            </Button>
            <Button
              onClick={() => navigate("/choose/appointment")}
              className={`${styles.poppins} ${styles.green}`}
              variant="contained"
              color="primary"
              size="small"
              sx={{
                mr: 1,
                borderRadius: "16px",
                display: { xs: "none", sm: "flex" },
                textTransform: "none",
              }}
            >
              Appointment
            </Button>
            <Button
              className={`${styles.poppins} ${styles.green}`}
              onClick={() => navigate("/choose/login")}
              variant="contained"
              color="primary"
              size="small"
              sx={{
                mr: 1,
                borderRadius: "16px",
                textTransform: "none",
              }}
            >
              Account
            </Button>
            <IconButton
              onClick={handleCheckout}
              variant="contained"
              sx={{ color: "green", mr: 1 }}
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE SEARCH - same as in PharmacyPage.js */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          p: 2,
          bgcolor: "white",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search locations"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: "50px", bgcolor: "#f5f5f5" },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            p: 2,
            bgcolor: "white",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => navigate("/choose/healthprofessionals")}
            className={`${styles.poppins} ${styles.green}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mr: 1,
              borderRadius: "16px",
              display: { xs: "flex", sm: "none" },
              textTransform: "none",
            }}
          >
            Medical Professionals
          </Button>
          <Button
            onClick={() => navigate("/choose/appointment")}
            className={`${styles.poppins} ${styles.green}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mr: 1,
              borderRadius: "16px",
              display: { xs: "flex", sm: "none" },
              textTransform: "none",
            }}
          >
            Appointment
          </Button>
          <Button
            className={`${styles.poppins} ${styles.green}`}
            onClick={() => navigate("/choose/login")}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mr: 1,
              borderRadius: "16px",
              textTransform: "none",
            }}
          >
            Account
          </Button>
          <IconButton
            onClick={handleCheckout}
            variant="contained"
            sx={{ color: "green", mr: 1 }}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {/* CONTENT */}
      <Fade in={true} timeout={1000}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              className={`${styles.poppins} ${styles.bold}`}
              sx={{
                mt: 2,
                color: "#fff",
                maxWidth: "400px",
              }}
            >
              Locate Your Favorite Healthcare Clinics and Facilities
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.poppins}`}
              sx={{
                mt: 1,
                mb: 4,
                color: "#ffffff",
                maxWidth: "600px",
              }}
            >
              We're here to help you locate the nearest healthcare facilities.
              Use the map below to find hospitals, clinics, pharmacies, and
              other medical services in your area.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 5,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#e8f5e9",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <LocationOnIcon sx={{ color: "#4caf50" }} />
                  </Box>
                  <Typography
                    variant="h6"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Find Nearby
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  className={styles.poppins}
                  sx={{ mb: 1 }}
                >
                  Locate nearby healthcare facilities with ease
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.poppins}
                  sx={{ color: "#666", mb: 4 }}
                >
                  Our interactive map shows you hospitals, clinics, pharmacies,
                  and other medical services in your vicinity.
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "#e8f5e9",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <PhoneIcon sx={{ color: "#4caf50" }} />
                  </Box>
                  <Typography
                    variant="h6"
                    className={`${styles.poppins} ${styles.bold}`}
                  >
                    Contact Info
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  className={styles.poppins}
                  sx={{ mb: 1 }}
                >
                  09054054286
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.poppins}
                  sx={{ color: "#666" }}
                >
                  help@sagipapp.com
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 5,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ height: 600, position: "relative" }}>
                  <MapComponent className={styles.mapContent} />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      bgcolor: "white",
                      p: 1,
                      borderRadius: 1,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  ></Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
};

export default ChooseMap;
