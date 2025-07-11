import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Divider } from '@mui/material';
import google from '../assests/google.png';
import CustomButton from '../shared/Custom-Button';
import FormSidebox from '../shared/Form-Sidebox';
import Texfield from '../shared/Custom-TextField';
import { regUser, onboarding, signInWithGoogle, registerOrLoginWithGoogle } from '../services/api';
import '../styles/signup.css';
import { Alert } from 'antd';
import 'antd/dist/reset.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData, resetSignupData } from '../store/signupSlice';
import { logout } from '../store/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';


const Signup = () => {
  const signupData = useSelector((state) => state.signup.signupData || {});
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    company: '',
    location: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const fromOnboard = location.state?.fromOnboard;
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', 
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  useEffect(() => {
    setForm({ ...form, ...signupData });
  }, [signupData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    dispatch(setSignupData({ ...signupData, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhoneChange = (phone) => {
    setForm(prev => ({ ...prev, phone }));
    setErrors(prev => ({ ...prev, phone: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = 'First name is required';
    if (!isGoogleSignup && !form.lastname) newErrors.lastname = 'Last name is required';
    if (!form.company) newErrors.company = 'Company is required';
    if (!form.location) newErrors.location = 'Location is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.phone) newErrors.phone = 'Phone number is required';
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length !== 8) {
      newErrors.password = 'Password must be exactly 8 characters';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else if (form.confirmPassword.length !== 8) {
      newErrors.confirmPassword = 'Password must be exactly 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setHasSubmitted(true); 
    try {
      const payload = {
        ...form,
        location: Array.isArray(form.location)
          ? form.location
          : form.location
          ? [form.location]
          : [],
      };
      const response = await regUser(payload);
      dispatch(setSignupData(payload));
      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate('/onboard');
      }, 2000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Something went wrong!',
        severity: 'error',
      });
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        location: Array.isArray(form.location)
          ? form.location
          : form.location
          ? [form.location]
          : [],
      };
      await onboarding(payload);
      dispatch(setSignupData(payload));
      setLoading(false);
      navigate('/onboard');
    } catch (err) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update info!',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogout = () => {
    dispatch(logout());
    // dispatch(resetSignupData());
    navigate('/');
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
      {/* <Box sx={{ position: 'absolute', top: 16, right: 24, zIndex: 10 }}>
        <IconButton color="primary" onClick={handleLogout} title="Logout">
          <LogoutIcon />
        </IconButton>
      </Box> */}
      <Grid container className="signup-container" spacing={0}>
        <Grid item xs={12} sm={4} md={4} lg={4} className="signup-sidebox">
          <FormSidebox text="Your Cor Experience Starts Here" />
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8} className="signup-form">
          <Box className="signup-form-box hide-scrollbar" sx={{
            width: { xs: '90%', sm: '80%', md: '600px', lg: '650px' },
            marginLeft: { xs: 0, sm: 0, md: 'auto', lg: '195px' },
          }}>

            <form onSubmit={handleSubmit}>
              <Button
                variant="outlined"
                className="google-btn"
                startIcon={<img src={google} alt="Google Logo" className="google-icon" />}
                onClick={async () => {
                  try {
                    const user = await signInWithGoogle();
                    const backendUser = await registerOrLoginWithGoogle(user);

                    setForm(prev => ({
                      ...prev,
                      ...backendUser.user
                    }));

                    setIsGoogleSignup(true);

                    setSnackbar({
                      open: true,
                      message: 'Google sign-up successful!',
                      severity: 'success',
                    });
                    setTimeout(() => {
                      navigate('/onboard');
                    }, 2000);
                  } catch (err) {
                    setSnackbar({
                      open: true,
                      message: err.message || 'Google sign-up failed!',
                      severity: 'error',
                    });
                  }
                }}
              >
                Sign-up with Google
              </Button>

              <Divider className="signup-divider" textAlign="center">
                or
              </Divider>

              <Box className="input-pair">
                <Texfield
                  textcontent="First Name"
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />
                <Texfield
                  textcontent="Last Name"
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />
              </Box>

              <Box className="input-pair">
                <Texfield
                  textcontent="Company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeHolder={'Company name here'}
                  error={!!errors.company}
                  helperText={errors.company}
                />
                <Texfield
                  className="location"
                  textcontent="Location"
                  placeHolder={'Select Location'}
                  type="text"
                  select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  options={['Kolhapur', 'Pune', 'Mumbai', 'Delhi', 'Chennai']}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Box>

              <Box className="input-pair">
                <Box style={{ width: '100%' }}>
                  <Texfield
                    textcontent="Email Address"
                    type="email"
                    name="email"
                    value={form.email || ''}
                    onChange={handleChange}
                    placeHolder={'name@gmail.com'}
                    error={!!errors.email}
                    helperText={errors.email || emailError}
                  />
                </Box>
                <Texfield
                  textcontent="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeHolder={'+91 0000000000'}
                  phone={true}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Box>

              <Box className="input-pair ">
                <Texfield
                  textcontent="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={e => {
                    handleChange(e);
                    if (e.target.value.length !== 8) {
                      setPasswordError('Password must be exactly 8 characters');
                    } else {
                      setPasswordError('');
                    }
                    if (form.confirmPassword && e.target.value === form.confirmPassword) {
                      setConfirmPasswordError('');
                    }
                  }}
                  placeHolder={'Must be 8 characters'}
                  error={!!errors.password || !!passwordError}
                  helperText={errors.password || passwordError}
                  inputProps={{ maxLength: 8 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                          tabIndex={-1}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box style={{ width: '100%' }}>
                  <Texfield
                    textcontent="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={e => {
                      handleChange(e);
                      if (form.password && e.target.value !== form.password) {
                        setConfirmPasswordError('Passwords do not match');
                      } else {
                        setConfirmPasswordError('');
                      }
                    }}
                    placeHolder={'Must be 8 characters'}
                    error={!!errors.confirmPassword || !!confirmPasswordError}
                    helperText={errors.confirmPassword || confirmPasswordError}
                    inputProps={{ maxLength: 8 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword((show) => !show)}
                            edge="end"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>

              <Box className="signup-btn-box" style={{ display: 'flex', gap: 16 }}>
                <CustomButton
                  text="Get Started"
                  sx={{ width: 180, height: 40, color: 'white' }}
                  type="submit"
                  disabled={!!fromOnboard || loading || !!passwordError}
                  onClick={handleSubmit}
                  className="signup-btn"
                />
                {fromOnboard && (
                  <CustomButton
                    text={loading ? 'Saving...' : 'Next'}
                    sx={{ width: 100, height: 40, color: 'white', background: 'linear-gradient(to right, #5A78F2, #000000)' }}
                    onClick={handleNext}
                    className="next-btn"
                    disabled={loading}
                  />
                )}
              </Box>
            </form>

            {success && (
              <Alert
                message="Registration Successful!"
                description="You have registered successfully."
                type="success"
                showIcon
                closable
                onClose={() => setSuccess(false)}
                style={{ marginBottom: 16 }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
