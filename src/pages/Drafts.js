import {  Grid } from '@mui/material'
import React from 'react'
import LeftPanel from '../components/LeftPanel'
import DraftBox from '../shared/Drafts-Box'
import '../styles/drafts.css'

const Drafts = () => {
    return (
        <Grid container className="drafts-container" sx={{ display: 'flex', flexDirection: 'row' }} >

            <Grid item  className="left-panel" >
                <LeftPanel />
            </Grid>
            <Grid  className="draft-box">
                <DraftBox />
            </Grid>
        </Grid>
    )
}

export default Drafts
