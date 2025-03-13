import React, { useEffect, useRef } from "react";
import { CardContent, Typography, Box, Card, Fade } from "@mui/material";
import Logo from "./Logo";
import useStyles from "./Styles";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import Leaflet Routing Machine CSS
import "leaflet-providers";
import "leaflet-routing-machine";
import "./Map.css"; // Import custom Map CSS
import MapComponent from "./MapComponent"; // Import the MapComponent

let mapRef;

const ChooseMap = () => {
  const styles = useStyles();

  return (
      <Box className={`${styles.root} ${styles.green}`}>
            <Fade in={true} timeout={1000}>

        <Box className={`${styles.main} ${styles.center} `}>
          <Logo large />
          <Typography
            variant="h6"
            component="h6"
            className={`${styles.poppins} ${styles.center}`}
          >
            SAGIP APP
          </Typography>

          <Box className={`${styles.cards} ${styles.textContainer} ${styles.space} ${styles.maphover}`}>
            <Card className={`${styles.card} ${styles.space} `}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="p"
                  color="textPrimary"
                  className={`${styles.poppins} ${styles.bold} ${styles.center}`}
                >
                  MAP
                </Typography>
              </CardContent>
              <Box className={`${styles.mapContainer}`}>
              <MapComponent className={`${styles.mapContent}`}/>
              </Box>
            </Card>
          </Box>
        </Box>
        </Fade>

      </Box>
  );
};

export default ChooseMap;
