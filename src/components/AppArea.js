import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import recto from '../assests/Rectangle 133.png';
import rectb from '../assests/Rectangle 134.png';
import invoice from '../assests/invoice.png';
import agenda from '../assests/agenda.png';
import eye from '../assests/eye.png';
import icon from '../assests/Icon.png';
import { useNavigate } from 'react-router-dom';
import '../styles/AppArea.css';
import { getDrafts } from '../services/api';
import PressPreviewModal from './PressPreviewModal';
import PreviewModal from './PreviewModal';
import { useSelector, useDispatch } from 'react-redux';
import { useSignup } from '../shared/SignupContext';
import { useMediaQuery } from '@mui/material';
import Modal from '@mui/material/Modal';

const AppArea = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [drafts, setDrafts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [previewDraft, setPreviewDraft] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [modalOpenSmall, setModalOpenSmall] = useState(false);
    const [modalTypeSmall, setModalTypeSmall] = useState(null);
    const [staticModalOpen, setStaticModalOpen] = useState(false);
    const navigate = useNavigate();
    const signupData = useSelector((state) => state.signup);
    const email = signupData.email;
    const isSmallScreen = useMediaQuery('(max-width:1200px)');

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const data = await getDrafts(); 
                const userDrafts = data.filter(draft => draft.email === email);
                console.log('Fetched drafts for user:', userDrafts);
                setDrafts(userDrafts);
            } catch (error) {
                setDrafts([]);
            }
        };
        if (email) fetchDrafts();
    }, [email]);

    const handlePreview = (type) => {
        // Find the most recent draft of the requested type
        const filteredDrafts = drafts.filter(d => 
            (type === 'press' && d.type === 'Press Release') ||
            (type === 'blog' && d.type === 'Blog')
        );
        console.log('Filtered drafts for preview:', filteredDrafts);
        // Sort by date descending (most recent first)
        const sortedDrafts = filteredDrafts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const draft = sortedDrafts[0];
        if (draft) {
            setPreviewDraft(draft);
            setModalType(type);
            setModalOpen(true);
        } else {
            alert(`No ${type === 'press' ? 'Press Release' : 'Blog'} drafts available for preview.`);
        }
    };

    const handleModalOpenSmall = (type) => {
        setModalTypeSmall(type);
        setModalOpenSmall(true);
    };

    const handleModalCloseSmall = () => {
        setModalOpenSmall(false);
        setModalTypeSmall(null);
    };

    const handleStaticPreview = () => {
        setStaticModalOpen(true);
    };

    return (
        <Box className="app-container">
            <Typography variant="h5" className="app-title">
                <span className='span'>AI-Powered Content</span> Press, Blogs & Docs
            </Typography>

            <Typography variant="body2" className="app-subtitle">
                Popularised in the recently with the release of Letraset sheets containing
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: '24px' }} className="app-cards">
                <Box>
                    <Paper
                        elevation={2}
                        onMouseEnter={() => !isSmallScreen && setHoveredCard('press')}
                        onMouseLeave={() => !isSmallScreen && setHoveredCard(null)}
                        className={`card-common ${hoveredCard === 'press' ? 'card-hovered' : ''}`}
                    >
                        <Box
                            className="icon-box"
                            style={{ backgroundImage: `url(${rectb})` }}
                        >
                            <img src={invoice} alt="invoice" style={{ width: '50%', height: '50%' }} />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#878787', fontWeight: 500 }}>
                                Create Press Releases
                            </Typography>
                            <Typography variant="h6" sx={{ mr: 1, fontWeight: 600 }}>
                                Press Release from scratch
                            </Typography>
                        </Box>

                        {!isSmallScreen && hoveredCard === 'press' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="button-common"
                                    style={{ backgroundColor: 'white', color: '#0C3944' }}
                                    onClick={handleStaticPreview}
                                >
                                    <img src={eye} alt="Preview" style={{ width: 16, height: 16 }} />
                                    Preview
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button-common"
                                    style={{ backgroundColor: 'black', color: 'white' }}
                                    onClick={() => navigate('/press-releases')}                                 
                                >
                                    <img src={icon} alt="Create" style={{ width: 16, height: 16 }} />
                                    Create
                                </Button>
                            </Box>
                        )}

                        <IconButton className="icon-button" onClick={e => isSmallScreen ? handleModalOpenSmall('press') : null}>
                            <MoreVertIcon />
                        </IconButton>
                    </Paper>
                </Box>

                <Box>
                    <Paper
                        elevation={2}
                        onMouseEnter={() => !isSmallScreen && setHoveredCard('blog')}
                        onMouseLeave={() => !isSmallScreen && setHoveredCard(null)}
                        className={`card-common ${hoveredCard === 'blog' ? 'card-hovered' : ''}`}
                    >
                        <Box
                            className="icon-box"
                            style={{ backgroundImage: `url(${recto})` }}
                        >
                            <img src={agenda} alt="agenda" style={{ width: '50%', height: '50%' }} />
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: '#878787', fontWeight: 500 }}>
                                Create Blog Posts
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#0C3944', fontWeight: 600 }}>
                                Blogs from scratch
                            </Typography>
                        </Box>

                        {!isSmallScreen && hoveredCard === 'blog' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="button-common"
                                    style={{ backgroundColor: 'white', color: '#0C3944' }}
                                    onClick={handleStaticPreview}
                                >
                                    <img src={eye} alt="Preview" style={{ width: 16, height: 16 }} />
                                    Preview
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button-common"
                                    style={{ backgroundColor: 'black', color: 'white' }}
                                    onClick={() => navigate('/blogs')}
                                >
                                    <img src={icon} alt="Create" style={{ width: 16, height: 16 }} />
                                    Create
                                </Button>
                            </Box>
                        )}

                        <IconButton className="icon-button" onClick={e => isSmallScreen ? handleModalOpenSmall('blog') : null}>
                            <MoreVertIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
            <Modal
                open={modalOpenSmall}
                onClose={handleModalCloseSmall}
                aria-labelledby="action-modal-title"
                aria-describedby="action-modal-description"
            >
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                        minWidth: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    {modalTypeSmall === 'press' && (
                        <>
                            <Button
                                variant="contained"
                                size="small"
                                className="button-common"
                                style={{ backgroundColor: 'white', color: '#0C3944', width: 160 }}
                                onClick={() => { handleStaticPreview(); handleModalCloseSmall(); }}
                            >
                                <img src={eye} alt="Preview" style={{ width: 16, height: 16 }} />
                                Preview
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className="button-common"
                                style={{ backgroundColor: 'black', color: 'white', width: 160 }}
                                onClick={() => { navigate('/press-releases'); handleModalCloseSmall(); }}
                            >
                                <img src={icon} alt="Create" style={{ width: 16, height: 16 }} />
                                Create
                            </Button>
                        </>
                    )}
                    {modalTypeSmall === 'blog' && (
                        <>
                            <Button
                                variant="contained"
                                size="small"
                                className="button-common"
                                style={{ backgroundColor: 'white', color: '#0C3944', width: 160 }}
                                onClick={() => { handleStaticPreview(); handleModalCloseSmall(); }}
                            >
                                <img src={eye} alt="Preview" style={{ width: 16, height: 16 }} />
                                Preview
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className="button-common"
                                style={{ backgroundColor: 'black', color: 'white', width: 160 }}
                                onClick={() => { navigate('/blogs'); handleModalCloseSmall(); }}
                            >
                                <img src={icon} alt="Create" style={{ width: 16, height: 16 }} />
                                Create
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
            {modalType === 'press' && previewDraft && (
                <PressPreviewModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={previewDraft.title || 'No Title'}
                    body={previewDraft.content || 'No Content'}
                    onPublish={() => setModalOpen(false)}
                />
            )}
            {modalType === 'blog' && previewDraft && (
                <PreviewModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={previewDraft.title || 'No Title'}
                    body={previewDraft.content || 'No Content'}
                    onPublish={() => setModalOpen(false)}
                />
            )}
            <Modal
                open={staticModalOpen}
                onClose={() => setStaticModalOpen(false)}
                aria-labelledby="static-modal-title"
                aria-describedby="static-modal-description"
            >
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        width: { xs: '90vw', sm: 700 },
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#ccc',
                            borderRadius: '4px',
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ccc #f5f5f5',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Typography id="static-modal-title" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales elementum dapibus.
                        </Typography>
                        <IconButton onClick={() => setStaticModalOpen(false)}>
                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>&times;</span>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#222' }}>11 July 2025 | <span style={{ color: '#222' }}>Kolhapur</span></Typography>
                        <Typography variant="caption" sx={{ color: '#222' }}>By: OM Shelar</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#222', mb: 2 }}>
                        Integer id leo ut ex mollis rhoncus eget eget nibh. Sed pellentesque feugiat mi quis fringilla. Morbi ac viverra magna, in ultrices elit. Mauris risus nisl, dictum vitae tellus nec, rutrum dictum quam.
                    </Typography>
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <img src="https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg" alt="meeting" style={{ width: '100%', borderRadius: 8, maxHeight: 300, objectFit: 'cover' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
                        Donec quis sem porttitor, viverra velit id, rutrum ex. Ut a accumsan libero. Curabitur at sagittis velit. Praesent facilisis arcu sed consequat ullamcorper. Praesent feugiat risus libero, sed aliquam enim pellentesque quis. Quisque ipsum nunc, pretium in nunc ullamcorper, congue luctus sem.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
                        Aenean mollis feugiat faucibus. Donec sed nisi sit amet sem finibus interdum nec nec nibh. Aliquam tempor iaculis vulputate. Mauris porta varius turpis et venenatis. Aliquam velit nulla, mattis eget quam nec, porta condimentum urna. Vestibulum eget erat nec eros eu augue finibus tincidunt.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>
                        Vestibulum eget erat nec eros eu augue finibus tincidunt
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#222', mb: 2 }}>
                        Praesent feugiat risus libero, sed aliquam enim pellentesque quis. Quisque ipsum nunc, pretium in nunc ullamcorper. Aliquam tempor iaculis vulputate. Mauris porta varius turpis et venenatis. Aliquam velit nulla, mattis eget quam nec.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button 
                            variant="outlined" 
                            onClick={() => setStaticModalOpen(false)} 
                            sx={{ 
                                borderRadius: 8, 
                                px: 4, 
                                backgroundColor: 'white', 
                                color: 'black', 
                                border: '1px solid black',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid black',
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ borderRadius: 8, px: 4, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#222' } }}
                            onClick={() => alert('This is a Preview Modal that cannot be Published')}
                        >
                            Publish
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AppArea;
