import React, { useState } from 'react';
import { Drawer, List, Typography, Box, Divider, IconButton, useMediaQuery,Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Listitem from '../shared/Listitem';
import documentcopy from '../assests/document-copy.png';
import documenttext from '../assests/document-text.png';
import documentpaper from '../assests/document-paper.png';
import box from '../assests/box.png';
import people from '../assests/people.png';
import usericon from '../assests/user-octagon.png';
import eclipse4 from '../assests/Ellipse 4.png';
import eclipse10 from '../assests/Ellipse 10.png';
import eclipse11 from '../assests/Ellipse 11.png';
import eclipse12 from '../assests/Ellipse 12.png';
import COR from "../assests/COR.png";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import '../styles/leftpanel.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';
import { logout } from '../store/userSlice';
import { persistor } from '../store/store';


const FixedSidebar = ({ externalOpen, setExternalOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false); 
  const isMobileOrSmallTablet = useMediaQuery('(max-width:770px)');
  const isExtraSmall = useMediaQuery('(max-width:475px)');

  const drawerWidth = 280;

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {/* Only show hamburger if not controlled externally */}
      {isMobileOrSmallTablet && typeof externalOpen === 'undefined' && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 26,
            left: isExtraSmall ? 'auto' : 25,
            right: isExtraSmall ? 25 : 'auto',
            zIndex: 1200
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobileOrSmallTablet ? 'temporary' : 'permanent'}
        anchor="left"
        open={typeof externalOpen !== 'undefined' ? externalOpen : mobileOpen}
        onClose={typeof setExternalOpen === 'function' ? () => setExternalOpen(false) : handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '2px solid rgb(209, 208, 208)',
            backgroundColor: '#FFFFFF',
            position: isMobileOrSmallTablet ? 'absolute' : 'fixed',
            height: isMobileOrSmallTablet ? '100%' : '100vh',
            top: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
          <img
            src={COR}
            alt="COR Logo"
            style={{
              width: 110,
              height: 45,
              marginTop: 46,
              objectFit: 'contain',
            }}
          />
        </Box>
       

        <Box sx={{ pt: 5, pl: 4, alignItems: 'flex-start' }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: '600', fontSize: 20, color: 'rgba(0, 0, 0, 0.9)', ml: 2 }}
          >
            Brand Space
          </Typography>
          <List sx={{ mr: 2 }}>
            <NavLink
              to="/drafts"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#C3CFFF' : 'transparent',
                textDecoration: 'none',
                display: 'block',
                borderRadius: '10px',
              })}
            >
              <Listitem
                icon={documentcopy}
                text="Drafts"
                keyProp="Drafts"
                bg={eclipse4}
                hoverbg="#C3CFFF"
              />
            </NavLink>

            <NavLink
              to="/press-releases"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#C3CFFF' : 'transparent',
                textDecoration: 'none',
                display: 'block',
                borderRadius: '10px',
              })}
            >
              <Listitem
                icon={documentpaper}
                text="Press Releases"
                keyProp="Press"
                bg={eclipse4}
                hoverbg="#C3CFFF"
              />
            </NavLink>

            <NavLink
              to="/blogs"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#C3CFFF' : 'transparent',
                textDecoration: 'none',
                display: 'block',
                borderRadius: '10px',
              })}
            >
              <Listitem
                icon={documenttext}
                text="Blogs"
                keyProp="Blogs"
                to="/blogs"
                bg={eclipse4}
                hoverbg="#C3CFFF"
              />
            </NavLink>
          </List>
        </Box>

        <Divider sx={{ mx: 3 }} />

        <Box sx={{ pt: 8, pl: 4, alignItems: 'flex-start' }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: 20, color: 'rgba(0, 0, 0, 0.9)', ml: 2 }}
          >
            Brand Control
          </Typography>
          <List sx={{ mr: 2 }}>
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#C3CFFF' : 'transparent',
                textDecoration: 'none',
                display: 'block',
                fontWeight: 'bold',
                borderRadius: '10px',

              })}
            >
              <Listitem icon={box} text="Admin" keyProp="Admin" bg={eclipse10} hoverbg="#C3CFFF" />
            </NavLink>

            <NavLink
              to="/teams"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#D5F3CE' : 'transparent',
                textDecoration: 'none',
                borderRadius: '10px',
                display: 'block',
              })}
            >
              <Listitem icon={people} text="Teams" keyProp="Teams" bg={eclipse11} hoverbg="#D5F3CE" />
            </NavLink>

            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#DEBBF4' : 'transparent',
                textDecoration: 'none',
                borderRadius: '10px',
                display: 'block',
              })}
            >
              <Listitem icon={usericon} text="Profile" keyProp="Profile" bg={eclipse12} hoverbg="#DEBBF4" />
            </NavLink>
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} className="logout-box"> 
         <Button
          variant="text"
          startIcon={<LogoutIcon />}
          onClick={() => {
            dispatch(logout());
            dispatch(setSignupData({
              firstname: '',
              lastname: '',
              company: '',
              locations: [],
              website: [],
              email: '',
              phone: '',
              password: '',
              confirmpassword: '',
              onboardingProgress: 0
            }));
            persistor.purge();
            navigate('/');
          }}
          className="logout-button "
          style={{
            marginTop: "30px"
          }}
        >
          Logout
        </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FixedSidebar;
