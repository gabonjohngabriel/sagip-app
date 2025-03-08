import React from "react";
import { Container, CssBaseline, Paper } from "@mui/material";
import HomeScreen from "./components/Menu"; // Import the HomeScreen component
import ChooseMenu from "./components/ChooseMenu"; // Import the ChooseMenu component
import MapPage from "./components/MapPage"; // Import the ChooseMap component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // For Material-UI v5
import PharmacyPage from "./components/PharmacyPage";
import DoctorsPage from "./components/DoctorsPage";
import AppointmentPage from "./components/AppointmentPage";
import BillPage from "./components/MedicalBillPage";
import PaymentSelectionDialog from "./components/PaymentPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const theme = createTheme({
  typography: {
    h1: { fontWeight: "bold" },
    h2: {
      fontFamily: "Poppins",
      fontSize: "2rem",
      color: "black",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
    },
  },
  palette: {
    primary: {
      main: "#fff174",
    },
    secondary: {
      main: "#ffcc80",
    },
  },
});

const stripePromise = loadStripe(
  "pk_test_51R003gQj9mYLhPujhh5U1gZo9WlPz0eziXtb0JSKPFObyR52BGImcm8TuEVOjX7pL6uENtQqMEowoOSrlqNaiiWl002miPLl3t"
);

const interval = setInterval(() => {
  // INTERVAL
}, 1000);

// CLEAR
clearInterval(interval);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper style={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/choose" element={<ChooseMenu />} />
              <Route path="/choose/map" element={<MapPage />} />
              <Route path="/choose/pharmacy" element={<PharmacyPage />} />
              <Route
                path="/choose/healthprofessionals"
                element={<DoctorsPage />}
              />
              <Route path="/choose/appointment" element={<AppointmentPage />} />
              <Route
                path="/payment"
                element={
                  <PaymentSelectionDialog
                    open={true}
                    onClose={() => {}}
                    onPaymentComplete={() => {}}
                    cart={[]}
                    styles={{}}
                  />
                }
              />
              <Route
                path="/choose/epayment"
                element={<BillPage />}
              />
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
