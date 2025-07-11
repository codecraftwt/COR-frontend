import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Chip, IconButton, Tooltip, Paper, useMediaQuery, Snackbar
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MuiAlert from '@mui/material/Alert';
import '../styles/draftbox.css';
import { getDrafts, deleteDraft } from '../services/api';
import { useNavigate } from 'react-router-dom';
// import documenttext from '../assests/document-text.png';
import draftpress from '../assests/draft-press.png';
import draftblog from '../assests/draft-blog.png';
// import documentpaper from '../assests/document-paper.png';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { setDraftsForUser, selectDraftsByUser } from '../store/draftsSlice';

const groupDraftsByDate = (drafts) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const recent = [];
  const pastWeek = [];

  drafts.forEach((draft) => {
    if (!draft.date) return;
    const draftDate = new Date(draft.date);
    draftDate.setHours(0, 0, 0, 0);
    if (draftDate.getTime() === today.getTime()) {
      recent.push(draft);
    } else if (draftDate > oneWeekAgo && draftDate < today) {
      pastWeek.push(draft);
    }
  });

  return { recent, pastWeek };
};

const typeStyles = {
  'Press Release': { bg: '#C4EFED' },
  'Blog': { bg: '#FAEECD'},
};

const DraftCard = ({ draft, onEdit, onDelete }) => {
  const { bg } = typeStyles[draft.type] || { bg: '#ccc' };

  return (
    <Paper
      elevation={draft.highlight ? 4 : 1}
      sx={{
        mb: 2,
        borderRadius: '10px',
        border: '1px solid #C4D7DB',
        boxShadow: draft.highlight ? '0 2px 8px #e3e8ef' : 'none',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 2px 12px #e3e8ef', border: '1px solid #7CADB9', bgcolor: '#F1F5F8' },
        height: '93px',
        width: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <Box display="flex" alignItems="center" flex={2} minWidth={0} >
        <Box
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            bgcolor: bg,
          }}
        >
          <img
            src={draft.type === 'Press Release' ? draftpress : draftblog}
            alt={draft.type === 'Press Release' ? 'draftpress' : 'draftblog'}
            style={{
              width: 14,
              height: 14,
              // objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
          {draft.content.replace(/<[^>]+>/g, '').slice(0, 50) + '...'}
        </Typography>
      </Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Chip
          label={draft.type === 'Press Release' ? 'Press Release' : 'Blog Post'}
          color={draft.type === 'Press Release' ? 'info' : 'warning'}
          size="small"
          sx={{ fontSize: '12px', px: 2, background: draft.type === 'Press Release' ? '#C4EFED' : '#FAEECD', color: draft.type === 'Press Release' ? '#404265' : '#404265', fontWeight: 600, height: '26px', minWidth: '10px' }}
        />
      </Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Typography variant="body2" noWrap sx={{ color: '#6B7280' }}>
          {draft.email || 'mo@a2.com'}
        </Typography>
      </Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Typography variant="body2" sx={{ color: '#6B7280' }}>
          {draft.date ? new Date(draft.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
        </Typography>
      </Box>
      <Box flexShrink={0} display="flex" alignItems="center" gap={0.5}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEdit(draft)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => onDelete(draft)}>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

const DraftBox = () => {
  // Get user email from Redux
  const userEmail = useSelector(
    (state) => state.user.email || state.signup.signupData.email
  );
  const dispatch = useDispatch();
  const drafts = useSelector((state) => selectDraftsByUser(state, userEmail));
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        if (!userEmail) return;
        const data = await getDrafts(userEmail);
        dispatch(setDraftsForUser({ userEmail, drafts: data }));
      } catch (error) {
        console.error('Failed to fetch drafts:', error);
      }
    };
    fetchDrafts();
  }, [userEmail, dispatch]);

  const { recent, pastWeek } = groupDraftsByDate(drafts);

  const sortDrafts = (draftList) => {
    const sorted = [...draftList];
    sorted.sort((a, b) => {
      const { key, direction } = sortConfig;
      let aValue = a[key] || '';
      let bValue = b[key] || '';
      if (key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedRecent = sortDrafts(recent);
  const sortedPastWeek = sortDrafts(pastWeek);

  const handleEdit = (draft) => {
    if (draft.type === 'Press Release') {
      navigate('/press-releases', { state: { draft } });
    } else if (draft.type === 'Blog') {
      navigate('/blogs', { state: { draft } });
    }
  };

  const handleDelete = async (draft) => {
    if (!draft._id && !draft.id) return;
    const id = draft._id || draft.id;
    if (window.confirm('Are you sure you want to delete this draft?')) {
      try {
        await deleteDraft(id);
        dispatch(setDraftsForUser({ userEmail, drafts: drafts.filter((d) => (d._id || d.id) !== id) }));
        setSnackbar({ open: true, message: 'Draft deleted!', severity: 'success' });
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to delete draft', severity: 'error' });
      }
    }
  };

  const renderDraftCards = (draftList) =>
    draftList.length === 0 ? (
      <Typography variant="body2" align="center" sx={{ color: '#888', my: 2 }}>
        No drafts found.
      </Typography>
    ) : (
      draftList.map((draft, index) => (
        <DraftCard
          key={draft.id || draft._id || index}
          draft={draft}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))
    );

  return (
    <Box sx={{
      p: isMobile ? 1 : 2,
      width: '100%',
      overflow: 'hidden',
      maxWidth: { xs: '100vw', sm: '100vw' },
    }}>
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: 600,
        fontSize: { xs: '24px', sm: '32px' },
      }}>
        Drafts
      </Typography>
       <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Recent
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: 2,
          background: '#FFFFFF',
          fontWeight: 600,
          color: '#0C3944',
          fontSize: '1rem',
          minWidth: 600,
          overflowX: isMobile ? 'auto' : 'visible',
          whiteSpace: isMobile ? 'nowrap' : 'normal',
        }}
      >
        <Box flex={2} minWidth={0} pl={2} display="flex" alignItems="center">
          Title
          <Box display="flex" flexDirection="column" ml={0.5}>
            <IconButton size="small" onClick={() => handleSort('content')} sx={{ p: 0 }}>
              <KeyboardArrowUpOutlinedIcon fontSize="inherit" color={sortConfig.key === 'content' && sortConfig.direction === 'asc' ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton size="small" onClick={() => handleSort('content')} sx={{ p: 0 }}>
              <KeyboardArrowDownOutlinedIcon fontSize="inherit" color={sortConfig.key === 'content' && sortConfig.direction === 'desc' ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
        </Box>
        <Box flex={1} textAlign="center" display="flex" alignItems="center" justifyContent="center">
          App
          <Box display="flex" flexDirection="column" ml={0.5}>
            <IconButton size="small" onClick={() => handleSort('type')} sx={{ p: 0 }}>
              <KeyboardArrowUpOutlinedIcon fontSize="inherit" color={sortConfig.key === 'type' && sortConfig.direction === 'asc' ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton size="small" onClick={() => handleSort('type')} sx={{ p: 0 }}>
              <KeyboardArrowDownOutlinedIcon fontSize="inherit" color={sortConfig.key === 'type' && sortConfig.direction === 'desc' ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
        </Box>
        <Box flex={1} textAlign="center" display="flex" alignItems="center" justifyContent="center">
          By
          <Box display="flex" flexDirection="column" ml={0.5}>
            <IconButton size="small" onClick={() => handleSort('email')} sx={{ p: 0 }}>
              <KeyboardArrowUpOutlinedIcon fontSize="inherit" color={sortConfig.key === 'email' && sortConfig.direction === 'asc' ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton size="small" onClick={() => handleSort('email')} sx={{ p: 0 }}>
              <KeyboardArrowDownOutlinedIcon fontSize="inherit" color={sortConfig.key === 'email' && sortConfig.direction === 'desc' ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
        </Box>
        <Box flex={1} textAlign="center" display="flex" alignItems="center" justifyContent="center">
          Date
          <Box display="flex" flexDirection="column" ml={0.5}>
            <IconButton size="small" onClick={() => handleSort('date')} sx={{ p: 0 }}>
              <KeyboardArrowUpOutlinedIcon fontSize="inherit" color={sortConfig.key === 'date' && sortConfig.direction === 'asc' ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton size="small" onClick={() => handleSort('date')} sx={{ p: 0 }}>
              <KeyboardArrowDownOutlinedIcon fontSize="inherit" color={sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
        </Box>
        <Box flexShrink={0} width={48} />
      </Box>
     
      <Box
        minWidth={100}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {renderDraftCards(sortedRecent)}
      </Box>
      <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
        Past Week
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {renderDraftCards(sortedPastWeek)}
      </Box>
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

export default DraftBox;