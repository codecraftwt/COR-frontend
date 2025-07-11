import { Box } from '@mui/material'
import React from 'react'

const design = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw', backgroundColor: 'yellow' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '90px', width: '90vw', backgroundColor: 'red' }}>
                hello
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '900px', width: '90vw', backgroundColor: 'blue' }}>
                hii
            </Box>
        </Box>
    )
}

export default design
