import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    InputBase,
    Box,
    Drawer,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import help from "../assests/message-question.png";
import learn from "../assests/note-2.png";
import search from '../assests/search-normal.png';
import eclipse1 from '../assests/Ellipse 1 .png';
import COR from '../assests/COR.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MenuBtn from './Menubtn';
import LeftPanel from './LeftPanel';
import '../styles/Header2.css';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isVerySmallScreen = useMediaQuery('(max-width:480px)');
    const isBelow780 = useMediaQuery('(max-width:780px)');
    const [anchorEl, setAnchorEl] = useState(null);


    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    return (
        <>
            <AppBar
                position="static"
                className='header-appbar'
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    boxShadow: 1,
                    height: { xs: 'auto', md: 70 },
                    margin: { xs: '10px', md: '20px auto' },
                    borderRadius: '20px',
                    justifyContent: 'center',
                    width: 'auto',
                    maxWidth: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: { xs: 'nowrap', md: 'wrap' },
                        alignItems: 'center',
                        px: { xs: 1, md: 5 },
                        py: { xs: 1, md: 0 },
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                            flexBasis: { xs: 'auto', sm: 'auto' },
                            minWidth: 0,
                        }}
                    >
                        <MenuBtn onClick={toggleDrawer(true)} />
                        <img
                            src={COR}
                            alt="COR Logo"
                            style={{
                                width: isSmallScreen ? '90px' : '110px',
                                height: '50px',
                                marginTop: 5,
                                objectFit: 'contain',
                                marginLeft: 10,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'row' },
                            alignItems: 'center',
                            gap: { xs: 1, sm: 2 },
                            justifyContent: { xs: 'flex-end', md: 'flex-end' },
                            width: { xs: 'auto', sm: 'auto' },
                        }}
                    >
                        {/* Only show Help/Learning Centre on large screens, but always show search icon/box */}
                        {!isSmallScreen && !isBelow780 && (
                            <>
                                <Button
                                    color="inherit"
                                    sx={{ color: '#1D1E2C', display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    <img src={help} alt="Help Icon" style={{ width: 18, height: 18 }} />
                                    Help
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ color: '#1D1E2C', display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    <img src={learn} alt="Learning Centre Icon" style={{ width: 18, height: 18 }} />
                                    Learning Centre
                                </Button>
                            </>
                        )}

                        <Box
                            sx={{
                                position: 'relative',
                                backgroundColor: '#ffffff',
                                '&:hover': { backgroundColor: 'lightgrey' },
                                display: 'flex',
                                alignItems: 'center',
                                width: isVerySmallScreen ? 40 : { xs: '100%', sm: 250, md: 300 },
                                borderRadius: '25px',
                                height: '40px',
                                border: '1px solid #E9E8E8',
                                mt: { xs: 1, sm: 0 },
                                justifyContent: 'center',
                                p: isVerySmallScreen ? 0 : undefined,
                                cursor: 'pointer',
                                transition: 'width 0.2s',
                            }}
                        >
                            {!isVerySmallScreen && (
                                <InputBase
                                    placeholder="Search COR"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{
                                        color: 'inherit',
                                        width: '100%',
                                        paddingLeft: '40px',
                                        paddingY: 1,
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    position: isVerySmallScreen ? 'static' : 'absolute',
                                    right: isVerySmallScreen ? 'auto' : 10,
                                    top: isVerySmallScreen ? 'auto' : '50%',
                                    transform: isVerySmallScreen ? 'none' : 'translateY(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 30,
                                    height: 30,
                                    backgroundImage: `url(${eclipse1})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <img src={search} alt="Search Icon" style={{ width: 14, height: 14 }} />
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>

            </AppBar>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
                <LeftPanel externalOpen={openDrawer} setExternalOpen={setOpenDrawer} />
            </Drawer>
        </>
    );
};

export default Header;
