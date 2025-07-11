import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import CustomButton from '../shared/Custom-Button'
import COR from '../assests/COR.png';
import '../styles/newpass.css';
import Texfield from '../shared/Custom-TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';

const NewPass = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset = async () => {
        setError('');
        setMessage('');
        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, password);
            setMessage('Password reset successfully! You can now sign in.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError('Invalid or expired link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className='newpass-container'>
            <Box className='logobox' >
                <img src={COR} alt="Logo" style={{ width: '90px', height: '40px' }} />
            </Box>
            <Box className='input-pass' >
                <Typography
                    className='input-label'
                    sx={{
                        paddingBottom: 3,
                        fontSize: '24px',
                        fontWeight: 600
                    }}
                >
                    Create New Password
                </Typography>

                <Typography
                    className='input-subtext'
                    sx={{
                        fontSize: 15, lineHeight: 1.5, color: "#878787", paddingTop: 0
                    }}
                >
                    Your new password must be different from the previous used passwords.
                </Typography>



                <Texfield
                    textcontent='Enter New Password'
                    variant="outlined"
                    className='input-feild'
                    size="small"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Typography
                    className='input-subtext'
                    sx={{
                        lineHeight: 1.5, color: "#878787", paddingTop: 1.2, fontSize: 12
                    }}
                >
                    Password must be at least 8 characters
                </Typography>


                <Texfield
                    textcontent={'Confirm New Password'}
                    variant="outlined"
                    margin="none"
                    className='input-feild'
                    size="small"
                    type='password'
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                /><br />
                {message && <Typography color="primary">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <Box className='reset-btn-box'>
                    <CustomButton
                        text={loading ? "Resetting..." : "Reset Password"}
                        onClick={handleReset}
                        disabled={loading}
                        className='reset-btn'
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default NewPass;
