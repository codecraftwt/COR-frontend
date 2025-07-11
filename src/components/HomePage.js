import { Box } from "@mui/material";
import React from "react";
import LeftPanel from './LeftPanel';
import Header from "./Home-header";
import AppArea from "./AppArea";
import Rightwidget from "./Rightwidget";
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';

import { createTheme } from '@mui/material/styles';
import '../styles/homepage.css';

const Layout = () => {
const signupData = useSelector((state) => state.signup.signupData);
console.log("Redux signupData:", signupData);
const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const email = user?.email || signupData.email;
    const onboardingProgress = user?.onboardingProgress ?? signupData.onboardingProgress;
    console.log('HomePage email:', email);
    const theme = createTheme({
        breakpoints: {
            values: {
                sm: 470,
            },
        },
    });

    return (
       
        <Box
            sx={{
                width: "100%",
                top: 0,
                display: "flex",
                overflow: 'hidden',
                background: 'linear-gradient(to right, rgb(247, 247, 248), rgb(224, 224, 225))'
            }}
        >
            <Box
                sx={{
                    width: 280,
                    height: '100%',
                    '@media (max-width:1020px)': { width: 0 },
                    '@media (max-width:460px)': { width: '100%' }
                }}
            >
                <LeftPanel />
            </Box>

            <Box
                sx={{
                    width: '84%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: '94%', height: '80px', mb: '40px', ml: '30px' }}>
                    <Header />
                </Box>

                <Box
                    sx={{
                        width: '96.5%',
                        height: '110%',
                        ml: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        // gap: '43px',
                        [theme.breakpoints.down('sm')]: { 
                            flexDirection: 'column',
                        },
                        '@media (max-width:460px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '880px',
                            height: '100%',
                            ml: '45px',
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                                height: 'auto',
                                ml: 0,
                            },
                            '@media (max-width:460px)': {
                                width: '100%',
                                ml: 0,
                            },
                        }}
                        className="AppArea"
                    >
                        <AppArea />
                    </Box>      
                    <Box className="rightwidget"
                        sx={{
                            width: '280px',
                            height: '100%',
                            ml: '-83px',
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                                height: 'auto',
                                ml: '0',
                            },
                            '@media (max-width:460px)': {
                                width: '100%',
                                ml: 0,
                            },
                        }}
                    >
                        <Rightwidget email={email} initialProgress={onboardingProgress} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
