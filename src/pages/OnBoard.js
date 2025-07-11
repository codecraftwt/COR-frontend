import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid ,Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FormSidebox from '../shared/Form-Sidebox';
import Textfield from '../shared/Custom-TextField';
import Textchips from '../shared/Custom-Chips';
import { onboarding, getUserByEmail } from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';
import SegmentedProgressBar from '../shared/SegmentedProgress-bar';

import '../styles/onboard.css';

const Drafts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const signupData = useSelector((state) => state.signup.signupData);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const onboardData = (user && Object.keys(user).length > 0) ? user : signupData;
    const email = onboardData.email;
    const toArray = v => Array.isArray(v) ? v : v ? [v] : [];
    const [locationchips, setLocationchips] = useState(toArray(onboardData.location));
    const [websiteChips, setWebsiteChips] = useState(toArray(onboardData.websites));
    const [industryChips, setIndustryChips] = useState(toArray(onboardData.industries));
    const [productChips, setProductChips] = useState(toArray(onboardData.products));
    const [formData, setFormData] = useState({
        email: onboardData.email || '',
        company: onboardData.company || '',
        location: toArray(onboardData.location),
        websites: toArray(onboardData.websites),
        industries: toArray(onboardData.industries),
        products: toArray(onboardData.products),
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        setFormData({
            email: signupData.email || '',
            company: signupData.company || '',
            location: toArray(signupData.location),
            websites: toArray(signupData.websites),
            industries: toArray(signupData.industries),
            products: toArray(signupData.products),
        });
        setLocationchips(toArray(signupData.location));
        setWebsiteChips(toArray(signupData.websites));
        setIndustryChips(toArray(signupData.industries));
        setProductChips(toArray(signupData.products));
    }, [signupData]);

    // useEffect(() => {
    //     if (!email) {
    //         navigate('/signup');
    //     }
    // }, [email, navigate]);

    console.log("OnBoard email:", email);

    const handleChipsChange = (type, updatedChips) => {
        // Prepare new state for all chips
        let newLocation = locationchips;
        let newWebsites = websiteChips;
        let newIndustries = industryChips;
        let newProducts = productChips;

        switch (type) {
            case 'location':
                newLocation = updatedChips;
                setLocationchips(updatedChips);
                break;
            case 'website':
                newWebsites = updatedChips;
                setWebsiteChips(updatedChips);
                break;
            case 'industry':
                newIndustries = updatedChips;
                setIndustryChips(updatedChips);
                break;
            case 'product':
                newProducts = updatedChips;
                setProductChips(updatedChips);
                break;
            default:
                break;
        }

        // Update formData
        const newFormData = {
            ...formData,
            location: newLocation,
            websites: newWebsites,
            industries: newIndustries,
            products: newProducts,
        };
        setFormData(newFormData);

        // Calculate new completionPercent
        let completedFields = 0;
        if (newFormData.company.trim() !== '') completedFields++;
        if (newLocation.length > 0) completedFields++;
        if (newWebsites.length > 0) completedFields++;
        if (newIndustries.length > 0) completedFields++;
        if (newProducts.length > 0) completedFields++;
        const newPercent = Math.round((completedFields / 5) * 100);

        dispatch(setSignupData({ ...signupData, ...newFormData, onboardingProgress: newPercent }));
    };

    const handleonboarding = async () => {
        try {
            const response = await onboarding({ 
                ...formData, 
                email: signupData.email,
                onboardingProgress: completionPercent 
            });
            if (!signupData.email) {
                setSnackbar({
                    open: true,
                    message: 'Email is missing. Please go back and fill in your email.',
                    severity: 'error',
                });
                return;
            }
            const userRes = await getUserByEmail(signupData.email);
            dispatch(setSignupData(userRes.data));

            setSnackbar({
                open: true,
                message: 'OnBoarding Completed!',
                severity: 'success',
            });
            setTimeout(() => {
                navigate("/home", { state: { email, onboardingProgress: completionPercent } });
            }, 2000);
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Something went wrong!',
                severity: 'error',
            });
        }
    };

    const isFormComplete =
        formData.company.trim() !== '' &&
        locationchips.length > 0 &&
        websiteChips.length > 0 &&
        industryChips.length > 0 &&
        productChips.length > 0;

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const totalFields = 5;
    let completedFields = 0;
    if (formData.company.trim() !== '') completedFields++;
    if (locationchips.length > 0) completedFields++;
    if (websiteChips.length > 0) completedFields++;
    if (industryChips.length > 0) completedFields++;
    if (productChips.length > 0) completedFields++;

    const completionPercent = Math.round((completedFields / totalFields) * 100);
    
   
    return (
        <>
            <Grid container sx={{ minHeight: '100vh' }} className="onboard-container">
                <Grid item xs={0} md={5} lg={4} sm={5} className="onboard-sidebox" sx={{
                    position: { sm: 'fixed' },
                    height: '100vh',
                    zIndex: 1,
                    overflow: 'hidden'
                }} >
                    <FormSidebox text="COR onboarding process." />
                </Grid>

                <Grid item xs={12} md={7} lg={8} sm={7} className="onboard-form"
                    sx={{
                        p: { xs: 2, md: 6 },
                        height: '100vh',
                        overflowY: 'auto'
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography variant="h1" sx={{
                                fontSize: { xs: '24px', md: '32px' },
                                fontWeight: 600
                            }}>
                                Complete the registration
                            </Typography>
                            <Typography sx={{
                                fontSize: '15px',
                                color: '#878787',
                                mt: 1
                            }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tristique massa. Integer ipsum felis, aliquam non magna a, commodo laoreet nulla. 
                            </Typography>
                        </Grid>

                        <Box sx={{ width: '100%', mb: 3 }}>
                            <SegmentedProgressBar steps={5} activeStep={Math.max(1, Math.ceil(completionPercent / 20))} />
                        </Box>

                        {/* <Grid item xs={12} md={6} className="onboard-inputs">
                            <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
                                Email
                            </Typography>
                            <Textfield
                                fullWidth
                                textcontent={""}
                                type='email'
                                name="email"
                                value={formData.email}
                                disabled
                                className="onboard-textfield"
                            />
                        </Grid> */}

                        <Grid item xs={12} md={6} className="onboard-inputs">
                            <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
                                Company Name
                            </Typography>
                            <Textfield
                                fullWidth
                                textcontent={""}
                                type='text'
                                name="company"
                                value={formData.company}
                                onChange={e => {
                                    const newCompany = e.target.value;
                                    const newFormData = { ...formData, company: newCompany };
                                    setFormData(newFormData);

                                    let completedFields = 0;
                                    if (newCompany.trim() !== '') completedFields++;
                                    if (locationchips.length > 0) completedFields++;
                                    if (websiteChips.length > 0) completedFields++;
                                    if (industryChips.length > 0) completedFields++;
                                    if (productChips.length > 0) completedFields++;
                                    const newPercent = Math.round((completedFields / 5) * 100);

                                    dispatch(setSignupData({ ...signupData, ...newFormData, onboardingProgress: newPercent }));
                                }}
                                placeHolder='consectetur adipiscing elited vel tristique'
                                className="onboard-textfield"
                            />
                        </Grid>

                        {[
                            { label: 'Location', chips: locationchips, type: 'location' },
                            { label: 'Websites', chips: websiteChips, type: 'website' },
                            { label: 'Industry', chips: industryChips, type: 'industry' },
                            { label: 'Products and Services', chips: productChips, type: 'product' }
                        ].map((section, index) => (
                            <Grid item xs={12} key={index} className="onboard-inputs">
                                <Textchips
                                    fullWidth
                                    label={section.label}
                                    value={section.chips}
                                    onChange={(updatedChips) => handleChipsChange(section.type, updatedChips)}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} className="onboard-inputs">
                            <Grid container spacing={2} justifyContent="flex-start" className="onboard-buttons">
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: 'black',
                                            borderColor: 'black',
                                            borderRadius: '25px',
                                            px: 4,
                                            '&:hover': {
                                                backgroundColor: 'black',
                                                color: '#fff',
                                            }
                                        }}
                                        onClick={() => navigate('/signup', { state: { fromOnboard: true } })}
                                    >
                                        Prev
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#000',
                                            color: '#fff',
                                            borderColor: 'black',
                                            borderRadius: '25px',
                                            px: 4,
                                            '&:hover': {
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }
                                        }}
                                        onClick={handleonboarding}
                                    >
                                        {isFormComplete ? 'Submit' : 'Next'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default Drafts;