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
    const navigate = useNavigate();
    const signupData = useSelector((state) => state.signup);
    const email = signupData.email;
    const isSmallScreen = useMediaQuery('(max-width:1200px)');

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const data = await getDrafts();
                // Filter drafts by logged-in user's email
                const userDrafts = data.filter(draft => draft.email === email);
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
                                    onClick={() => handlePreview('press')}
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
                                    onClick={() => handlePreview('blog')}
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
                                onClick={() => { handlePreview('press'); handleModalCloseSmall(); }}
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
                                onClick={() => { handlePreview('blog'); handleModalCloseSmall(); }}
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
        </Box>
    );
};

export default AppArea;
