import { Box, useMediaQuery } from "@mui/material";
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
    const isMobile = useMediaQuery('(max-width:500px)');

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
            {!isMobile && (
                <Box sx={{ flexShrink: 0 }}>
                    <LeftPanel />
                </Box>
            )}
            <Box
                sx={{
                    width: isMobile ? '100%' : '84%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: isMobile ? '100%' : '94%', height: '80px', mb: '40px', ml: isMobile ? 0 : '30px' }}>
                    <Header />
                </Box>

                <Box
                    sx={{
                        width: isMobile ? '100%' : '96.5%',
                        height: '110%',
                        ml: isMobile ? 0 : '20px',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '880px',
                            height: '100%',
                            ml: isMobile ? 0 : '45px',
                        }}
                        className="AppArea"
                    >
                        <AppArea />
                    </Box>      
                    <Box className="rightwidget"
                        sx={{
                            width: isMobile ? '100%' : '280px',
                            height: '100%',
                            ml: isMobile ? 0 : '-83px',
                        }}
                    >
                        <Rightwidget email={email} initialProgress={onboardingProgress} />
                    </Box>
                </Box>
            </Box>
            {isMobile && <LeftPanel />}
        </Box>
    );
};

export default Layout;
