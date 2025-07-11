import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Paper, TextField, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';

import "../styles/Rightwidget.css";

const Rightwidget = ({ email, initialProgress }) => {
    const navigate = useNavigate();
    const signupData = useSelector((state) => state.signup.signupData);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(initialProgress || signupData.onboardingProgress || 0);

    useEffect(() => {
        if (email) {
            getUserByEmail(email)
                .then(res => {
                    const backendProgress = res.data.onboardingProgress || 0;
                    setProgress(backendProgress);
                    if (backendProgress !== signupData.onboardingProgress) {
                        dispatch(setSignupData({ ...signupData, onboardingProgress: backendProgress }));
                    }
                })
                .catch(() => setProgress(0));
        } else {
            setProgress(0);
        }
    }, [email]);

    return (
        <Box className='rightwidget'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 300,
                height: 565,
            }}
        >
            <Paper
                elevation={2}
                className='paper-style-1'
                sx={{
                    color: '#0C3944',
                    background: 'linear-gradient(to right,rgb(247, 247, 248),rgb(128, 172, 255))',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    borderRadius: '25px',
                    boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.1)',
                    height: 220,
                    width: "280px"
                }}
            >
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress
                        variant='determinate'
                        value={progress}
                        size={75}
                        thickness={4}
                        sx={{
                            color: '#0C3944',
                            ml: 9.5,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            ml: 9.5,
                        }}
                    >
                        <Typography variant="h7" color="text.primary" fontWeight={700} fontSize={20}>
                            {progress}%
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="subtitle1" ml={4.9} mt={0.5} fontSize={16} fontWeight={600} textAlign="center">
                    Complete your
                </Typography>
                <Typography variant="h5" fontWeight={700} ml={4.2} fontSize={30} textAlign="center">
                    Onboarding
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        bgcolor: 'white',
                        color: '#0C3944',
                        borderRadius: '25px',
                        mt: 0.8,
                        ml: 6.5,
                        fontSize: 13,
                        fontWeight: 500,
                        '&:hover': {
                            bgcolor: '#f5f5f5',
                        },
                    }}
                    onClick={() => navigate('/onboard')}
                >
                    Complete Now
                </Button>
            </Paper>

            <Paper
                elevation={2}
                className='paper-style-2'
                sx={{
                    mt: 0,
                    mr: 0.5,
                    width: { xs: '100%', sm:'280px'},
                    bgcolor: '#ffffff',
                    padding: 2,
                    borderRadius: '25px',
                    height: 450,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="subtitle1" color="#506368" sx={{ mb: -2  , fontSize:14}}>
                    Hello, Mohammad
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 0, lineHeight: 1.2 }}>
                    How can I help <br></br>you today?
                </Typography>

                <Box sx={{ position: 'relative', width: '100%' }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        sx={{ mt: 0 }}
                        placeholder="Ask or search for anything"
                    />
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            color: '#0C3944',
                        }}
                    >
                        <ArrowUpwardIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default Rightwidget;
