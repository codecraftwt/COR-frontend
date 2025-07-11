import React from 'react';
import { Typography, MenuItem, Box, TextareaAutosize } from '@mui/material';

const Texfield = ({
  textcontent,
  type = 'text',
  select = false,
  options = [],
  row = {},
  sx = {},
  ...props
}) => {
  return (
    <Box sx={{ width: '100%', mb: 0, ...sx }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: 'Urbanist',
          fontWeight: 600,
          fontSize: 16,
          // mb: 1,
        }}
        gutterBottom
      >
        {textcontent}
      </Typography>

      <TextareaAutosize
        minRows={row}
        variant="outlined"
        margin="none"
        size="small"
        type={select ? undefined : type}
        select={select}
        sx={{
          backgroundColor: 'white',
          borderRadius: "9px",
          '& .MuiOutlinedInput-root': {
            boxShadow: '5px 8px 5px rgba(57, 57, 57, 0.08)',
          },
          ...sx,
        }}
        {...props}
      >
        {select &&
          options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextareaAutosize>
    </Box>
  );
};

export default Texfield;
