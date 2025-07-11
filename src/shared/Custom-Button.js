import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomButton = ({ text, sx, nav, ...props }) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
        } else if (nav) {
            navigate(nav);
        }
    };
    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: 'auto',
                fontWeight: 800,
                marginTop: '20px',
                background: 'linear-gradient(to right, #5A78F2, #000000)',
                color: 'white',
                fontSize: "20px",
                textTransform: 'none',
                borderRadius: '25px',
                boxShadow: 'none',
                '&:hover': {
                    background: 'linear-gradient(to right, #000000, #5A78F2)',
                    color: 'white',
                },
                ...sx
            }}
            {...props}
        >
            {text}
        </Button>
    );
}

export default CustomButton;
