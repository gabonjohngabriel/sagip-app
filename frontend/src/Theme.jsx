import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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