import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  // MAIN
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "hidden",  
    "@media (max-width: 768px)": {
      padding: "10px",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1600px",
    minHeight: "90vh",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  
  main2: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "11.5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  main3: {
    maxHeight: "1000px",
    overflowY: "auto",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  largeLogo: {
    height: 50,
  },
  spacing: {
    lineHeight: "0.95em !important",
    padding: "2px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
  },
  center2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    boxSizing: "border-box",
    width: "100%",
  },
  poppins: {
    fontFamily: "Poppins, sans-serif !important",
  },
  bold: {
    fontWeight: "bold !important",
  },
  italic: {
    fontStyle: "italic !important",
  },
  green: {
    backgroundColor: "#208a3c !important",
    color: "white !important",
  },
  darkgreen: {
    backgroundColor: "#136e2c !important",
  },
  greenBorder: {
    borderColor: "#136e2c !important",
  },
  greenText: {
    color: "#136e2c !important",
  },
  white: {
    color: "#ffffff",
  },
  whitebg: {
    backgroundColor: "#ffffff !important",
  },
  black: {
    color: "#000000",
  },
  occupy_space: {
    bgcolor: "green",
    minHeight: "100vh",
    width: "800px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  // CARDS
  card: {
    margin: "4px",
    transition: "filter 0.3s ease, opacity 0.3s ease", 
    opacity: "1",
    "&:hover": {
      filter: "blur(0)", 
      opacity: 1,
    },
  },
  cardhover: {
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      zIndex: 1,
      backgroundColor: "#fffff0",
      transition:
        "opacity 1s ease-in-out, transform 0.5s ease-in-out, filter 0.5s ease-in-out",
    },
    "&:not(:hover)": {
      opacity: 1,
      filter: "blur(0px)",
      transform: "scale(1)",
      transition:
        "opacity 1s ease-in-out, transform 0.5s ease-in-out, filter 0.5s ease-in-out",
    },
  },
  cardsize1: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardsContainer: {
    maxHeight: "1000px",
    overflowY: "auto",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&:hover $card:not(:hover)": {
      filter: "blur(2px)",
      opacity: 0.5,
    },
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  space: {
    padding: 10.5,
  },
  media: {
    width: "100px",
    maxHeight: "180px",
    objectFit: "cover",
    display: "block",
    margin: "0 auto",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
    transform: "scale(1) !important", // Prevent text from scaling
  },
  mapContainer: {
    width: "100%",
    minHeight: "300px", 
    height: "75vh",
    overflow: "hidden",
  },
  mapContent: {
    width: "100%",
    height: "75vh",
    minHeight: "300px", 
    padding: "10px",
    borderRadius: "8px",
    "@media (max-width: 500px)": {
      height: "50vh",
    },
  },
    textSpacing: {
    lineHeight: "20px !important",
  },
  width: {
    width: "100% !important",
    height: "100% !important",
  },
  // APPOINTMENT
  wrapper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  appointmentForm: {
    width: "100%",
    height: "100%",
    background: "white",
    padding: theme.spacing(3),
  },
  header: {
    color: "#333",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  logo: {
    flex: 1,
  },
  logoImg: {
    width: "120px",
    height: "120px",
    float: "left",
  },
  sectionHeader: {
    width: "100%",
    textAlign: "left",
    background: "mediumseagreen",
    padding: "5px 15px",
    color: "white",
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  formSection: {
    marginBottom: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

export default useStyles;
