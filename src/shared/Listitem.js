import React from 'react';
import { ListItem, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Listitem = ({ icon, text, keyProp, bg, hoverbg, sx, to,startIcon }) => {
  const navigate = useNavigate();


  
  return (
    <ListItem
      button
      key={keyProp}
      onClick={() => navigate(to)}
      startIcon={icon}
      sx={{
        fontWeight: 600,
        gap: 2,
        fontSize: 16,
        
        color: 'black',
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: hoverbg,
          color: 'black',
        },
        '&:active': {
          // backgroundColor: hoverbg,
          color: 'black',
          // borderRadius: '10px', 
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          fontWeight: 'bold',
          
        }}
      >
        <img src={icon} alt={text} style={{ width: 16, height: 16 }} />
      </Box>
      <ListItemText
        primary={text}
        sx={{
          fontFamily: 'Urbanist, sans-serif',
        }}
      />
    </ListItem>
  );
};

export default Listitem;
