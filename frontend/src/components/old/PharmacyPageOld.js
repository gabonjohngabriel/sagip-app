import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useStyles from "../Styles";
import Logo from "../Logo";
import SagipLogoAnimation from "../SagipLogoAnimation";
import PaymentSelectionDialog from "../PaymentPage";

export default function PharmacyPage() {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openOrderCompleteDialog, setOpenOrderCompleteDialog] = useState(false);

  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  // SHOP LIST
  const medicines = [
    {
      id: 0,
      name: "Aspirin",
      description: "Pain reliever and fever reducer. Used to treat mild to moderate pain, and also to reduce fever.",
      price: 10,
      count: 100,
      img: "./images/aspirin.png",
    },
    {
      id: 1,
      name: "Ibuprofen",
      description: "Nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and reduce fever.",
      price: 15.0,
      count: 7,
      img: "./images/ibuprofen.png",
    },
    {
      id: 2,
      name: "Paracetamol",
      description: "Pain reliever and fever reducer that works by elevating the pain threshold and reducing fever through action on the heat-regulating center.",
      price: 10.0,
      count: 11,
      img: "./images/biogesic.png",
    },
    {
      id: 3,
      name: "Loratadine",
      description: "Antihistamine that reduces the effects of natural chemical histamine in the body. Used to treat sneezing, runny nose, and itchy or watery eyes.",
      price: 20.99,
      count: 13,
      img: "./images/claritin.png",
    },
    {
      id: 4,
      name: "Omeprazole",
      description: "Proton pump inhibitor that decreases the amount of acid produced in the stomach. Used to treat symptoms of gastroesophageal reflux disease.",
      price: 25.99,
      count: 16,
      img: "./images/omeprazole.png",
    },
    {
      id: 5,
      name: "Metformin",
      description: "Oral diabetes medicine that helps control blood sugar levels. Used to treat type 2 diabetes.",
      price: 29.0,
      count: 4,
      img: "./images/metformin.png",
    },
    {
      id: 6,
      name: "Lisinopril",
      description: "ACE inhibitor that helps relax blood vessels. Used to treat high blood pressure and heart failure.",
      price: 33.95,
      count: 18,
      img: "./images/lisinopril.png",
    },
    {
      id: 7,
      name: "Simvastatin",
      description: "Statin medication that lowers the level of cholesterol in the blood. Used to reduce the amount of fatty substances in the blood.",
      price: 15.0,
      count: 15,
      img: "./images/simvastatin.jpg",
    },
    {
      id: 8,
      name: "Amlodipine",
      description: "Calcium channel blocker that widens blood vessels and improves blood flow. Used to treat high blood pressure and chest pain.",
      price: 14.0,
      count: 19,
      img: "./images/amlodipine.png",
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

  const getMainContentWidth = () => {
    if (isMobile) return '100%';
    return '75%';
  };

  // TOTAL
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 50).toFixed(2);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row'}}>
        <Box
          sx={{ 
            flexGrow: 1, 
            width: getMainContentWidth(),
            float: isMobile ? 'none' : 'left',
            mb: isMobile ? '70px' : 0 
          }}
          className={`${styles.root} ${styles.main} ${styles.green}`}
        >
          <Container className={`${styles.center} ${styles.cardsContainer}`}>
            <Logo large />
            <Typography
              variant="h3"
              mt="5px"
              mb="15px"
              className={`${styles.center} ${styles.bold} ${styles.poppins}`}
              sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}
            >
              E-PHARMACY
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {medicines.map((medicine) => (
                <Grid item key={medicine.id} xs={6} sm={6} md={4} lg={3}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardActionArea onClick={() => handleOpenDialog(medicine)} sx={{ flexGrow: 1 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={medicine.img}
                        alt={medicine.name}
                        sx={{
                          objectFit: 'contain',
                          padding: 1,
                          backgroundColor: '#ffffff'
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          align="center"
                          className={`${styles.center} ${styles.bold} ${styles.spacing} ${styles.poppins}`}
                          sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                        >
                          {medicine.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          className={`${styles.center} ${styles.bold} ${styles.spacing} ${styles.poppins}`}
                          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
                        >
                          ₱ {medicine.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        <Box
          component={Paper}
          sx={{
            width: isMobile ? '100%' : (isTablet ? 0 : '25%'),
            p: isMobile ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            height: isMobile ? 'auto' : '100vh',
            position: 'fixed',
            right: 0,
            bottom: isMobile ? 0 : 'auto',
            top: isMobile ? 'auto' : 0,
            zIndex: 999,
            boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          }}
        >
          {!isMobile ? (
            <>
              <Typography
                variant="h1"
                className={`${styles.poppins} ${styles.bold}`}
                gutterBottom
                sx={{ fontSize: { sm: '1.2rem', md: '1.5rem' } }}
              >
                YOUR CART
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {cart.length === 0 ? (
                <Typography
                  className={`${styles.poppins}`}
                  variant="body2"
                  color="textSecondary"
                >
                  Empty
                </Typography>
              ) : (
                <>
                  <List sx={{ flexGrow: 1, overflow: "auto", maxHeight: '100vh' }}>
                    {cart.map((item, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => removeFromCart(index)}
                            size="small"
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={item.name}
                          secondary={`₱${item.price.toFixed(2)}`}
                          primaryTypographyProps={{ 
                            className: styles.poppins,
                            fontSize: isTablet ? '0.85rem' : '1rem'
                          }}
                          secondaryTypographyProps={{ fontSize: isTablet ? '0.75rem' : '0.875rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="h6"
                    className={`${styles.poppins}`}
                    align="right"
                    sx={{ fontSize: { sm: '1rem', md: '1.2rem' } }}
                  >
                    Total: ₱{calculateTotal()}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className={`${styles.poppins}`}
                    align="right"
                    sx={{ fontSize: { sm: '0.4rem', md: '0.8rem' } }}
                  >
                    + ₱50 SHIPPING FEE <br/> FLASH EXPRESS
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleCheckout}
                    className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
                    sx={{ mt: 2 }}
                    disabled={cart.length === 0}
                  >
                    Checkout
                  </Button>
                </>
              )}
            </>
          ) : (
            // Mobile cart view
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon sx={{ mr: 1 }} />
                <Typography variant="body1" className={styles.poppins} fontWeight="medium">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} • ₱{calculateTotal()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
                disabled={cart.length === 0}
                size="small"
              >
                Checkout
              </Button>
            </Box>
          )}
        </Box>

        {/* Medicine Detail Dialog */}
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
                        maxHeight: isMobile ? '200px' : '300px',
                        objectFit: 'contain'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Typography
                      className={`${styles.poppins} ${styles.bold}`}
                      variant="h3"
                      gutterBottom
                      color="black"
                      sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}
                    >
                      {selectedMedicine.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="#208a3c"
                      className={`${styles.poppins}`}
                      gutterBottom                      
                    >
                      ₱{selectedMedicine.price.toFixed(2)}
                      </Typography>
                    <Typography
                      variant="body1"
                      className={`${styles.poppins}`}
                      paragraph
                    >
                      {selectedMedicine.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={`${styles.poppins}`}
                    >
                      {selectedMedicine.count} in stock
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(selectedMedicine)}
                  className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
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

        {/* Order Complete Dialog */}
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
          <DialogContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 80, color: '#208a3c', mb: 2 }}
            />
            <DialogContentText
              className={`${styles.poppins} ${styles.bold}`}
              sx={{ fontSize: '1.5rem', mb: 2 }}
            >
              Thank you for your order!
            </DialogContentText>
            <DialogContentText className={styles.poppins}>
              Your order has been placed successfully and will be processed shortly.
            </DialogContentText>
            {cart.length > 0 && (
              <Box sx={{ mt: 3, mb: 1 }}>
                <Typography className={`${styles.poppins} ${styles.bold}`} variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, mx: 'auto' }}>
                  {cart.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`₱${item.price.toFixed(2)}`}
                        primaryTypographyProps={{ className: styles.poppins }}
                        secondaryTypographyProps={{ className: styles.poppins }}
                      />
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText
                      primary="Total"
                      secondary={`₱${calculateTotal()}`}
                      primaryTypographyProps={{ className: `${styles.poppins} ${styles.bold}` }}
                      secondaryTypographyProps={{ className: `${styles.poppins} ${styles.bold}` }}
                    />
                  </ListItem>
                </List>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
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
  );
}