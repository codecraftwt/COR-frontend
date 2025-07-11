import React, { useState } from 'react';
import {
  Box,
  Chip,
  InputBase,
  IconButton,
  Typography
} from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const ChipInputField = ({ label, value = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddChip = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      const updatedChips = [...value, trimmed];
      onChange?.(updatedChips);
      setInputValue('');
    }
  };

  const handleDelete = (chipToDelete) => {
    const updatedChips = value.filter((chip) => chip !== chipToDelete);
    onChange?.(updatedChips);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddChip();
    }
  };

  return (
    <Box sx={{
       display: 'flex', flexDirection: 'column', gap: 1,mt:2 ,
       '@media (min-width: 1300px)': {
         width: 600 ,
         justifyContent: 'center',
         margin: 'auto'
       },
       '@media (min-width: 1023px)': {
         width: 410 ,
         justifyContent: 'center',
         margin: 'auto'
       },
       '@media (max-width: 1024px)': {
         width: 410,
        //  alignItems: 'center',
         justifyContent: 'center',
         margin: 'auto'
       },
       '@media (max-width: 430px)': {
        width: 280,
        // alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      },
      '@media (max-width: 900px)': {
        width: 360,
        // alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      },
      '@media (max-width: 380px)': {
        width: 310,
        // alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      },
      '@media (max-width: 325px)': {
        width: 280,
        // alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      },
    }}>
      {label && (
        <Typography sx={{ fontWeight: 600, fontSize: 16, fontFamily: 'Urbanist' }}>
          {label}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          border: '1px solid #ccc',
          borderRadius: '10px',
          // padding: '6px 8px',
          fontFamily: 'Urbanist',
          minHeight: '52px',
        }}
      >
        {value.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleDelete(chip)}
            sx={{
              m: '3px',
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: '#f0f0f0',
              '& .MuiChip-deleteIcon': {
                color: 'gray',
                '&:hover': {
                  color: 'black',
                },
              },
            }}
          />
        ))}

        <InputBase
          placeholder=""
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            ml: 1,
            flex: 1,
            fontSize: '14px',
            fontFamily: 'Urbanist',
            minWidth: 80,
          }}
        />

        <IconButton onClick={handleAddChip} sx={{ padding: '6px' }}>
          <AddCircleOutlineRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChipInputField;
