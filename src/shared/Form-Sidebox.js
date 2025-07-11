import React from 'react';
import vector from '../assests/Vector.png';
import COR from '../assests/COR.png';
import { Box, Typography } from '@mui/material';
import Ellipse24 from '../assests/Ellipse 24.png';
import Ellipse25 from '../assests/Ellipse 25.png';
import Ellipse26 from '../assests/Ellipse 26.png';
const FormSidebox = ({ text, sx }) => {
    return (
        <>
            <Box
                sx={{
                    width: 473,
                    height: '100vh',
                    backgroundColor: '#EBF7F7',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '@media (max-width: 1200px)': {
                        width: 473,
                        height: '100vh',
                    },
                    '@media (max-width: 1024px)': {
                        width: 400,
                        height: '100vh',
                    },
                    '@media (max-width: 900px)': {
                        width: 300,
                        height: '100vh',
                    },
                    '@media (max-width: 600px)': {
                        width: 473,
                        height: '100vh',
                    },
                    '@media (max-width: 430px)': {
                        width: 0, height: '100vh',
                    },
                    ...sx
                }}
            >
                <Box
                    component="img"
                    src={Ellipse24}
                    alt="Circle 1"
                    sx={{
                        position: 'absolute',
                        top: 60,
                        left: 64,
                        width: 407,
                        height: 650,
                        opacity: 0.8,
                        zIndex: 1,
                    }}
                />

                <Box
                    component="img"
                    src={Ellipse25}
                    alt="Circle 2"
                    sx={{
                        position: 'absolute',
                        top: 150,
                        left: 170,
                        width: 300,
                        height: 550,
                        opacity: 0.7,
                        zIndex: 1,
                    }}
                />
                <Box
                    component="img"
                    src={Ellipse26}
                    alt="Circle 2"
                    sx={{
                        position: 'absolute',
                        top: 500,
                        left: 320,
                        width: 150,
                        height: 300,
                        opacity: 0.7,
                        zIndex: 1,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 40,
                        left: 20,
                        width: 90,
                        height: 40,
                    }}
                >
                    <img src={COR} alt="Logo" style={{ width: '100%', height: '100%' }} />
                </Box>

                <Box
                    sx={{
                        width: 190,
                        height: 640,
                        backgroundImage: `url(${vector})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        '@media (min-width: 1025px)': {
                            width: 150,
                            height: 500,
                        },
                        '@media (max-width: 1024px)': {
                            width: 120,
                            height: 400,
                        },
                        '@media (max-width: 900px)': {
                            width: 120,
                            height: 400,
                        },
                        '@media (max-width: 600px)': {
                            width: 100,
                            height: 350,
                        },
                    }}
                />

                <Box
                    sx={{
                        width: 259,
                        height: 204,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        padding: 2,
                        borderRadius: 2,
                        ...sx
                    }}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        
                        sx={{
                            fontWeight: 700,
                            fontSize: 54,
                            lineHeight: '62px',
                            letterSpacing: '0px',
                            textAlign: 'left',
                            fontFamily: "'Titillium Web', sans-serif",
                            color: '#1D1E2C',
                            '@media (min-width: 1025px)': {
                            fontSize: 60,
                        },
                        '@media (max-width: 900px)': {
                            fontSize: 40,
                            fontWeight:700,
                            lineHeight:'50px'
                        },
                            ...sx
                        }}
                    >{text}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default FormSidebox;