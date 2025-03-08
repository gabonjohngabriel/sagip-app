import React from 'react'
import {Box, CardActionArea, Card, Typography} from '@material-ui/core'
import TouchApp from '@material-ui/icons/TouchApp';
import useStyles from './styles';
import Logo from './Logo';

// HOME SCREEN
function Menu() {
  const classes = useStyles();
return (
  <Card>
    <CardActionArea>
      <Box className={[styles.root, styles.red]}>
        <Box className={[styles.main, styles.center]}>
          <Typography component="h6" variant="h6">
            Fast and Easy
          </Typography>
          <Typography component="h1" variant="h1">
            Order <br /> Pay <br /> Here
          </Typography>
          <TouchApp fontSize="large"> </TouchApp>
        </Box>
        <Box className={[styles.center, styles.green]}>
        <Logo> </Logo>
        </Box>
      </Box>
    </CardActionArea>
  </Card>
)
}

export default Menu;
