import React from 'react';
import {
  Grid,
} from '@mui/material';
import LeftPanel from '../components/LeftPanel';
import '../styles/demo1.css';
import Header from '../components/Home-header';

const Admin = () => {


  return (
    <Grid container className="home-container">
      <Grid item xs={12} md={4} sm={0}  lg={4} className="left-panel">
        <LeftPanel />
      </Grid>

      <Grid item xs={12} md={8} sm={12} lg={8} className="right">
        <Grid container spacing={3} xs={12} sm={12} md={12} lg={12} className="right-panel">
          <Grid item xs={12} className="header">
            <Header />

          </Grid>
          <Grid item xs={12} className="Apparea">
            <Grid container spacing={3} xs={12} sm={12} md={12} lg={12} className="app-area">
              <Grid item xs={12} className="app-card">
                <h2>App 1</h2>

              </Grid>
              <Grid item xs={12} className="app-card">
                <h2>App 2</h2>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Admin;
