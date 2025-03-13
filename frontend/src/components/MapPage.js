import React, { useEffect, useState, useRef } from "react";
import { CardContent, Typography, Box, Card, Fade } from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import Leaflet Routing Machine CSS
import "leaflet-providers";
import "leaflet-routing-machine";
import "./Map.css";
import MapComponent from "./MapComponent";
import SagipLogoAnimation from "./SagipLogoAnimation";

let mapRef;

const ChooseMap = () => {
  const styles = useStyles();
  const [showPage, setShowPage] = useState(false);
  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <Box
      className={`${styles.root} ${styles.green}`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Fade in={true} timeout={1000}>
        <Box
          className={`${styles.root} ${styles.center}`}
          sx={{ textAlign: "center" }}
        >
          <Logo large />
          <Typography
            variant="h6"
            component="h6"
            className={`${styles.poppins} ${styles.center}`}
          >
            SAGIP APP
          </Typography>

          <Box
            className={`${styles.cards} ${styles.textContainer} ${styles.space} ${styles.maphover}`}
          >
            <Card
              className={`${styles.card} ${styles.space}`}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "80%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "300px",
                  maxHeight: "80vh",
                }}
              >
                <MapComponent className={`${styles.mapContent}`} />
              </Box>
            </Card>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default ChooseMap;
