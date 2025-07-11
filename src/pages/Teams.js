import React from 'react';
import {
    Box, TextField, InputAdornment, IconButton, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Select, MenuItem, Typography, useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import '../styles/Teams.css';
import LeftPanel from '../components/LeftPanel';
import { blue } from '@mui/material/colors';

const RoleSelect = ({ value }) => (
    <Select
        value={value}
        size="small"
        className="select"
        sx={{ minWidth: 120 }}
    >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="collaborator">Collaborator</MenuItem>
        <MenuItem value="guest">Guest</MenuItem>
    </Select>
);

const teamMembers = [
    { name: 'Mohammed Jomani', email: 'mimi@d2.com', status: '2nd Nov 2024', role: 'admin', isPending: false },
    { name: 'Rajesh Kanthan', email: 'rk@o2.com', status: 'Pending Invite', role: 'collaborator', isPending: true },
    { name: 'Ahmed Khalifa', email: 'ahk@o2.com', status: 'Pending Invite', role: 'guest', isPending: true },
];


const Teams = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box className="teams-page">
            <Box className="teams-left-panel">
                <LeftPanel />
            </Box>
            <Box className="teams-container">
                <Box className="teams-header">
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '28px', sm: '32px' },
                            mb: 1
                        }}
                    >
                        Teams
                    </Typography>
                    <Typography variant="subtitle1">
                        Search Team Members
                    </Typography>
                </Box>

                <Box
                    className="teams-actions"
                >
                    <TextField
                        fullWidth
                        placeholder="Search by name"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton><SearchIcon size="small" className='search-icon' /></IconButton>
                                </InputAdornment>
                            ),
                        }}
                        className="search-input"
                    />
                    <Button
                        variant="contained"
                        className='invite-button'
                        startIcon={<AddCircleOutlineIcon />}
                        fullWidth={isMobile}
                    >
                        {isMobile ? 'Invite' : 'Invite Team Member'}
                    </Button>
                </Box>

                <TableContainer className="teams-table-container">
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
                                <TableCell sx={{ minWidth: 150 }}>Last Active</TableCell>
                                <TableCell sx={{ minWidth: 120 }}>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teamMembers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Box>
                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#666' }}>{user.email}</div>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <span style={{
                                            color: user.isPending ? '#ff9800' : 'inherit',
                                            fontWeight: user.isPending ? 500 : 'inherit'
                                        }}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <RoleSelect value={user.role} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Teams;