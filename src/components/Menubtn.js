import React from 'react';
import { Box } from '@mui/material';

const MenuBtn = ({ onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2px',
                width: 24,
                height: 24,
                cursor: 'pointer',
                alignItems: 'center',
                justifyItems: 'center',
                ml: 2,
            }}
        >
            {[...Array(4)].map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '2px solid #000000',
                    }}
                />
            ))}
        </Box>
    );
};

export default MenuBtn;
