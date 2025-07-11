import { Box, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import BLogArea from '../components/BlogArea';
import Texteditor from '../components/Texteditor';
import Header2 from '../components/Editor-Header';
import leftarrow from '../assests/leftarrow.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blogs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const draftContent = location.state?.draft?.content || '';
    const draftId = location.state?.draft?._id || location.state?.draft?.id;
    const [generatedBlog, setGeneratedBlog] = useState('');
    const userEmail = useSelector((state) => state.user.email || state.signup.signupData.email);

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <Box sx={{ overflow: 'hidden', minHeight: '100vh', background: 'linear-gradient(to right,rgb(248, 248, 250),rgb(204, 208, 218))' }}>
            <Box sx={{width: '96%', height: '80px', mb: '10px', ml: '30px' , mr: '20px'}}>
               <Header2 />
            </Box>
            <Box
                sx={{
                    maxWidth: 1400,
                    mx: 'auto',
                    padding: 0,
                    overflowY: 'auto',
                    height: 'calc(100vh - 100px)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.5, ml: 2 }}>
                    <IconButton onClick={handleGoHome} size="small" sx={{ mr: 0.5 }}>
                        <img src={leftarrow} alt="Info" style={{ width: 24, height: 24, color: '#555' }} />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontSize: { xs: 18, sm: 20, md: 24 }, color: '#333', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        Generative Blog Posts
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#777', fontSize: 14, mb: 1, ml: 2 }}>
                    Provide COR with your press release details, and we'll deliver an exceptional, professionally crafted release.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '0 2px',
                        borderRadius: '0px 0px 25px 25px',
                        height: 'auto',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '100%', md: '45%', lg: '40%' }, padding: 1, overflowY: 'auto' }}>
                        <BLogArea onBlogGenerated={setGeneratedBlog} />
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: '100%', md: '55%', lg: '60%' }, padding: 0, pt:1, overflowY: 'auto', height: 'auto',pb:2 }}>
                        <Texteditor initialContent={draftContent || generatedBlog || 'Publish'} draftId={draftId} userEmail={userEmail} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Blogs;