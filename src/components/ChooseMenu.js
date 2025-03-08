import React from "react";
import {
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Card,
  CardMedia,
  Fade,
} from "@mui/material";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";

export default function ChooseMenu(props) {
  const styles = useStyles();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "MAP",
      image: "./images/map.png",
      route: "/choose/map",
    },
    {
      title: "E-PHARMACY",
      image: "./images/appointment.png",
      route: "/choose/pharmacy",
    },
    {
      title: "HEALTH PROFESSIONALS",
      image: "./images/medical-team.png",
      route: "/choose/healthprofessionals",
    },
    {
      title: "APPOINTMENT",
      image: "./images/medical-appointment.png",
      route: "/choose/appointment",
    },
    {
      title: "E-PAYMENT",
      image: "./images/credit-card.png",
      route: "/choose/epayment",
    },
  ];

  return (
    <Fade in={true} timeout={1500}>
      <Box className={`${styles.root} ${styles.green}`}>
        <Box className={`${styles.main} ${styles.center}`}>
          <Logo large />
          <Typography
            variant="h6"
            component="h6"
            className={`${styles.poppins} ${styles.center}`}
            marginBottom={1}
          >
            SAGIP APP
          </Typography>
          <Typography
            variant="h3"
            className={`${styles.poppins} ${styles.center} ${styles.bold}`}
            sx={{ mb: 3 }}
          >
            MENU
          </Typography>
          <Box className={`${styles.cards} ${styles.cardblur1} ${styles.center2}`}>
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className={`${styles.card} ${styles.cardhover} ${styles.space}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%", 
                  maxWidth: "250px",
                  minWidth: "180px", 
                  height: "300px", 
                  "@media (max-width: 600px)": {
                    maxWidth: "150px", 
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(item.route)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    image={item.image}
                    sx={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="p"
                      color="textPrimary"
                      sx={{
                        wordWrap: "break-word",
                      }}
                      className={`${styles.poppins} ${styles.textSpacing}  ${styles.bold} ${styles.center}`}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
