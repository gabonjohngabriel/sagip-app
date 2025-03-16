import { React } from "react";
import { Box, Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, Fade } from "@mui/material";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import BackgroundPage from "./styles/BackgroundPage";
import { useAuthStore } from "./store/useAuthStore";

export default function ChooseMenu() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const menuItems = [
    {
      title: "MAP",
      description: "Locate nearby healthcare facilities",
      image: "./images/map.png",
      route: "/choose/map",
    },
    {
      title: "E-PHARMACY",
      description: "Order medicines from pharmaceutical companies directly",
      image: "./images/appointment.png",
      route: "/choose/pharmacy",
    },
    {
      title: "HEALTH PROFESSIONALS",
      description: "Meet the healthcare aide",
      image: "./images/medical-team.png",
      route: "/choose/healthprofessionals",
    },
    {
      title: "APPOINTMENT",
      description: "Book medical schedule with your respective hospitals or clinics",
      image: "./images/medical-appointment.png",
      route: "/choose/appointment",
    },
    {
      title: "E-PAYMENT",
      description: "Pay for your medical bills online and dashboard for hospitals",
      image: "./images/credit-card.png",
      route: "/choose/epayment",
    },
    {
      title: authUser ? "CHAT" : "LOGIN",
      description: authUser ? "Start communicate with your health professionals" : "Login to start communicate with your health professionals",
      image: authUser ? "./images/chat.png" : "./images/user.png",
      route: authUser ? "/choose/chat" : "/choose/login",
    },
  ];

  return (
    <Box 
    className={`${styles.root} ${styles.backgroundGreenTheme} ${styles.center2}`}
    sx={{ 
      minHeight: "100vh", 
    bgcolor: "#208a3c" }}>
      <Fade in={true} timeout={1500}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Logo large />
            <Typography 
            variant="h2" 
            className={`${styles.poppins} ${styles.white} ${styles.bold}`} 
            sx={{ mt: 2, color: "#333" }}>
              SAGIP
            </Typography>
            <Typography 
            variant="h5" 
            className={`${styles.poppins} ${styles.white}`} 
            sx={{ 
              mt: 1, 
              color: "#666", 
              maxWidth: "800px", 
              mx: "auto",
              lineHeight: "30px",
              }}>
              Access all your healthcare needs in this haven with our comprehensive medical services.
            </Typography>
          </Box>

          <Grid 
          container spacing={4} justifyContent="center">
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    borderRadius: 4, 
                    overflow: "hidden", 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
                    },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <CardActionArea 
                    onClick={() => navigate(item.route)}
                    sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center",
                      height: "100%",
                      p: 2
                    }}
                  >
                    <Box sx={{ 
                      width: 120, 
                      height: 120, 
                      bgcolor: "#f0f7ff", 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      mb: 2
                    }}>
                      <CardMedia
                        component="img"
                        alt={item.title}
                        image={item.image}
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        className={`${styles.poppins} ${styles.bold}`}
                        sx={{ color: "#333", mb: 1, lineHeight: "25px" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        className={styles.poppins}
                        sx={{ 
                          mb: 2, 
                          lineHeight: "18px"
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography 
                          variant="body2" 
                          className={styles.poppins}
                          sx={{ color: "#777" }}
                        >
                          SAGIP APP
                        </Typography>
                        <Box 
                          sx={{ 
                            bgcolor: "#4caf50", 
                            width: 28, 
                            height: 28, 
                            borderRadius: "50%", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "1.2rem",
                            fontWeight: "bold"
                          }}
                        >
                          +
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
}