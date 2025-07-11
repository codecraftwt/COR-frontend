import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Divider, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import google from '../assests/google.png';
import CustomButton from '../shared/Custom-Button';
import FormSidebox from '../shared/Form-Sidebox';
import Textfield from '../shared/Custom-TextField';
import '../styles/Signin.css';
import { loginUser, getUserByEmail, signInWithGoogle, registerOrLoginWithGoogle } from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { login as loginAction } from '../store/userSlice';


const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
   const signupData = useSelector((state) => state.signup);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    };

    const handlelogin = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            const response = await loginUser(formData);
            const userRes = await getUserByEmail(formData.email);
            dispatch(setSignupData(userRes.data));
            dispatch(loginAction({
                name: userRes.data.name,
                email: userRes.data.email,
            }));
            setSnackbar({
                open: true,
                message: 'Login successful!',
                severity: 'success',
            });
           setTimeout(() => {
            navigate('/home');
        }, 2000);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Something went wrong!',
                severity: 'error',
            });
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleGoogleSignIn = async () => {
        try {
            const firebaseUser = await signInWithGoogle();
            const backendResponse = await registerOrLoginWithGoogle(firebaseUser);
            dispatch(loginAction({
                name: backendResponse.user.name,
                email: backendResponse.user.email,
            }));
            setSnackbar({
                open: true,
                message: 'Google sign-in successful!',
                severity: 'success',
            });
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message || 'Google sign-in failed!',
                severity: 'error',
            });
        }
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
            <Grid container className="signin-container">
                <Grid item lg={4} sm={12} md={5} xs={12} className="signin-sidebox">
                    <FormSidebox text="Sign in to your COR account" />
                </Grid>

                <Grid item lg={8} sm={12} md={7} xs={12}  className="signin-form">
                    <Button
                        variant="outlined"
                        className="google-signin-btn"
                        startIcon={<img src={google} alt="Google Logo" className="google-logo" />}
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </Button>

                    <Divider className="divider" textAlign="center">
                        or
                    </Divider>

                    <Box className="input-field" sx={{ mb: 1 }}>
                        <Textfield 
                            textcontent={"Email Address"} 
                            type='email' 
                            className='field' 
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Box>

                    <Box className="password-box">
                        <Typography variant="subtitle1" className="input-label" sx={{ marginLeft: 1, fontWeight: 600 }}>
                            Password
                        </Typography>

                        <Button
                            size="small"
                            className="forgot-btn"
                            onClick={() => navigate('/reset-pass')}
                        >
                            Forgot Password?
                        </Button>
                    </Box>

                    <Box className="input-field" sx={{ mb: 1 }}>
                        <Textfield
                            type={showPassword ? 'text' : 'password'}
                            className='field'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password || ''}
                            inputProps={{
                                maxLength: 8
                            }}
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
                                style: {
                                    color: 'rgb(44, 43, 43)',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }
                            }}
                        />
                    </Box>
                    <Box className="signin-btn-wrapper">
                        <CustomButton text="Sign in" 
                            nav="/home"
                            onClick={handlelogin}
                            sx={{  fontWeight: 800, width: '160px', height: '50px' }} />
                    </Box>

                    <Box className="signup-box-wrapper"
                        sx={{
                            borderRadius: '30px',
                            padding: '3px',
                            background: 'linear-gradient(45deg,#5A78F2,rgb(0, 0, 0))',
                        }}
                    >
                        <Box
                            className="signup-box-content"
                            sx={{
                                borderRadius: '30px',
                                backgroundColor: 'white',
                                padding: '23px',
                            }}
                        >
                            <Typography className="signup-text" >
                                Don't have an account?
                                <Button
                                    className="signup-btn"
                                    onClick={() => navigate('/signup')}
                                    sx={{ fontSize: 20, fontWeight: 700 }}
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Signin;
