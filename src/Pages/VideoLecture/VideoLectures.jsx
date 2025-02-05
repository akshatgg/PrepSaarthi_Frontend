import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NoteIcon from '@mui/icons-material/Note';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import VideoLectureData from './VideoLectureData.json'
const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const Complete = () => <Checkbox />;

const VideoLectures = () => {
  const [notes, setNotes] = useState(VideoLectureData);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);

  const handleNoteClick = (row) => {
    setSelectedNote(row);
    setNoteText(row.note || '');
    setOpen(true);
  };

  const handleSaveNote = () => {
    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id ? { ...note, note: noteText } : note
    );
    setNotes(updatedNotes);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
   <Typography 
  
  align="center" 
  gutterBottom 
  sx={{ mt: 2, fontSize: { xs: '2rem', sm: '3rem', md: '3rem' } }}
>
  Lectures library PrepSaarthi
</Typography>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeaderCell>Sr. No</StyledHeaderCell>
              <StyledHeaderCell>Physics Class 11th - Topics</StyledHeaderCell>
              <StyledHeaderCell sx={{ textAlign: 'center' }}>Link to Video Lectures</StyledHeaderCell>
              <StyledHeaderCell>Note</StyledHeaderCell>
              <StyledHeaderCell sx={{ textAlign: 'center' }}>Completion</StyledHeaderCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          {notes.filter(row => row.id < 16).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon sx={{ color: '#FF0000' }} />
                  </a>
                </TableCell>
                <TableCell onClick={() => handleNoteClick(row)} style={{ cursor: 'pointer' }}>
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}><Complete /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Add Note
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Note"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveNote} variant="contained" color="primary">
            Save Note
          </Button>
        </DialogActions>
      </Dialog>


      <Typography 
  
  align="center" 
  gutterBottom 
  sx={{ mt: 2, fontSize: { xs: '2rem', sm: '3rem', md: '3rem' } }}
>
  Lectures library PrepSaarthi 
</Typography>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeaderCell>Sr. No</StyledHeaderCell>
              <StyledHeaderCell>Physics Class 12th - Topics</StyledHeaderCell>
              <StyledHeaderCell sx={{ textAlign: 'center' }}>Link to Video Lectures</StyledHeaderCell>
              <StyledHeaderCell>Note</StyledHeaderCell>
              <StyledHeaderCell sx={{ textAlign: 'center' }}>Completion</StyledHeaderCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          {notes.filter(row => row.id >= 16).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon sx={{ color: '#FF0000' }} />
                  </a>
                </TableCell>
                <TableCell onClick={() => handleNoteClick(row)} style={{ cursor: 'pointer' }}>
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}><Complete /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VideoLectures;