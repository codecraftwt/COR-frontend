import React from 'react';
import {
    Grid,
} from '@mui/material';
import '../styles/demo2.css';
// import Header from '../components/Home-header';

const Admin = () => {


    return (
        <Grid container direction="row"  className="press-container" >
            <Grid item xs={12} md={4} className="header">
                <h1>Left Panel</h1>
            </Grid>
            <Grid item xs={12} md={8} sm={12} lg={8} className="content">
                <Grid container spacing={1} xs={12} sm={12} md={12} lg={12} className="right-panel">
                    <Grid item xs={12} className="press-form">
                        <h1>Header</h1>
                    </Grid>
                    <Grid item xs={12} className="texteditor">
                        <h2>App 1</h2>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Admin;
