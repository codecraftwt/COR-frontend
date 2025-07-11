import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PressPreviewModal = ({
  open,
  onClose,
  title,
  date,
  location,
  author,
  intro,
  image,
  body,
  onPublish
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogContent sx={{ p: 4, position: 'relative' }}>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#888', mr: 2 }}>
          {date} | {location}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', ml: 'auto' }}>
          By: <b>{author}</b>
        </Typography>
      </Box>
      <Typography sx={{ mb: 2 }}>{intro}</Typography>
      {image && (
        <Box sx={{ mb: 2 }}>
          <img
            src={image}
            alt="Press"
            style={{ width: '100%', borderRadius: 8, maxHeight: 300, objectFit: 'cover' }}
          />
        </Box>
      )}
      <Typography sx={{ mb: 2, whiteSpace: 'pre-line' }}>{body}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={onPublish} variant="contained" sx={{ background: '#000', color: '#fff' }}>
          Publish
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

export default PressPreviewModal; 