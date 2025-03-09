import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useStyles from './Styles';
import axios from 'axios';
import Logo from './Logo';
import SagipLogoAnimation from "./SagipLogoAnimation";

const SignupPage = ({ onSignup }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = ['Account Information', 'Personal Details'];

  const validateStep1 = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!firstName) {
      setError('First name is required');
      return false;
    }
    if (!lastName) {
      setError('Last name is required');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (activeStep === 0) {
      if (validateStep1()) {
        setActiveStep(1);
      }
    } else if (activeStep === 1) {
      if (validateStep2()) {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // CALL API
      const response = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        email,
        password
      });

      if (response.data.token) {
        onSignup(response.data.token);
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={`${styles.root}`} sx={{ backgroundColor: '#f5f5f5', overflow: 'hidden' }}>

      <Container className={`${styles.main}`} component="main" maxWidth="sm">
        <Paper className={styles.green} elevation={3} sx={{ p: 4, borderRadius: 2, position: 'relative', zIndex: 1, backdropFilter: 'blur(5px)', background: 'rgba(67, 160, 71, 0.85)' }}>
          <Box className={styles.center} sx={{ mb: 4 }}>
            <Logo/>
            <Typography 
              sx={{ letterSpacing: -1 }}
              variant="h4" 
              component="h1" 
              className={`${styles.bold} ${styles.poppins}`}
            >
              GET STARTED
            </Typography>
            <Typography 
              variant="body2" 
              className={styles.poppins} 
              color="rgb(255, 255, 255)"
            >
              Create your account to continue
            </Typography>
          </Box>

          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 1,
              '& .MuiStepLabel-label': { 
                color: 'rgba(255, 255, 255, 0.7)',
                [`&.${styles.poppins}`]: true,
              },
              '& .MuiStepLabel-label.Mui-active': { 
                color: 'white',
              },
              '& .MuiStepIcon-root': { 
                color: 'rgba(255, 255, 255, 0.5)',
              },
              '& .MuiStepIcon-root.Mui-active': { 
                color: 'white',
              },
              '& .MuiStepIcon-root.Mui-completed': { 
                color: "rgba(255, 255, 255, 1)",
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className={`${styles.poppins} ${styles.white}`}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 1 }}>
            {activeStep === 0 ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                  InputLabelProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    className: `${styles.poppins} ${styles.white}`,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#ffffff95' }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                  InputLabelProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                  InputLabelProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                  InputLabelProps={{
                    className: `${styles.poppins} ${styles.white}`,
                  }}
                />
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={`${styles.poppins} ${styles.white}`}
                sx={{ color: 'white' }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                className={`${styles.whitebg} ${styles.poppins}`}
                disabled={loading}
              >
                {activeStep === steps.length - 1 ? (loading ? 'Creating Account...' : 'Sign Up') : 'Next'}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="textSecondary" className={styles.poppins}>
                OR
              </Typography>
            </Divider>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" className={styles.poppins}>
                  Already have an account?{' '}
                  <Link to="/choose/login" className={`${styles.poppins} ${styles.noUnderline}`}>
                    <Typography component="span" variant="body2" color="primary" className={`${styles.poppins} ${styles.white} ${styles.bold}`}>
                      Log In
                    </Typography>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;