import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Divider,
  CircularProgress,
  Collapse,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R003gQj9mYLhPujhh5U1gZo9WlPz0eziXtb0JSKPFObyR52BGImcm8TuEVOjX7pL6uENtQqMEowoOSrlqNaiiWl002miPLl3t"
);

const PaymentForm = ({
  onClose,
  onPaymentComplete,
  cart,
  styles,
  paymentMethod,
  setPaymentMethod,
  showFields,
  setShowFields,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gcashNumber: "",
  });

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    setShowFields(true);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // VALIDATION
    if (paymentMethod === "card") {
      if (!formData.name || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }
    } else if (paymentMethod === "gcash") {
      if (!formData.name || !formData.gcashNumber) {
        setError("Please fill in all required fields");
        return;
      }
    } else if (paymentMethod === "cod") {
      if (!formData.name || !formData.address || !formData.phone) {
        setError("Please fill in all required fields");
        return;
      }
    }

    setLoading(true);

    if (paymentMethod === "card") {
      try {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        
        // Here you would typically call your backend to create a Stripe checkout session
        // and receive a session ID. For this example, we'll simulate it:
        
        // Simulating API call to create checkout session
        setTimeout(async () => {
          // In a real implementation, replace this with actual API call:
          // const response = await fetch('/api/create-checkout-session', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ 
          //     cart: cart,
          //     customerEmail: formData.email,
          //     customerName: formData.name
          //   }),
          // });
          // const session = await response.json();
          
          // Simulated session ID (in production, get this from your backend)
          const sessionId = "cs_test_" + Math.random().toString(36).substring(2, 15);
          
          // Redirect to Stripe Checkout
          const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId,
          });
          
          if (error) {
            setError("Payment redirect failed. Please try again.");
            setLoading(false);
          }
        }, 1000);
        
      } catch (err) {
        setError("Payment processing failed. Please try again.");
        setLoading(false);
      }
    } else {
      // NON-STRIPE PAYMENT METHODS
      setTimeout(() => {
        setLoading(false);
        onPaymentComplete({
          type: paymentMethod,
          name: formData.name,
          ...(paymentMethod === "gcash" && { gcashNumber: formData.gcashNumber }),
          ...(paymentMethod === "cod" && { 
            address: formData.address,
            phone: formData.phone 
          }),
        });
      }, 1500);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 50).toFixed(2);
  };

  const totalAmount = cart
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return (
    <>
      <DialogTitle>
        Payment Method
        {!loading && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            className={`${styles.poppins} ${styles.bold}`}
            gutterBottom
          >
            Select Payment Method
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={handleChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      border:
                        paymentMethod === "gcash"
                          ? "2px solid #208a3c"
                          : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 2,
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      value="gcash"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PaymentIcon sx={{ mr: 1, color: "#208a3c" }} />
                          <Typography className={styles.poppins}>
                            GCash
                          </Typography>
                        </Box>
                      }
                      className={styles.poppins}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      border:
                        paymentMethod === "card"
                          ? "2px solid #208a3c"
                          : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 2,
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CreditCardIcon sx={{ mr: 1, color: "#208a3c" }} />
                          <Typography className={styles.poppins}>
                            Credit/Debit Card
                          </Typography>
                        </Box>
                      }
                      className={styles.poppins}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      border:
                        paymentMethod === "cod"
                          ? "2px solid #208a3c"
                          : "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 2,
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                  >
                    <FormControlLabel
                      value="cod"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalShippingIcon sx={{ mr: 1, color: "#208a3c" }} />
                          <Typography className={styles.poppins}>
                            Cash on Delivery
                          </Typography>
                        </Box>
                      }
                      className={styles.poppins}
                    />
                  </Box>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        {showFields && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              className={`${styles.poppins} ${styles.bold}`}
              gutterBottom
            >
              Payment Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  required={paymentMethod === "card"}
                />
              </Grid>

              {paymentMethod === "gcash" && (
                <Grid item xs={12} md={6}>
                  <TextField
                    name="gcashNumber"
                    label="GCash Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.gcashNumber}
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </Grid>
              )}

              {paymentMethod === "card" && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography 
                      variant="body2" 
                      gutterBottom 
                      className={styles.poppins}
                    >
                      You will be redirected to a secure Stripe checkout page to complete your payment.
                    </Typography>
                  </Box>
                </Grid>
              )}
              
              {paymentMethod === "cod" && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Delivery Address"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        )}

        <Box sx={{ mb: 2, mt: 3 }}>
          <Typography
            variant="h6"
            className={`${styles.poppins} ${styles.bold}`}
            gutterBottom
          >
            Order Summary
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" className={styles.poppins}>
              Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"})
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.poppins} ${styles.bold}`}
            >
              ₱{totalAmount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body1" className={styles.poppins}>
              Shipping Fee
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.poppins} ${styles.bold}`}
            >
              ₱50.00
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              className={`${styles.poppins} ${styles.bold}`}
            >
              Total
            </Typography>
            <Typography
              variant="h6"
              className={`${styles.poppins} ${styles.bold}`}
              color="#208a3c"
            >
              ₱{calculateTotal()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button
          variant="contained"
          className={`${styles.green} ${styles.cardhover} ${styles.poppins}`}
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={`${styles.poppins} ${styles.cardhover} ${styles.green} ${styles.bold}`}
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Processing..." : paymentMethod === "card" ? "Proceed to Payment" : `Pay ₱${calculateTotal()}`}
        </Button>
      </DialogActions>
    </>
  );
};

// Wrapper component
const PaymentSelectionDialog = ({
  open,
  onClose,
  onPaymentComplete,
  cart,
  styles,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [showFields, setShowFields] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <PaymentForm
        onClose={onClose}
        onPaymentComplete={onPaymentComplete}
        cart={cart}
        styles={styles}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        showFields={showFields}
        setShowFields={setShowFields}
      />
    </Dialog>
  );
};

export default PaymentSelectionDialog;