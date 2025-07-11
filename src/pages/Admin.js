import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    Typography,
    Box
} from '@mui/material';
import LeftPanel from '../components/LeftPanel';
import TextChips from '../shared/Custom-Chips';
import Texfield from '../shared/Custom-TextField';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import { createAccount, updateAccount, deleteAccount, getAccountById, getUserByEmail } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setSignupData } from '../store/signupSlice';


const Admin = () => {
    const signupData = useSelector((state) => state.signup.signupData);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [accountId, setAccountId] = useState(null);
    const [adminData, setAdminData] = useState({
        email: '',
        company: '',
        location: [],
        websites: [],
        password: '',
    });
    const email = user?.email || signupData?.email;

    useEffect(() => {
        async function fetchAdminData() {
            if (email) {
                const res = await getUserByEmail(email);
                setAdminData(res.data);
                dispatch(setSignupData(res.data));
            }
        }
        fetchAdminData();
    }, [email, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prev => ({ ...prev, [name]: value }));
        dispatch(setSignupData({ ...signupData, [name]: value }));
    };
    const handleChipsChange = (type, updatedChips) => {
        setAdminData(prev => ({ ...prev, [type]: updatedChips }));
        dispatch(setSignupData({ ...signupData, [type]: updatedChips }));
    };

    const handleSave = () => {
        // Add logic for Save button
        // Example:
        // createAccount({ company, locations, website }).then(data => {
        //     setAccountId(data.id);
        // });
    };

    const handleDelete = () => {
        // Add logic for Delete My Account button
        // Example:
        // deleteAccount(accountId).then(() => {
        //     setAccountId(null);
        // });
    };

    return (
        <Grid container className="admin-box">
            <Grid item xs={12} md={4} className="left-panel">
                <LeftPanel />
            </Grid>

            <Grid item xs={12} md={8} sm={12} lg={8} className="admin-form">
                <Typography className="admin-title" sx={{ fontSize: '32px', fontWeight: 600, mb: 3 }}>
                    Account
                </Typography>

                <Grid container spacing={3} xs={12} sm={12} md={12} lg={12} >
                    <Grid item xs={12} className="company-field">
                        <Texfield
                            textcontent="Company"
                            placeHolder="O2 Marketing Agency"
                            type="text"
                            labelStyle={{ fontWeight: 600, fontSize: '16px' }}
                            value={adminData.company || ''}
                            name="company"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className="chips-field" >
                        <Grid item xs={12}>
                            <TextChips
                                label="Locations"
                                className="text-chips-field"
                                initialChips={Array.isArray(adminData.location) ? adminData.location : []}
                                onChange={updatedChips => handleChipsChange('location', updatedChips)}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextChips
                                label="Website"
                                className="text-chips-field"
                                initialChips={Array.isArray(adminData.websites) ? adminData.websites : []}
                                onChange={updatedChips => handleChipsChange('websites', updatedChips)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="password-field">
                        <Texfield
                            textcontent="Enter Current Password"
                            type="password"
                            labelStyle={{ fontWeight: 900, fontSize: '16px', color: 'black' }}
                            value={adminData.password || ''}
                            name="password"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}  className="password-field">
                        <div className="password-row" style={{ display: 'flex' ,gap: '20px' }}>
                            <Texfield
                                textcontent="New Password"
                                type="password"
                                labelStyle={{ color: '#2E8B57' }}
                                style={{ flex: 1, marginRight: 32 }}
                            />
                            <Texfield
                                textcontent="Confirm Password"
                                type="password"
                                labelStyle={{ color: '#2E8B57' }}
                                style={{ flex: 1 }}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} className="btn-field">
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button className="cancel-btn" sx={{ borderRadius: '25px' }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className="save-btn" sx={{ borderRadius: '25px' }} onClick={handleSave}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8} sx={{ bgcolor: '#F5F5F5', p: 2 }} className="reset-pass">
                        <Grid>
                            <Typography variant="subtitle1" fontWeight={600} fontSize="15px" color="black">
                                Reset password?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Forget your password? Don't worry, just click to reset.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} lg={4} sx={{ mt: 1 }}>
                            <Button
                                className="reset-btn"
                                onClick={() => navigate('/reset-pass')}
                                sx={{ borderRadius: '25px', color: 'white', bgcolor: '#000000' }}
                            >
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8} sx={{ p: 2 }}>
                        <Grid>
                            <Typography variant="subtitle1" fontWeight={600} fontSize="15px" color="black">
                                Delete My Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque velit nunc, aliquam porta nunc.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} lg={4} sx={{ mt: 1 }}>
                            <Button className="del-acc-btn" onClick={handleDelete}>
                                Delete My Account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Admin;
