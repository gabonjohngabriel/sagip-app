import React from "react";
import { Typography, Box, Card, Fade, Container, Grid, Button } from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-providers";
import "leaflet-routing-machine";
import "./Map.css";
import MapComponent from "./MapComponent";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ChooseMap = () => {
  const styles = useStyles();

  return (
    <Box className={`${styles.root} ${styles.center2}`} sx={{ bgcolor: "#208a3c", minHeight: "100vh" }}>
      <Fade in={true} timeout={1000}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Logo large />
            <Typography
              variant="h3"
              className={`${styles.poppins} ${styles.white} ${styles.bold}`}
              sx={{ 
                mt: 2, 
                color: "#333", 
                maxWidth: "400px"
              }}
            >
              Locate Your Favorite Healthcare Clinics and Facilities
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.poppins} ${styles.white}`}
              sx={{ 
                mt: 1, 
                mb: 4, 
                color: "#666", 
                maxWidth: "600px" }}
            >
              We're here to help you locate the nearest healthcare facilities. Use the map below to find hospitals, clinics, pharmacies, and other medical services in your area.
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
              }}>
                <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  mb: 2 }}>
                  <Box sx={{ 
                    bgcolor: "#e8f5e9", 
                    borderRadius: "50%", 
                    width: 40, 
                    height: 40, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    mr: 2
                  }}>
                    <LocationOnIcon sx={{ color: "#4caf50" }} />
                  </Box>
                  <Typography variant="h6" className={`${styles.poppins} ${styles.bold}`}>
                    TEXT
                  </Typography>
                </Box>
                <Typography variant="body1" className={styles.poppins} sx={{ mb: 1 }}>
                  TEXT
                </Typography>
                <Typography variant="body2" className={styles.poppins} sx={{ color: "#666", mb: 4 }}>
                  TEXT
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ 
                    bgcolor: "#e8f5e9", 
                    borderRadius: "50%", 
                    width: 40, 
                    height: 40, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    mr: 2
                  }}>
                    <PhoneIcon sx={{ color: "#4caf50" }} />
                  </Box>
                  <Typography variant="h6" className={`${styles.poppins} ${styles.bold}`}>
                    Contact Info
                  </Typography>
                </Box>
                <Typography variant="body1" className={styles.poppins} sx={{ mb: 1 }}>
                  09054054286
                </Typography>
                <Typography variant="body2" className={styles.poppins} sx={{ color: "#666" }}>
                  help@sagipapp.com
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                borderRadius: 5, 
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                  </Box>
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