import { React, useMemo } from "react";
import {
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Card,
  CardMedia,
  Fade,
  Grid,
  Container,
} from "@mui/material";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import { useAuthStore } from "./store/useAuthStore";

export default function ChooseMenu(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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
    {
      title: authUser ? "CHAT" : "ACCOUNT",
      image: authUser ? "./images/chat.png" : "./images/user.png",
      route: authUser ? "/choose/chat" : "/choose/login",
    },
  ];

  return (
    <Box
      className={`${styles.root} ${styles.cardsContainer} ${styles.green}`}
      sx={{ minHeight: "100vh" }}
    >
      <Fade in={true} timeout={1500}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box className={`${styles.main}`} sx={{ textAlign: "center" }}>
            <Logo large />
            <Typography
              variant="h6"
              component="h6"
              className={`${styles.poppins}`}
              marginBottom={1}
            >
              SAGIP APP
            </Typography>
            <Typography
              variant="h3"
              className={`${styles.poppins} ${styles.bold}`}
              sx={{ mb: 4 }}
            >
              MENU
            </Typography>

            <Grid
              className={` ${styles.cardsContainer} `}
              container
              spacing={3}
              justifyContent="center"
            >
              {menuItems.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={2.4}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    className={` ${styles.card} ${styles.cardhover}`}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "160px", sm: "180px", md: "220px" },
                      height: { xs: "220px", sm: "260px", md: "300px" },
                      display: "flex",
                      flexDirection: "column",
                      transition: "filter 0.3s ease, opacity 0.3s ease",
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(item.route)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        p: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={item.title}
                        image={item.image}
                        sx={{
                          height: { xs: "120px", sm: "160px", md: "200px" },
                          objectFit: "contain",
                          p: 1,
                        }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: { xs: 1, sm: 2 },
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="p"
                          color="textPrimary"
                          className={`${styles.poppins} ${styles.textSpacing} ${styles.bold}`}
                          sx={{
                            fontSize: {
                              xs: "0.75rem",
                              sm: "0.9rem",
                              md: "1.25rem",
                            },
                            hyphens: "auto",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
}
