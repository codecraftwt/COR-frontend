import React, { useState } from 'react';
import { Grid, Box, Typography, IconButton, Button } from '@mui/material';
import FormSidebox from '../shared/Form-Sidebox';
import Textfield from '../shared/Custom-TextField';
import CustomButton from '../shared/Custom-Button';
import leftarrow from '../assests/leftarrow.png';
import { useNavigate } from 'react-router-dom';
import '../styles/reset.css';
import { requestPasswordReset } from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ResetPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleReset = async () => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await requestPasswordReset(email);
            setSnackbar({ open: true, message: 'Reset link has been sent.', severity: 'success' });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message === 'User does not exist') {
                setSnackbar({ open: true, message: 'Email address is not registered.', severity: 'error' });
            } else {
                setSnackbar({ open: true, message: 'Failed to send reset link. Please try again later.', severity: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={0} className="forget-container">
            <Grid item lg={4} xs={12} sm={4} md={5} className="reset-sidebox" sx={{ height: '100vh' }}>
                <FormSidebox text="Sign in to Your COR account" />
            </Grid>

            <Grid item xs={12} sm={8} md={7} lg={8} className="reset-contents" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                <Box>
                    <Box className="heading-box">
                        <Typography variant="h4" className="reset-heading" gutterBottom sx={{ fontWeight: 600, fontSize: '24px' }}>
                            Reset Your Password
                        </Typography>
                    </Box>

                    <Box className="subtext-box">
                        <Typography variant="subtitle1" className="forget-subtext" sx={{ fontSize: '15px', color: '#878787', width: '453px' }}>
                            Enter the email address with your account and we'll send an email with confirmation to reset your password.
                        </Typography>
                    </Box>

                    <Box className="input-field">
                        <Textfield textcontent='Email Address' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </Box>

                    {message && (
                        <Typography color="primary" sx={{ mt: 1 }}>{message}</Typography>
                    )}
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>
                    )}

                    <Box className="reset-button-box">
                        <CustomButton className="reset-button" text={loading ? "Sending..." : "Reset Password"} onClick={handleReset} disabled={loading || !email} sx={{ fontSize: 20, fontWeight: 500 }} />
                    </Box>

                    <Box className="back-to-signin" sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: 2 }}>
                        <IconButton onClick={() => navigate('/')} sx={{ width: '24px', height: '24px', padding: 0 }}>
                            <img src={leftarrow} alt="Back" className="back-img" style={{ width: '100%', height: '100%' }} />
                        </IconButton>
                        <Typography variant="body2" className="back-text" sx={{ fontSize: '15px', color: '#878787',fontWeight:600 }}>
                            Back to
                        </Typography>
                        <Button onClick={() => navigate('/')} className="signin-button" sx={{ textTransform: 'none', minWidth: 0, padding: 0,fontWeight:700 }}>
                            Sign in
                        </Button>
                    </Box>
                </Box>
            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
};

export default ResetPass;
