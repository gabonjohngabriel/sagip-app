import React, { useEffect, Suspense } from 'react';
import { Container, CssBaseline, Paper } from "@mui/material";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './components/store/useAuthStore';
import { useThemeStore } from './components/store/useThemeStore'; 
import { loadStripe } from "@stripe/stripe-js";

// COMPONENTS
import Menu from './components/Menu';
import ChooseMenu from "./components/ChooseMenu";
import DoctorsPage from './components/DoctorsPage'; 
import AppointmentPage from './components/AppointmentPage'; 
import BillPage from './components/MedicalBillPage'; 
import LoginPage from './components/LoginPage'; 
import ChatPage from './components/ChatPage'; 
import SignupPage from './components/SignupPage'; 
import PharmacyPage from './components/PharmacyPage'; 

// Theme import
import { createTheme } from "@mui/material/styles";

// Store imports - import directly from your store files
import { create } from 'zustand';

// Create theme
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

// Stripe promise with Vite environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51R003gQj9mYLhPujhh5U1gZo9WlPz0eziXtb0JSKPFObyR52BGImcm8TuEVOjX7pL6uENtQqMEowoOSrlqNaiiWl002miPLl3t");

// Placeholder components for testing
const PlaceholderComponent = ({ name }) => (
  <div style={{ padding: "20px" }}>
    <h2>{name} Component</h2>
    <p>This is a placeholder for the {name} component.</p>
  </div>
);

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme: appTheme } = useThemeStore();

  useEffect(() => {
    try {
      console.log("Checking authentication...");
      const token = localStorage.getItem("token");
      console.log("Found token in storage:", !!token);
      
      checkAuth().then(() => {
        console.log("Auth check completed, user:", authUser ? "authenticated" : "not authenticated");
      });
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  }, [checkAuth]);  

  const MapPage = () => <PlaceholderComponent name="MapPage" />;
  const PaymentSelectionDialog = () => <PlaceholderComponent name="Payment" />;
  const Dashboard = () => <PlaceholderComponent name="Dashboard" />;

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
            <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin" /></div>}>
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/choose" element={<ChooseMenu />} />
                <Route path="/choose/map" element={<MapPage />} />
                <Route path="/choose/pharmacy" element={<PharmacyPage />} />
                <Route path="/choose/healthprofessionals" element={<DoctorsPage />} />
                <Route path="/choose/appointment" element={<AppointmentPage />} />
                <Route path="/payment" element={<PaymentSelectionDialog />} />
                <Route path="/choose/epayment" element={<BillPage />} />
                <Route path="/choose/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/choose/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
                <Route path="/choose/chat" element={authUser ? <ChatPage /> : <LoginPage />} />
                <Route path="/profile" element={authUser ? <Dashboard /> : <LoginPage />} />
              </Routes>
            </Suspense>
          </Paper>
        </Container>
      </ThemeProvider>
      <Toaster />
    </HashRouter>
  );
}

export default App;