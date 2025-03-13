import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  TextField,
  Tab,
  Tabs,
  Tooltip,
  Container,
  useMediaQuery,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SendIcon from "@mui/icons-material/Send";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import SyncIcon from "@mui/icons-material/Sync";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HistoryIcon from "@mui/icons-material/History";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import useStyles from "./Styles";
import SagipLogoAnimation from "./SagipLogoAnimation";

// Custom theme with green colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Medium green
      light: "#4caf50", // Light green
      dark: "#1b5e20", // Dark green
    },
    secondary: {
      main: "#e8f5e9", // Very light green
    },
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "12px",
          boxShadow: "0 4px 14px 0 rgba(46, 125, 50, 0.25)",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px 0 rgba(46, 125, 50, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
  },
});

// COMPONENT
const BillPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTab, setSelectedTab] = useState(1); // Payments tab selected by default
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPage, setShowPage] = useState(false);
  const styles = useStyles();

  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // MEDICAL BILLS
  const medicalBills = [
    {
      id: 1,
      name: "Amy P.",
      status: "Scheduled",
      country: "Philippines",
      amount: "₱3,750.00",
      date: "Sep 28, 2:35 PM",
      hospital: "St. Luke's Medical Center",
      image: "https://i.pravatar.cc/150?img=1",
      dueIn: "2 days",
    },
    {
      id: 2,
      name: "Paul M.",
      status: "Scheduled",
      country: "Philippines",
      amount: "₱4,600.00",
      date: "Sep 28, 11:05 AM",
      hospital: "Makati Medical Center",
      image: "https://i.pravatar.cc/150?img=2",
      dueIn: "3 days",
    },
    {
      id: 3,
      name: "Michael S.",
      status: "Processing",
      country: "Philippines",
      amount: "₱5,845.00",
      date: "Sep 27, 9:15 AM",
      hospital: "Asian Hospital",
      image: "https://i.pravatar.cc/150?img=3",
      dueIn: "Processing",
    },
    {
      id: 4,
      name: "Doug S.",
      status: "Completed",
      country: "Philippines",
      amount: "₱1,472.00",
      date: "Sep 26, 3:45 PM",
      hospital: "Philippine General Hospital",
      image: "https://i.pravatar.cc/150?img=4",
      dueIn: "Paid",
    },
    {
      id: 5,
      name: "Lucy B.",
      status: "Completed",
      country: "Philippines",
      amount: "₱3,288.00",
      date: "Sep 25, 10:20 AM",
      hospital: "The Medical City",
      image: "https://i.pravatar.cc/150?img=5",
      dueIn: "Paid",
    },
  ];

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "#ff9800";
      case "Processing":
        return "#2196f3";
      case "Completed":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <CalendarIcon sx={{ color: "#ff9800" }} />;
      case "Processing":
        return <SyncIcon sx={{ color: "#2196f3" }} />;
      case "Completed":
        return <CheckCircleOutlineIcon sx={{ color: "#4caf50" }} />;
      default:
        return null;
    }
  };

  const handleGcashRedirect = () => {
    setPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    setPaymentDialogOpen(false);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleBillSelect = (bill) => {
    setSelectedBill(bill);
  };

  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  // Confetti Animation
  const Confetti = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              ease: "linear",
              delay: Math.random() * 0.5,
            }}
            sx={{
              position: "absolute",
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              backgroundColor: [
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
              ][Math.floor(Math.random() * 7)],
              borderRadius: "2px",
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`${styles.root} ${styles.cardsContainer}`}
        sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 2 }}
      >
        {showConfetti && <Confetti />}
        <Fade in={true} timeout={1000}>
          <Box>
            <Container maxWidth="xl">
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: "25px",
                  overflow: "hidden",
                  mb: 3,
                }}
              >
                {/* HEADER */}
                <Box
                  sx={{
                    padding: isSmallScreen ? "12px 16px" : "16px 24px",
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: isSmallScreen ? "flex-start" : "center",
                    justifyContent: "space-between",
                    bgcolor: "#208a3c",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HealthAndSafetyIcon sx={{ mr: 1, fontSize: 25 }} />
                    <Typography
                      className={`${styles.bold} ${styles.poppins}`}
                      variant="h4"
                    >
                      SAGIP
                    </Typography>
                  </Box>

                  <Box
                    className={`${styles.main3} ${styles.cardsContainer}`}
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      mt: isSmallScreen ? 2 : 0,
                      alignItems: "center",
                      width: isSmallScreen ? "100%" : "auto",
                      justifyContent: isSmallScreen
                        ? "space-between"
                        : "flex-end",
                    }}
                  >
                    {!isSmallScreen && (
                      <Tabs
                        value={selectedTab}
                        onChange={(e, newValue) => setSelectedTab(newValue)}
                        sx={{
                          "& .MuiTab-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                          "& .Mui-selected": { color: "white" },
                          "& .MuiTabs-indicator": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        }}
                      >
                        <Tab
                          className={`${styles.poppins}`}
                          label="Dashboard"
                        />
                        <Tab className={`${styles.poppins}`} label="Payments" />
                        <Tab className={`${styles.poppins}`} label="History" />
                        <Tab className={`${styles.poppins}`} label="Settings" />
                      </Tabs>
                    )}

                    <TextField
                      placeholder="Search"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <SearchIcon sx={{ mr: 1, color: "white" }} />
                        ),
                        sx: {
                          fontFamily: "Poppins, sans-serif",
                          color: "white",
                          "&::placeholder": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                        },
                      }}
                      sx={{
                        width: isSmallScreen ? "50%" : "170px",
                        ml: isSmallScreen ? 0 : 2,
                        "& .MuiInputBase-root": {
                          color: "white",
                          borderRadius: "20px",
                        },
                      }}
                    />

                    <Box sx={{ display: "flex" }}>
                      <Tooltip title="Settings">
                        <IconButton sx={{ color: "white" }}>
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Notifications">
                        <IconButton sx={{ color: "white" }}>
                          <Badge badgeContent={"99+"} color="error">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Profile">
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            ml: 1,
                            border: "2px solid white",
                          }}
                          src="https://i.pravatar.cc/150?img=11"
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>

                {isSmallScreen && (
                  <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    variant="fullWidth"
                    sx={{
                      bgcolor: "#sadsad",
                    }}
                  >
                    <Tab icon={<HomeIcon />} label="Dashboard" />
                    <Tab icon={<PaymentIcon />} label="Payments" />
                    <Tab icon={<HistoryIcon />} label="History" />
                    <Tab icon={<SettingsIcon />} label="Settings" />
                  </Tabs>
                )}

                {/* BODY */}
                <Box sx={{ padding: isSmallScreen ? "16px" : "16px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isSmallScreen ? "column" : "row",
                      justifyContent: "space-between",
                      alignItems: isSmallScreen ? "flex-start" : "center",
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: isSmallScreen ? 2 : 0,
                      }}
                    >
                      <LocalHospitalIcon
                        sx={{ color: "#2e7d32", fontSize: 32, mr: 1.5 }}
                      />
                      <Typography
                        className={`${styles.poppins} ${styles.bold}`}
                        sx={{ color: "#208a3c", letterSpacing: "-1px" }}
                        variant="h4"
                        component={motion.h4}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.75 }}
                      >
                        MEDICAL PAYMENTS
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        width: isSmallScreen ? "100%" : "auto",
                      }}
                    >
                      <Card
                        variant="outlined"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          px: 1,
                          py: 0.5,
                          flex: isSmallScreen ? 1 : "auto",
                        }}
                      >
                        <img
                          src="./images/gcash.png"
                          alt="GCash"
                          style={{ height: "24px", marginRight: "8px" }}
                        />
                        <Typography
                          className={`${styles.poppins}`}
                          variant="body2"
                          sx={{ mr: 1 }}
                        >
                          Hi, Gab!
                        </Typography>
                        <IconButton size="small">
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      </Card>

                      <Button
                        variant="contained"
                        className={`${styles.green} ${styles.cardsContainer} ${styles.poppins}`}
                        startIcon={<AddIcon />}
                        onClick={handleGcashRedirect}
                        color="primary"
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          flex: isSmallScreen ? 1 : "auto",
                          py: 1,
                        }}
                      >
                        PAY
                      </Button>
                    </Box>
                  </Box>

                  {/* BALANCE */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                        <Card
                          sx={{
                            height: "100%",
                            bgcolor: "#2e7d32",
                            color: "white",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <CardContent>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: isSmallScreen
                                    ? "column"
                                    : "row",
                                  justifyContent: "space-between",
                                  mb: 2,
                                }}
                              >
                                <Box>
                                  <Typography
                                    className={`${styles.poppins}`}
                                    variant="body2"
                                    mt={4}
                                    ml={1}
                                    sx={{ color: "#ffffff" }}
                                  >
                                    HOSPITAL BILL
                                    <Chip
                                      className={`${styles.poppins}`}
                                      size="small"
                                      label="SAGIP"
                                      sx={{
                                        ml: 1,
                                        bgcolor: "#e8f5e9",
                                        color: "green",
                                      }}
                                    />
                                  </Typography>
                                  <Typography
                                    className={`${styles.poppins}`}
                                    mt={0.3}
                                    ml={1}
                                    variant="h4"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    ₱69,592.00
                                  </Typography>
                                </Box>
                                <Card
                                  sx={{
                                    p: 2,
                                    borderRadius: "12px",
                                    width: isSmallScreen ? "100%" : "240px",
                                    mt: isSmallScreen ? 2 : 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    bgcolor: "#fff",
                                    color: "#000",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <img
                                      src="./images/gcash.png"
                                      alt="GCash"
                                      style={{ height: "24px" }}
                                    />
                                  </Box>

                                  <Typography
                                    variant="body1"
                                    className={`${styles.poppins}`}
                                    sx={{ mt: 1, opacity: 0.8 }}
                                  >
                                    •••• 4329
                                  </Typography>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      mt: 1.5,
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      className={`${styles.poppins}`}
                                      sx={{
                                        bgcolor: "#00000015",
                                        px: 1.5,
                                        borderRadius: "6px",
                                      }}
                                    >
                                      09/25
                                    </Typography>
                                  </Box>
                                </Card>
                              </Box>
                            </motion.div>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: isSmallScreen ? "column" : "row",
                                gap: 2,
                                mt: 3,
                              }}
                            >
                              <Button
                                variant="contained"
                                startIcon={<SendIcon />}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${styles.poppins}`}
                                sx={{
                                  borderRadius: "20px",
                                  flex: 1,
                                  py: 1.5,
                                  lineHeight: "15px",
                                  bgcolor: "rgba(255, 255, 255, 0.9)",
                                  color: "#2e7d32",
                                  "&:hover": {
                                    bgcolor: "#fff",
                                  },
                                }}
                              >
                                Send Payment
                              </Button>
                              <Button
                                variant="contained"
                                startIcon={<SyncAltIcon />}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${styles.poppins}`}
                                sx={{
                                  borderRadius: "20px",
                                  flex: 1,
                                  py: 1.5,
                                  lineHeight: "15px",
                                  bgcolor: "rgba(255, 255, 255, 0.9)",
                                  color: "#2e7d32",
                                  "&:hover": {
                                    bgcolor: "#fff",
                                  },
                                }}
                              >
                                Split Bill
                              </Button>
                              <Button
                                variant="contained"
                                startIcon={<FileDownloadIcon />}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${styles.poppins}`}
                                sx={{
                                  borderRadius: "20px",
                                  flex: 1,
                                  py: 1.5,
                                  lineHeight: "15px",
                                  bgcolor: "rgba(255, 255, 255, 0.9)",
                                  color: "#2e7d32",
                                  "&:hover": {
                                    bgcolor: "#fff",
                                  },
                                }}
                              >
                                View Invoice
                              </Button>
                            </Box>

                            {/* DECORATIVE */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: -30,
                                right: -30,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,255,255,0.05)",
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: -40,
                                left: -40,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,255,255,0.05)",
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>

                    {/* SIDEBAR */}
                    <Grid item xs={12} md={4}>
                      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                        <Card sx={{ height: "100%" }}>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <MedicalServicesIcon
                                  sx={{ color: "#2e7d32", mr: 1 }}
                                />
                                <Typography
                                  className={`${styles.poppins} ${styles.bold}`}
                                  sx={{
                                    lineHeight: "20px",
                                    letterSpacing: "0px",
                                    ml: 1,
                                  }}
                                  variant="h6"
                                >
                                  UPCOMING PAYMENTS
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ position: "relative" }}>
                              {medicalBills
                                .filter((bill) => bill.status === "Scheduled")
                                .slice(0, 2)
                                .map((bill, index) => (
                                  <Card
                                    key={bill.id}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: 0.3 + index * 0.2,
                                      duration: 0.5,
                                    }}
                                    variant="outlined"
                                    sx={{
                                      mb: 2,
                                      p: 2,
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      borderLeft: `4px solid ${getStatusChipColor(
                                        bill.status
                                      )}`,
                                    }}
                                    onClick={() => handleBillSelect(bill)}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          src={bill.image}
                                          sx={{ width: 32, height: 32, mr: 1 }}
                                        >
                                          {bill.name.charAt(0)}
                                        </Avatar>
                                        <Typography
                                          className={`${styles.poppins} ${styles.bold}`}
                                          variant="body2"
                                          sx={{ lineHeight: "15px" }}
                                        >
                                          {bill.name}
                                        </Typography>
                                      </Box>
                                      <Chip
                                        className={`${styles.poppins} ${styles.italic}`}
                                        size="small"
                                        label={`Due in ${bill.dueIn}`}
                                        sx={{
                                          bgcolor: "#fff9c4",
                                          ml: 1,
                                          color: "#ffa000",
                                          fontSize: "10px",
                                        }}
                                      />
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          className={`${styles.poppins}`}
                                          variant="h6"
                                        >
                                          {bill.amount}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          className={`${styles.poppins}`}
                                          sx={{ color: "#00000095" }}
                                        >
                                          {bill.date}
                                        </Typography>
                                      </Box>
                                      <Button
                                        className={` ${styles.poppins} ${styles.cardsContainer}`}
                                        component={motion.button}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        size="small"
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                          borderRadius: "20px",
                                          textTransform: "none",
                                          backgroundColor: "#fff9c4 !important",
                                          color: "#ffa000",
                                        }}
                                      >
                                        Pay
                                      </Button>
                                    </Box>

                                    <Typography
                                      className={`${styles.poppins}`}
                                      variant="body2"
                                      sx={{
                                        fontSize: "12px",
                                        mt: 1,
                                        color: "#00000075",
                                      }}
                                    >
                                      {bill.hospital}
                                    </Typography>
                                  </Card>
                                ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  </Grid>

                  {/* LIST */}
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Fade in={true} style={{ transitionDelay: "300ms" }}>
                        <Card>
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: isSmallScreen ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: isSmallScreen
                                  ? "flex-start"
                                  : "center",
                                mb: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: isSmallScreen ? 2 : 0,
                                }}
                              >
                                <HealthAndSafetyIcon
                                  sx={{ color: "#208a3c", mr: 1 }}
                                />
                                <Typography
                                  className={` ${styles.poppins} ${styles.bold}`}
                                  sx={{
                                    letterSpacing: -0.5,
                                    color: "#208a3c",
                                  }}
                                  variant="h5"
                                >
                                  ALL MEDICAL BILLS
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  width: isSmallScreen ? "100%" : "auto",
                                }}
                              >
                                <TextField
                                  className={`${styles.bold}`}
                                  placeholder="Search"
                                  variant="outlined"
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <SearchIcon
                                        sx={{
                                          mr: 1,
                                          color: "#00000075",
                                        }}
                                      />
                                    ),
                                  }}
                                  sx={{
                                    width: isSmallScreen ? "100%" : "230px",
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "20px",
                                    },
                                  }}
                                />
                                <Tooltip title="Filter">
                                  <IconButton sx={{ color: "#00000075" }}>
                                    <FilterListIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: isSmallScreen
                                  ? "1fr"
                                  : isMediumScreen
                                  ? "1fr 1fr"
                                  : "1fr 1fr 1fr",
                                gap: 2,
                                alignItems: "center",
                              }}
                            >
                              {medicalBills.map((bill, index) => (
                                <Card
                                  className={styles.cardsize1}
                                  key={bill.id}
                                  component={motion.div}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: 0.1 * index,
                                    duration: 0.5,
                                  }}
                                  variant="outlined"
                                  sx={{
                                    p: 2,
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    borderLeft: `4px solid ${getStatusChipColor(
                                      bill.status
                                    )}`,
                                    bgcolor:
                                      selectedBill?.id === bill.id
                                        ? "#e8f5e9"
                                        : "white",
                                  }}
                                  onClick={() => handleBillSelect(bill)}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignContent: "center",
                                      mb: 1,
                                      height: "100%",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Avatar
                                        src={bill.image}
                                        sx={{ width: 40, height: 40, mr: 1.5 }}
                                      >
                                        {bill.name.charAt(0)}
                                      </Avatar>
                                      <Box>
                                        <Typography
                                          className={`${styles.bold} ${styles.poppins}`}
                                          variant="body1"
                                          fontWeight={500}
                                        >
                                          {bill.name}
                                        </Typography>
                                        <Typography
                                          className={`${styles.poppins}`}
                                          sx={{
                                            color: "#00000075",
                                            lineHeight: "15px !important",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {bill.hospital}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Chip
                                      className={`${styles.poppins}`}
                                      size="small"
                                      label={bill.status}
                                      sx={{
                                        bgcolor: `${getStatusChipColor(
                                          bill.status
                                        )}15`,
                                        color: getStatusChipColor(bill.status),
                                        fontWeight: 500,
                                      }}
                                    />
                                  </Box>

                                  <Divider sx={{ my: 1.5 }} />

                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignContent: "center",
                                      display: "inline-flex",
                                      mt: 1,
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        className={`${styles.poppins}`}
                                        variant="h6"
                                        fontWeight={600}
                                        sx={{ mb: -1, mr: 1 }}
                                      >
                                        {bill.amount}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        className={`${styles.poppins}`}
                                        sx={{ color: "#00000095" }}
                                      >
                                        {bill.date}
                                      </Typography>
                                    </Box>
                                    {bill.status === "Scheduled" ? (
                                      <Button
                                        className={`${styles.poppins}`}
                                        size="small"
                                        variant="contained"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={handleGcashRedirect}
                                        sx={{
                                          borderRadius: "15px",
                                          textTransform: "none",
                                          p: 1,
                                          lineHeight: "14px",
                                          ml: 1,
                                        }}
                                      >
                                        Pay Now
                                      </Button>
                                    ) : bill.status === "Processing" ? (
                                      <Button
                                        className={`${styles.green} ${styles.poppins}`}
                                        size="small"
                                        variant="contained"
                                        sx={{
                                          borderRadius: "15px",
                                          textTransform: "none",
                                          p: 1,
                                          lineHeight: "14px",
                                          ml: 1,
                                        }}
                                      >
                                        View Status
                                      </Button>
                                    ) : (
                                      <Button
                                        className={`${styles.green} ${styles.poppins}`}
                                        size="small"
                                        variant="contained"
                                        sx={{
                                          borderRadius: "15px",
                                          textTransform: "none",
                                          p: 1,
                                          lineHeight: "14px",
                                          ml: 1,
                                        }}
                                      >
                                        Receipt
                                      </Button>
                                    )}
                                  </Box>
                                </Card>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Fade>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>

            {/* PAYMENT DIALOG */}
            <Dialog
              open={paymentDialogOpen}
              onClose={() => setPaymentDialogOpen(false)}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle
                className={`${styles.bold} ${styles.poppins}`}
                sx={{
                  bgcolor: "#2e7d32",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "-0.5px",
                }}
              >
                <img
                  src="./images/gcash.png"
                  alt="GCash"
                  style={{ height: "24px", marginRight: "12px" }}
                />
                GCASH PAYMENT
              </DialogTitle>
              <DialogContent sx={{ mt: 2 }}>
                <Box sx={{ textAlign: "center", mb: 2, mt: 1 }}>
                  <Typography
                    className={`${styles.bold} ${styles.poppins}`}
                    variant="h6"
                  >
                    Confirm Payment
                  </Typography>
                  <Typography
                    className={`${styles.poppins}`}
                    variant="body2"
                    mb={3}
                    color="textSecondary"
                  >
                    You are about to pay for your medical bill
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    p: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      className={`${styles.poppins}`}
                      variant="body2"
                      color="textSecondary"
                    >
                      Amount
                    </Typography>
                    <Typography
                      className={`${styles.poppins}`}
                      variant="body1"
                      fontWeight={600}
                    >
                      ₱3,750.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      className={`${styles.poppins}`}
                      variant="body2"
                      color="textSecondary"
                    >
                      Fee
                    </Typography>
                    <Typography className={`${styles.poppins}`} variant="body1">
                      ₱0.00
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      className={`${styles.poppins}`}
                      variant="body1"
                      fontWeight={600}
                    >
                      Total
                    </Typography>
                    <Typography
                      className={`${styles.poppins}`}
                      variant="body1"
                      fontWeight={600}
                    >
                      ₱3,750.00
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  label="MPIN"
                  type="password"
                  variant="outlined"
                  sx={{
                    mb: 2,
                  }}
                  inputProps={{ maxLength: 4 }}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                  className={`${styles.poppins} ${styles.cardhover}`}
                  onClick={() => setPaymentDialogOpen(false)}
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    px: 3,
                    borderColor: "#208a3c !important",
                    color: "#208a3c",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className={`${styles.green} ${styles.cardhover} ${styles.bold} ${styles.poppins}`}
                  onClick={handlePaymentComplete}
                  variant="contained"
                  sx={{ borderRadius: "8px", px: 3 }}
                  autoFocus
                >
                  Confirm Payment
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default BillPage;
