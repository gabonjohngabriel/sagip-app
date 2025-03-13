import React, { useEffect } from 'react';
import { Container, CssBaseline, Paper } from "@mui/material";
import HomeScreen from "./components/Menu";
import ChooseMenu from "./components/ChooseMenu";
import MapPage from "./components/MapPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PharmacyPage from "./components/PharmacyPage";
import DoctorsPage from "./components/DoctorsPage";
import AppointmentPage from "./components/AppointmentPage";
import ChatPage from "./components/ChatPage";
import BillPage from "./components/MedicalBillPage";
import PaymentSelectionDialog from "./components/PaymentPage";
import LoginPage from "./components/LoginPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./components/store/useAuthStore";
import { useThemeStore } from "./components/store/useThemeStore";

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

const stripePromise = loadStripe("pk_test_51R003gQj9mYLhPujhh5U1gZo9WlPz0eziXtb0JSKPFObyR52BGImcm8TuEVOjX7pL6uENtQqMEowoOSrlqNaiiWl002miPLl3t");

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme: appTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper style={{ minHeight: "100vh" }} data-theme={appTheme}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/choose" element={<ChooseMenu />} />
              <Route path="/choose/map" element={<MapPage />} />
              <Route path="/choose/pharmacy" element={<PharmacyPage />} />
              <Route path="/choose/healthprofessionals" element={<DoctorsPage />} />
              <Route path="/choose/appointment" element={<AppointmentPage />} />
              <Route path="/payment" element={<PaymentSelectionDialog open={true} onClose={() => {}} onPaymentComplete={() => {}} cart={[]} styles={{}} />} />
              <Route path="/choose/epayment" element={<BillPage />} />
              <Route path="/choose/login" element={authUser ? <HomeScreen/> : <LoginPage />} />
              <Route path="/choose/signup" element={authUser ? <HomeScreen /> : <SignupPage />} />
              <Route path="/choose/chat" element={authUser ? <ChatPage /> : <LoginPage />} />
              <Route path="/profile" element={authUser ? <Dashboard /> : <LoginPage />} />
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
      <Toaster />
    </HashRouter>
  );
}

export default App;
