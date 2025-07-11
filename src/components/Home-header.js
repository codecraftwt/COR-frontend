import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    InputBase,
    Grid,
    Box,
    useMediaQuery,
    useTheme,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import help from "../assests/message-question.png";
import learn from "../assests/note-2.png";
import search from '../assests/search-normal.png';
import eclipse1 from '../assests/Ellipse 1 .png';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../styles/Header.css';

const navItems = ['Dashboard', 'Explore', 'Custom', 'Favorites'];

const Header = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isTablet = useMediaQuery(theme.breakpoints.only('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isCustomTablet = useMediaQuery('(min-width:426px) and (max-width:769px)');
    const isVerySmall = useMediaQuery('(max-width:370px)');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="static" className="header-home" sx={{
            width: '100%',
            px: { xs: 0, sm: 1, md: 2, lg: 4 },
            boxShadow: 'none',
            background: '#fff',
        }}>
            <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3 }, minHeight: { xs: 56, sm: 64 } }}>
                <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap" sx={{
                    flexDirection: (isLargeScreen ? 'row' : undefined),
                    alignItems: 'center',
                    flexWrap: (isLargeScreen ? 'nowrap' : undefined),
                    width: '100%',
                }}>
                    <Grid item sx={{ pl: isLargeScreen ? 0.5 : { xs: 1, sm: 1, md: 2 }, minWidth: isLargeScreen ? 340 : undefined }}>
                        {isMobile ? (
                            <Button
                                variant="text"
                                disableElevation
                                onClick={handleDrawerToggle}
                                endIcon={<ArrowDropDownIcon sx={{ color: '#000' }} />}
                                sx={{
                                    color: '#1D1E2C',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    textTransform: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 1,
                                }}
                            >
                                Dashboard
                            </Button>
                        ) : isCustomTablet || isTablet ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {navItems.map((label) => (
                                    <Button key={label} variant="text" disableElevation className="nav-button" sx={{ fontWeight: 600, color: '#1D1E2C', fontSize: 15 }}>
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                        ) : isLargeScreen ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                {navItems.map((label) => (
                                    <Button key={label} variant="text" disableElevation className="nav-button" sx={{ fontWeight: 600, color: '#1D1E2C', fontSize: 16 }}>
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                        ) : (
                            <Grid container spacing={1}>
                                {navItems.map((label) => (
                                    <Grid item key={label}>
                                        <Button variant="text" disableElevation className="nav-button" sx={{ fontWeight: 600, color: '#1D1E2C', fontSize: { lg: 16, md: 15 } }}>
                                            {label}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>

                    {(isLargeScreen || isMediumScreen) && !isTablet && (
                        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: isLargeScreen ? 220 : undefined }}>
                            <Button sx={{ color: '#1D1E2C', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, fontSize: 15 }} className="help-btn">
                                <img src={help} alt="Help Icon" style={{ width: 18, height: 18 }} />
                                Help
                            </Button>
                            <Button sx={{ color: '#1D1E2C', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, fontSize: 15 }} className="learn-btn">
                                <img src={learn} alt="Learning Centre Icon" style={{ width: 18, height: 18 }} />
                                Learning Centre
                            </Button>
                        </Grid>
                    )}

                    <Grid item sx={{ px: isLargeScreen ? 1 : { xs: 1, sm: 2 }, minWidth: isLargeScreen ? 220 : undefined, flex: isLargeScreen ? '1 1 0%' : undefined, maxWidth: isLargeScreen ? 340 : undefined }}>
                        {window.innerWidth >= 475 && (
                            isCustomTablet ? (
                                <Box className="search-container" sx={{ display: 'flex', alignItems: 'center', position: 'relative', minWidth: 180, maxWidth: 220, ml: 2, borderRadius: "30px" }}>
                                    <InputBase
                                        placeholder="Search COR"
                                        inputProps={{ 'aria-label': 'search' }}
                                        sx={{
                                            width: '100%',
                                            paddingLeft: '40px',
                                            paddingY: 1,
                                            fontSize: 15,
                                            background: '#F3F3F3',
                                            borderRadius: '30px',
                                        }}
                                    />
                                    <Box
                                        className="search-icon-box"
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundImage: `url(${eclipse1})`,
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={search} alt="Search Icon" style={{ width: 14, height: 14 }} />
                                    </Box>
                                </Box>
                            ) : isTablet ? (
                                <Box className="search-container" sx={{ display: 'flex', alignItems: 'center', position: 'relative', minWidth: 180, maxWidth: 260, ml: 2 }}>
                                    <InputBase
                                        placeholder="Search COR"
                                        inputProps={{ 'aria-label': 'search' }}
                                        sx={{
                                            width: '100%',
                                            paddingLeft: '40px',
                                            paddingY: 1,
                                            fontSize: 15,
                                            background: '#F5F6FA',
                                            borderRadius: '30px',
                                        }}
                                    />
                                    <Box
                                        className="search-icon-box"
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundImage: `url(${eclipse1})`,
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={search} alt="Search Icon" style={{ width: 14, height: 14 }} />
                                    </Box>
                                </Box>
                            ) : (
                                <Box className="search-container" sx={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
                                    <InputBase
                                        placeholder="Search COR"
                                        inputProps={{ 'aria-label': 'search' }}
                                        sx={{
                                            width: '100%',
                                            paddingLeft: '40px',
                                            paddingY: 1,
                                            fontSize: { xs: 14, sm: 15, md: 16 },
                                            background: '#F5F6FA',
                                            borderRadius: '30px',
                                        }}
                                    />
                                    <Box
                                        className="search-icon-box"
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            backgroundImage: `url(${eclipse1})`,
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={search} alt="Search Icon" style={{ width: 14, height: 14 }} />
                                    </Box>
                                </Box>
                            )
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '100%',
                        maxHeight: '60vh',
                        minHeight: 180,
                        overflowY: 'auto',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                        p: 2,
                    },
                }}
            >
                <Box sx={{ width: '100%', p: 1 }} role="presentation" onClick={handleDrawerToggle}>
                    <List>
                        {navItems.map((text) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} primaryTypographyProps={{ fontWeight: 600, fontSize: 18, color: '#1D1E2C' }} />
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <ListItem button>
                            <img src={help} alt="Help Icon" style={{ width: 18, height: 18, marginRight: 12 }} />
                            <ListItemText primary="Help" primaryTypographyProps={{ fontWeight: 600, fontSize: 17, color: '#1D1E2C' }} />
                        </ListItem>
                        <ListItem button>
                            <img src={learn} alt="Learning Centre Icon" style={{ width: 18, height: 18, marginRight: 12 }} />
                            <ListItemText primary="Learning Centre" primaryTypographyProps={{ fontWeight: 600, fontSize: 17, color: '#1D1E2C' }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Header;
