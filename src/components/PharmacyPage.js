import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Fade,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  DialogContentText,
  Badge,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";
import SagipLogoAnimation from "./SagipLogoAnimation";
import useStyles from "./Styles";
import Logo from "./Logo";
import PaymentSelectionDialog from "./PaymentPage";

export default function PharmacyPage() {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openOrderCompleteDialog, setOpenOrderCompleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showPage, setShowPage] = useState(false);

  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  // CATEGORIES
  const categories = [
    { name: "Bone & Joint Care", img: "./images/bone.png" },
    { name: "Diabetes Care", img: "./images/diabetes.jpg" },
    { name: "Kidney Care", img: "./images/kidney.png" },
    { name: "Liver Care", img: "./images/liver.jpg" },
    { name: "Respiratory Care", img: "./images/respiratory.jpg" },
    { name: "Eye Care", img: "./images/systane.png" },
  ];

  // SHOP LIST
  const medicines = [
    {
      id: 0,
      name: "Aspirin",
      description:
        "Pain reliever and fever reducer. Used to treat mild to moderate pain, and also to reduce fever.",
      price: 10.0,
      originalPrice: 15.0,
      rating: 5,
      count: 50,
      img: "./images/aspirin.png",
      category: "Nutrition",
      dosageForm: "Tablet or caplet",
      dosageStrength: "500 mg per tablet",
      indications:
        "To relieve mild to moderate pain, including headaches, toothaches, muscle aches, and to reduce fever.",
      administration: "Oral",
    },
    {
      id: 1,
      name: "Ibuprofen",
      description:
        "Nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and reduce fever.",
      price: 15.0,
      originalPrice: 20.0,
      rating: 4.9,
      count: 200,
      img: "./images/ibuprofen.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "400 mg per tablet",
      indications:
        "Used to relieve pain from conditions such as headaches, dental pain, menstrual cramps, muscle aches, or arthritis.",
      administration: "Oral",
    },
    {
      id: 2,
      name: "Paracetamol",
      description:
        "Pain reliever and fever reducer that works by elevating the pain threshold and reducing fever through action on the heat-regulating center.",
      price: 10.0,
      originalPrice: 12.0,
      rating: 4.9,
      count: 10.0,
      img: "./images/biogesic.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "500 mg per tablet",
      indications: "Used to relieve mild to moderate pain and reduce fever.",
      administration: "Oral",
    },
    {
      id: 3,
      name: "Loratadine",
      description:
        "Antihistamine that reduces the effects of natural chemical histamine in the body. Used to treat sneezing, runny nose, and itchy or watery eyes.",
      price: 80.0,
      originalPrice: 100.0,
      rating: 4.7,
      count: 180,
      img: "./images/claritin.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "10 mg per tablet",
      indications:
        "Used to treat allergies, including hay fever, hives, and other allergic skin conditions.",
      administration: "Oral",
    },
    {
      id: 4,
      name: "Omeprazole",
      description:
        "Proton pump inhibitor that decreases the amount of acid produced in the stomach. Used to treat symptoms of gastroesophageal reflux disease.",
      price: 25.99,
      originalPrice: 30.0,
      rating: 4.8,
      count: 16,
      img: "./images/omeprazole.png",
      category: "Nutrition",
      dosageForm: "Capsule",
      dosageStrength: "20 mg per capsule",
      indications: "Used to treat heartburn, acid reflux, and stomach ulcers.",
      administration: "Oral",
    },
    {
      id: 5,
      name: "Metformin",
      description:
        "Oral diabetes medicine that helps control blood sugar levels. Used to treat type 2 diabetes.",
      price: 29.0,
      originalPrice: 35.0,
      rating: 4.6,
      count: 4,
      img: "./images/metformin.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "500 mg per tablet",
      indications:
        "Used to improve blood sugar control in adults with type 2 diabetes.",
      administration: "Oral",
    },
    {
      id: 6,
      name: "Lisinopril",
      description:
        "ACE inhibitor that helps relax blood vessels. Used to treat high blood pressure and heart failure.",
      price: 33.95,
      originalPrice: 40.0,
      rating: 4.7,
      count: 18,
      img: "./images/lisinopril.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "10 mg per tablet",
      indications: "Used to treat high blood pressure and heart failure.",
      administration: "Oral",
    },
    {
      id: 7,
      name: "Simvastatin",
      description:
        "Statin medication that lowers the level of cholesterol in the blood. Used to reduce the amount of fatty substances in the blood.",
      price: 15.0,
      originalPrice: 20.0,
      rating: 4.5,
      count: 15,
      img: "./images/simvastatin.jpg",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "20 mg per tablet",
      indications:
        "Used to lower cholesterol and reduce the risk of heart disease.",
      administration: "Oral",
    },
    {
      id: 8,
      name: "Amlodipine",
      description:
        "Calcium channel blocker that widens blood vessels and improves blood flow. Used to treat high blood pressure and chest pain.",
      price: 14.0,
      originalPrice: 18.0,
      rating: 4.8,
      count: 19,
      img: "./images/amlodipine.png",
      category: "Nutrition",
      dosageForm: "Tablet",
      dosageStrength: "5 mg per tablet",
      indications: "Used to treat high blood pressure and chest pain (angina).",
      administration: "Oral",
    },
  ];

  // ACTIONS
  const handleOpenDialog = (medicine) => {
    setSelectedMedicine(medicine);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
    handleCloseDialog();
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    setOpenPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    setOpenPaymentDialog(false);
    setOpenOrderCompleteDialog(true);
  };

  const handleCloseOrderComplete = () => {
    setOpenOrderCompleteDialog(false);
    setCart([]);
  };

  // TOTAL
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  // FILTER
  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      className={`${styles.root} ${styles.whitebg} ${styles.cardsContainer}`}
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Fade in={true} timeout={1000}>
        <Box>
          {/* HEADER */}
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

          {/* MOBILE */}
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
              placeholder="Medicine and Healthcare items"
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

          {/* HEADLINE */}
          <Box
            sx={{
              bgcolor: "#c8f7c5",
              p: { xs: 2, md: 4 },
              mb: 4,
              borderRadius: { xs: 0, md: 2 },
              mx: { xs: 0, md: 2 },
              mt: { xs: 0, md: 4 },
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  className={`${styles.poppins} ${styles.bold}`}
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    mb: 2,
                    fontSize: { xs: "3rem", md: "4.5rem" },
                    lineHeight: 1.1,
                    letterSpacing: -4,
                  }}
                >
                  E-PHARMACY
                </Typography>
                <Typography
                  className={`${styles.poppins}`}
                  variant="body1"
                  sx={{ lineHeight: "15px", mb: 3, maxWidth: "80%" }}
                >
                  ONLINE MEDICINE DELIVERY IS THE PROCESS OF ORDERING
                  MEDICATIONS THROUGH A WEBSITE OR APP AND HAVING THEM DELIVERED
                  TO YOUR DOORSTEP.
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                  <Chip
                    icon={<LocalShippingIcon />}
                    className={`${styles.poppins}`}
                    label="House-to-House Delivery"
                    sx={{
                      bgcolor: "rgba(0,0,0,0.7)",
                      color: "white",
                      borderRadius: "50px",
                    }}
                  />
                  <Chip
                    icon={<VerifiedIcon />}
                    className={`${styles.poppins}`}
                    label="Stock by Pharmaceutical Companies"
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      borderRadius: "50px",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "inline-block",
                    border: "1px dashed #666",
                    borderRadius: 2,
                    p: 2,
                    mr: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    className={`${styles.poppins}`}
                    sx={{ mb: 1 }}
                  >
                    UPLOAD PRESCRIPTION
                  </Typography>
                  <Button
                    className={`${styles.poppins} ${styles.green}`}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Order Via Prescription
                  </Button>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box sx={{ position: "static", textAlign: "center" }}>
                  <img
                    src="./images/delivery.gif"
                    alt="Delivery"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* CATEGORIES */}
          <Container maxWidth="lg" sx={{ mb: 3 }}>
            <Grid container spacing={2} justifyContent="center">
              {categories.map((category, index) => (
                <Grid item key={index} xs={4} sm={2}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      boxShadow: "0 3px 1px #136e2c",
                      border: "1px solid #eee",
                      height: "100%",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 5px 5px #136e2c",
                      },
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        p: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={category.img}
                        alt={category.name}
                        sx={{
                          height: 80,
                          width: 80,
                          objectFit: "cover",
                          borderRadius: "8px",
                          margin: "0 auto",
                        }}
                      />
                      <CardContent sx={{ p: 1, textAlign: "center" }}>
                        <Typography
                          className={`${styles.poppins} ${styles.bold}`}
                          variant="caption"
                          component="div"
                          sx={{ fontWeight: "medium" }}
                        >
                          {category.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* LIST UI */}
          <Container maxWidth="lg" sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                className={`${styles.poppins} ${styles.bold}`}
                variant="h5"
                component="h2"
                sx={{ letterSpacing: -1 }}
              >
                April's best deals for your clinic!
              </Typography>
              <Button
                className={`${styles.poppins} ${styles.green}`}
                variant="contained"
                size="small"
                sx={{ borderRadius: "20px" }}
                endIcon={<span>→</span>}
              >
                SEE ALL PRODUCTS
              </Button>
            </Box>

            <Grid container spacing={2}>
              {filteredMedicines.map((medicine) => (
                <Grid item key={medicine.id} xs={6} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "12px",
                      boxShadow: "0 6px 1px #136e2c",
                      border: "1px solid #eee",
                      position: "relative",
                      transition: "transform 0.5s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 6px 12px #136e2c",
                      },
                    }}
                  >
                    {medicine.discount && (
                      <Chip
                        label={medicine.discount}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          bgcolor: "#f9c74f",
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                        }}
                      />
                    )}

                    <CardActionArea
                      onClick={() => handleOpenDialog(medicine)}
                      sx={{ flexGrow: 1 }}
                    >
                      <CardMedia
                        component="img"
                        height={160}
                        image={medicine.img}
                        alt={medicine.name}
                        sx={{
                          objectFit: "contain",
                          padding: 1,
                          backgroundColor: "#ffffff",
                        }}
                      />
                      <CardContent sx={{ pb: 1 }}>
                        <Typography
                          className={`${styles.poppins}`}
                          variant="caption"
                          color="#434543"
                          component="div"
                          sx={{ mb: 0.5 }}
                        >
                          {medicine.category}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            className={`${styles.poppins}`}
                            sx={{
                              bgcolor: "#f8f8f8",
                              px: 0.5,
                              borderRadius: 1,
                              mr: 0.5,
                            }}
                          >
                            ★ {medicine.rating}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          className={`${styles.poppins}`}
                          sx={{
                            fontWeight: "medium",
                            mb: 0.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            height: "2.5rem",
                          }}
                        >
                          {medicine.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            mt: 1,
                          }}
                        >
                          <Typography
                            className={`${styles.poppins}`}
                            variant="body1"
                            fontWeight="bold"
                            sx={{ color: "#1976d2" }}
                          >
                            ₱{medicine.price.toFixed(2)}
                          </Typography>
                          {medicine.originalPrice && (
                            <Typography
                              className={`${styles.poppins}`}
                              variant="caption"
                              sx={{
                                textDecoration: "line-through",
                                ml: 1,
                                color: "#777",
                              }}
                            >
                              ₱{medicine.originalPrice.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <Box sx={{ p: 1, pt: 0 }}>
                      <Button
                        className={`${styles.poppins} ${styles.green}`}
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => addToCart(medicine)}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          mt: "auto",
                          letterSpacing: -0.5,
                          fontWeight: "bold",
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* CART MOBILE */}
          {isMobile && cart.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1000,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Box>
                <Typography
                  className={`${styles.poppins}`}
                  variant="body2"
                  color="textSecondary"
                >
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </Typography>
                <Typography
                  className={`${styles.poppins}`}
                  variant="body1"
                  fontWeight="bold"
                >
                  ₱{calculateTotal()}
                </Typography>
              </Box>
              <Button
                className={`${styles.poppins} ${styles.bold} ${styles.green}`}
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                sx={{ borderRadius: 8 }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          )}

          {/* MEDICINE */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
          >
            {selectedMedicine && (
              <>
                <DialogTitle>
                  {selectedMedicine.name}
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                      <img
                        src={selectedMedicine.img}
                        alt={selectedMedicine.name}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          maxHeight: isMobile ? "200px" : "300px",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography
                        className={`${styles.poppins}`}
                        variant="caption"
                      >
                        {selectedMedicine.category}
                      </Typography>
                      <Typography
                        className={`${styles.poppins}`}
                        variant="h5"
                        sx={{ my: 1 }}
                      >
                        {selectedMedicine.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography
                          className={`${styles.poppins}`}
                          variant="body2"
                          sx={{
                            bgcolor: "#f8f8f8",
                            px: 1,
                            borderRadius: 1,
                            mr: 1,
                          }}
                        >
                          ★ {selectedMedicine.rating}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedMedicine.count} in stock
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        className={`${styles.poppins}`}
                        sx={{ mt: 1, color: "#555", display: "block" }}
                      >
                        <strong>Dosage Form:</strong>{" "}
                        {selectedMedicine.dosageForm}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={`${styles.poppins}`}
                        sx={{ mt: 0.5, color: "#555", display: "block" }}
                      >
                        <strong>Dosage Strength:</strong>{" "}
                        {selectedMedicine.dosageStrength}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={`${styles.poppins}`}
                        sx={{ mt: 0.5, color: "#555", display: "block" }}
                      >
                        <strong>Indications:</strong>{" "}
                        {selectedMedicine.indications}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={`${styles.poppins}`}
                        sx={{ mt: 0.5, color: "#555", display: "block" }}
                      >
                        <strong>Administration:</strong>{" "}
                        {selectedMedicine.administration}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          mt: 2,
                          mb: 1,
                        }}
                      >
                        <Typography
                          className={`${styles.poppins}`}
                          variant="h6"
                          fontWeight="bold"
                          sx={{ color: "#1976d2" }}
                        >
                          ₱{selectedMedicine.price.toFixed(2)}
                        </Typography>
                        {selectedMedicine.originalPrice && (
                          <Typography
                            className={`${styles.poppins}`}
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              ml: 2,
                              color: "#999",
                            }}
                          >
                            ₱{selectedMedicine.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                        {selectedMedicine.discount && (
                          <Chip
                            label={selectedMedicine.discount}
                            size="small"
                            sx={{
                              ml: 2,
                              bgcolor: "#f9c74f",
                              color: "#000",
                              fontWeight: "bold",
                            }}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    className={`${styles.poppins} ${styles.green} ${styles.bold}`}
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(selectedMedicine)}
                    sx={{ borderRadius: 8, m: 1 }}
                  >
                    Add to Cart
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>

          {/* Payment Dialog */}
          <Dialog
            open={openPaymentDialog}
            onClose={() => setOpenPaymentDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <PaymentSelectionDialog
              open={openPaymentDialog}
              onClose={() => setOpenPaymentDialog(false)}
              onPaymentComplete={handlePaymentComplete}
              cart={cart}
              styles={styles}
            />
          </Dialog>

          {/* ORDER COMPLETE DIALOG */}
          <Dialog
            open={openOrderCompleteDialog}
            onClose={handleCloseOrderComplete}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Order Complete
              <IconButton
                aria-label="close"
                onClick={handleCloseOrderComplete}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center", py: 4 }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 80, color: "#208a3c", mb: 2 }}
              />
              <DialogContentText
                className={`${styles.poppins} ${styles.bold}`}
                sx={{ fontSize: "1.5rem", mb: 2 }}
              >
                Thank you for your order!
              </DialogContentText>
              <DialogContentText className={styles.poppins}>
                Your order has been placed successfully and will be processed
                shortly.
              </DialogContentText>
              {cart.length > 0 && (
                <Box sx={{ mt: 3, mb: 1 }}>
                  <Typography
                    className={`${styles.poppins} ${styles.bold}`}
                    variant="h6"
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                  <List sx={{ width: "100%", maxWidth: 360, mx: "auto" }}>
                    {cart.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={item.name}
                          secondary={`₱${item.price.toFixed(2)}`}
                          primaryTypographyProps={{ className: styles.poppins }}
                          secondaryTypographyProps={{
                            className: styles.poppins,
                          }}
                        />
                      </ListItem>
                    ))}
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                      <ListItemText
                        primary="Total"
                        secondary={`₱${calculateTotal()}`}
                        primaryTypographyProps={{
                          className: `${styles.poppins} ${styles.bold}`,
                        }}
                        secondaryTypographyProps={{
                          className: `${styles.poppins} ${styles.bold}`,
                        }}
                      />
                    </ListItem>
                  </List>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                variant="contained"
                className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
                onClick={handleCloseOrderComplete}
              >
                Continue Shopping
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Box>
  );
}
