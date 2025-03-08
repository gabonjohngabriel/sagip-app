import { Box } from "@mui/material";
import React from "react";
import { useStyles } from "./Styles";

export default function AppointmentScreen() {
  const styles = useStyles();
  return [
    <Box className={styles.root}>
      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              <ListItem>
                <Avatar src="http://localhost:3000"></Avatar>
                <Typography
                className={`${styles.poppins} ${styles.bold} ${styles.center}`}>
                    Dr. Marc Graven Cortez, <br/>
                    Ph.D in Cottonology
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={10}>
            Doctors
          </Grid>
        </Grid>
      </Box>
    </Box>,
  ];
}