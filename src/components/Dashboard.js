import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import useStyles from './Styles';
import axios from 'axios';
import Logo from './Logo';

const Dashboard = ({ onLogout }) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          onLogout();
          return;
        }

        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        if (err.response?.status === 401) {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onLogout]);

  const handleLogout = () => {
    onLogout();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={Logo} alt="Logo" style={{ height: 40 }} />
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" className={classes.poppins} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" className={classes.poppins} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" className={classes.poppins} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" className={classes.poppins} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" className={classes.poppins} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" className={classes.green}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.poppins}>
            Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: '#136e2c' }}>
            {user ? user.firstName?.charAt(0) : 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {loading ? (
          <Typography variant="h6" className={classes.poppins}>Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error" className={classes.poppins}>{error}</Typography>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" className={classes.poppins} gutterBottom>
                Welcome, {user?.firstName || 'User'}!
              </Typography>
              <Typography variant="body1" color="textSecondary" className={classes.poppins}>
                Here's what's happening with your account today.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={`${classes.card} ${classes.cardhover}`}>
                  <CardContent>
                    <Typography variant="h6" className={classes.poppins} gutterBottom>
                      Account Balance
                    </Typography>
                    <Typography variant="h4" className={`${classes.poppins} ${classes.bold}`}>
                      $12,347.23
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.poppins}>
                      Updated 5 minutes ago
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={`${classes.card} ${classes.cardhover}`}>
                  <CardContent>
                    <Typography variant="h6" className={classes.poppins} gutterBottom>
                      Primary Card
                    </Typography>
                    <Typography variant="h4" className={`${classes.poppins} ${classes.bold}`}>
                      $2,546.64
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.poppins}>
                      VISA **** 6917
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={`${classes.card} ${classes.cardhover}`}>
                  <CardContent>
                    <Typography variant="h6" className={classes.poppins} gutterBottom>
                      Recent Activity
                    </Typography>
                    <Typography variant="body1" className={classes.poppins}>
                      5 new transactions
                    </Typography>
                    <Button 
                      size="small" 
                      color="primary" 
                      className={classes.poppins}
                      sx={{ mt: 1 }}
                    >
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>

      <Box component="footer" sx={{ p: 2, bgcolor: '#f5f5f5', mt: 'auto' }}>
        <Typography variant="body2" color="textSecondary" align="center" className={classes.poppins}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
