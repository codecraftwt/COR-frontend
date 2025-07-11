import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const PreviewModal = ({
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
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ position: 'relative', p: { xs: 2, md: 4 }, minHeight: 600 }}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, mt: 2 }}>
          {title}
        </Typography>

        {/* Meta info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#222', fontSize: 13 }}>
            {date}
          </Typography>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#222' }} />
          <Typography variant="body2" sx={{ color: '#222', fontSize: 13 }}>
            {location}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ color: '#222', fontSize: 13, fontWeight: 500 }}>
            By: {author}
          </Typography>
        </Box>

        {/* Intro */}
        <Typography variant="body1" sx={{ color: '#222', mb: 2, fontSize: 15 }}>
          {intro}
        </Typography>

        {/* Image */}
        {image && (
          <Box
            component="img"
            src={image}
            alt="preview"
            sx={{
              width: '100%',
              height: 260,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        {/* Body */}
        <Typography variant="body2" sx={{ color: '#222', fontSize: 15, mb: 2, whiteSpace: 'pre-line' }}>
          {body}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 5, px: 4 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onPublish} sx={{ borderRadius: '30px', px: 4, background: '#000', color: '#fff', '&:hover': { background: '#222' } }} >
            Publish
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal; 