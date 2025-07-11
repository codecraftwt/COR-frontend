import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, InputAdornment, Box, Snackbar,TextField } from '@mui/material';
import LeftPanel from '../components/LeftPanel';
import Texfield from '../shared/Custom-TextField';
import '../styles/profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';
import { getUserByEmail } from '../services/api';

import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { regUser } from '../services/api';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Profile component allows users to view and edit their profile information.
 * It fetches user data on mount and populates the form fields.
 * Users can update fields like first name, last name, company, location, and phone number.
 * Email is displayed but not editable.
 * The component provides options to save changes or cancel editing.
 * Snackbar notifications are shown based on the success or failure of save operations.
 */

/*******  e9371b5d-7c70-45a6-9735-bc43c9b5cb7d  *******/
const Profile = () => {
    const countries = [
        'United Arab Emirates',
        'United States',
        'United Kingdom',
        'India',
        'Canada',
        'Kolhapur',
        'Pune',
        'Mumbai',
        'Delhi',
        'Chennai',
    ];

    const labelStyle = { fontWeight: 600, fontSize: '16px' };
    const user = useSelector((state) => state.user);
    const signupData = useSelector((state) => state.signup.signupData);
    const dispatch = useDispatch();
    const email = user?.email || signupData?.email;
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    
    const [profileData, setProfileData] = useState({
        email: '',
        company: '',
        location: [],
        websites: [],
        industries: [],
        products: [],
    });

    useEffect(() => {
        async function fetchUserData() {
            if (email) {
                const res = await getUserByEmail(email);
                setProfileData(res.data);
                dispatch(setSignupData(res.data)); // Optional: update Redux
            }
        }
        fetchUserData();
    }, [email, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
        dispatch(setSignupData({ ...signupData, [name]: value }));
    };

    const handlePhoneChange = (value) => {
        setProfileData(prev => ({ ...prev, phone: value }));
        dispatch(setSignupData({ ...signupData, phone: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload = { ...profileData };
            await regUser(payload);
            setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
            dispatch(setSignupData(payload));
        } catch (error) {
            setSnackbar({ open: true, message: error?.response?.data?.message || 'Failed to update profile!', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleEmailFocus = () => {
        setEmailTouched(true);
    };

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    elevation={6}
                    variant="filled"
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
            <Grid container className="profile-form-container" >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={3}
                    className="profile-left-panel"
                >
                    <LeftPanel />
                </Grid>

                <Grid item xs={12} md={9} className="profile-content">
                    <Grid container direction="column" className="profile-form-wrapper" spacing={3}>
                        <Grid item>
                            <Typography className="profile-title">
                                Profile
                            </Typography>
                        </Grid>

                        <Grid container spacing={2} className="profile-grid" sx={{ mt: 2 }} sm={12} md={12} lg={12} >
                            <Grid item xs={12} sm={6} md={6} lg={8} >
                                <Texfield
                                    textcontent="First Name"
                                    name="firstname"
                                    value={profileData.firstname || ''}
                                    type="text"
                                    // className="profile-textfield"
                                    placeHolder="Mohammed"
                                    labelStyle={labelStyle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Texfield
                                    textcontent="Last Name"
                                    name="lastname"
                                    value={profileData.lastname || ''}
                                    type="text"
                                    // className="profile-textfield"
                                    placeHolder="Jamani"
                                    labelStyle={labelStyle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Texfield
                                    textcontent="Company"
                                    name="company"
                                    value={profileData.company || ''}
                                    type="text"
                                    // className="profile-textfield"
                                    placeHolder="O2 Marketing Agency"
                                    labelStyle={labelStyle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Texfield
                                    select
                                    textcontent="Country of Residence"
                                    name="location"
                                    value={profileData.location || ''}
                                    options={countries}
                                    // className="profile-select"
                                    placeHolder="Select Country"
                                    labelStyle={labelStyle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Box>
                                    <Texfield
                                        textcontent="Email Address"
                                        name="email"
                                        value={profileData.email || ''}
                                        type="email"
                                        // className="profile-textfield"
                                        placeHolder="mm@o2.com"
                                        labelStyle={labelStyle}
                                        disabled
                                    />
                                    <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                                        Email cannot be changed
                                    </Typography>
                                </Box>
                            </Grid>
                             <Grid item xs={12} sm={6} md={6} lg={8}>
                                <Texfield
                                    textcontent="Phone Number"
                                    name="phone"
                                    value={profileData.phone || ''}
                                    onChange={handlePhoneChange}
                                    phone={true}
                                    className="profile-textfield"
                                    sx={{
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        width: { xs: '100%', sm: '100%', md: '436px', lg: '436px' },
                                        minWidth: '0',
                                        maxWidth: '100%'
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={2} className="profile-button-group">
                                <Grid item>
                                    <Button variant="outlined" className="profile-button" onClick={handleCancel} disabled={loading}>Cancel</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" className="profile-button save-button" onClick={handleSave} disabled={loading}>Save</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
