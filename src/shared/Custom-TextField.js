import React from 'react';
import { Typography, TextField, MenuItem, Box } from '@mui/material';
import '../styles/texfield.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Textfield = ({
  textcontent,
  type = 'text',
  select = false,
  options = [],
  placeHolder,
  sx,
  name,
  value,
  onChange,
  phone = false,
  error = false,
  helperText = '',
  InputProps = {},
  inputProps = {},
}) => {
  return (
    <Box className="texfield-container"
      sx={{
        '@media (max-width: 430px)': {
          width: 280,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        },
        '@media (max-width: 900px)': {
          width: 360,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        },
        '@media (max-width: 380px)': {
          width: 310,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        },
        '@media (max-width: 325px)': {
          width: 280,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        },
        ...sx

      }}
    >
      <Typography
        variant="subtitle1"
        className="textfield-label"
        gutterBottom
      >
        {textcontent}
      </Typography>

      {phone ? (
        <PhoneInput
          defaultCountry="in"
          value={value}
          onChange={onChange}
          inputStyle={{ width: '100%' }}
        />
      ) : (
        <TextField
          fullWidth
          margin="none"
          type={select ? undefined : type === 'password' ? 'password' : type}
          select={select}
          className="texfield-input"
          placeholder={placeHolder}
          InputProps={{
            ...InputProps,
            style: {
              color: 'rgb(44, 43, 43)',
              fontSize: '14px',
              fontWeight: 500,
              ...(InputProps && InputProps.style),
            },
          }}
          sx={sx}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          inputProps={inputProps}
          FormHelperTextProps={{ sx: { textAlign: 'left', width: '100%',paddingLeft: '10px' } }}
        >
          {select &&
            options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField>
      )}
    </Box>
  );
};

export default Textfield;
