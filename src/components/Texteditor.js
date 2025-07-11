import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Texteditor.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { saveDraft, updateDraft } from '../services/api';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

const Texteditor = ({ initialContent = '', draftId, userEmail }) => {
    const [content, setContent] = useState(initialContent);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const type = location.pathname.includes('/press') ? 'Press Release'
               : location.pathname.includes('/blogs') ? 'Blog'
               : null;
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (initialContent && initialContent !== content) {
            setContent(initialContent);
        }
    }, [initialContent]);

    // Function to convert markdown-like syntax to HTML
    const markdownToHtml = (markdown) => {
        return markdown
            .split('\n')
            .map((line) => {
                if (line.startsWith('### ')) {
                    return `<h3>${line.substring(4)}</h3>`; // Convert ### to h3
                }
                if (line.startsWith('## ')) {
                    return `<h2>${line.substring(3)}</h2>`; // Convert ## to h2
                }
                if (line.startsWith('# ')) {
                    return `<h1>${line.substring(2)}</h1>`; // Convert # to h1
                }
                if (line.startsWith('> ')) {
                    return `<blockquote>${line.substring(2)}</blockquote>`; // Convert > to blockquote
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                    return `<ul><li>${line.substring(2)}</li></ul>`; // Convert unordered lists
                }
                if (line.match(/\[([^\]]+)\]\(([^\)]+)\)/)) {
                    const matches = line.match(/\[([^\]]+)\]\(([^\)]+)\)/);
                    return `<a href="${matches[2]}">${matches[1]}</a>`; // Convert markdown links to <a> tags
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                    return `<strong>${line.substring(2, line.length - 2)}</strong>`; // Convert **bold**
                }
                return `<p>${line}</p>`; // Default: wrap text in <p>
            })
            .join('');
    };

    const handleEdit = () => {
        setIsReadOnly(false);
    };

    const handlePublish = async () => {
        setIsReadOnly(true);
        if (!type) {
            setSnackbar({ open: true, message: 'Invalid draft type. Please use Press Release or Blog.', severity: 'error' });
            setIsReadOnly(false);
            return;
        }
        if (!userEmail) {
            setSnackbar({ open: true, message: 'No user email found. Please log in again.', severity: 'error' });
            setIsReadOnly(false);
            return;
        }
        try {
            if (draftId) {
                await updateDraft(draftId, { type, content: content, userEmail });
                setSnackbar({ open: true, message: 'Draft updated!', severity: 'success' });
            } else {
                await saveDraft({ type, content: content, userEmail });
                setSnackbar({ open: true, message: 'Draft saved!', severity: 'success' });
            }
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to save draft', severity: 'error' });
        }
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '860px',
            position: 'relative',
            mx: 'auto',
            px: isMobile ? 2 : 3,
            ml: 0,
        }}>
            <div
                className="editor-container"
                style={{
                    height: isMobile ? '400px' : '547px',
                    position: 'relative',
                    borderRadius: '25px',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                }}
            >
                <div style={{
                    height: '100%',
                    overflowY: 'auto',
                    paddingBottom: isMobile ? '70px' : '70px', // space for buttons
                }}>
                    {isReadOnly ? (
                        <div
                            style={{
                                padding: '20px',
                                fontFamily: 'Urbanist, sans-serif',
                                fontSize: isMobile ? '14px' : '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} // Convert markdown to HTML
                        />
                    ) : (
                        <Editor
                            value={content}
                            onTextChange={(e) => setContent(e.htmlValue)}
                            style={{ height: '100%' }}
                            contentStyle={{
                                fontFamily: 'Urbanist, sans-serif',
                                color: 'lightgrey',
                                minHeight: isMobile ? '330px' : '477px',
                                backgroundColor: 'white',
                                fontSize: isMobile ? '14px' : '16px',
                                overflowY: 'auto',
                                paddingBottom: isMobile ? '70px' : '70px',
                            }}
                        />
                    )}
                </div>
                {isReadOnly && (
                    <div
                        className="editor-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            zIndex: 1,
                            pointerEvents: 'all',
                            cursor: 'not-allowed',
                        }}
                    />
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        gap: '10px',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: isMobile ? 'center' : 'flex-end',
                        p: 2,
                        background: 'white',
                        borderBottomLeftRadius: '25px',
                        borderBottomRightRadius: '25px',
                        zIndex: 2,
                    }}
                >
                    {/* Edit button removed since editor is always editable */}
                    <button
                        onClick={handlePublish}
                        style={{
                            width: isMobile ? '100%' : '150px',
                            padding: '8px 12px',
                            backgroundColor: '#e0e0e0',
                            border: 'none',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            fontSize: isMobile ? '12px' : '14px',
                            transition: 'background-color 0.3s ease',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#000')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                    >
                        Save the Document
                    </button>
                </Box>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default Texteditor;
