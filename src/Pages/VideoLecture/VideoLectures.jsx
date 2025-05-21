// VideoLectures.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  IconButton,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NoteIcon from '@mui/icons-material/Note';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';

// Import sample data files
import PhysicsData from './VideoLecturePhysicsData.json';
import ChemistryData from './VideoLectureChemistryData.json';
import MathData from './VideoLectureMathData.json';

const dataMap = {
  physics: PhysicsData,
  chemistry: ChemistryData,
  math: MathData
};

const Complete = ({ checked, onChange }) => (
  <Checkbox checked={checked} onChange={onChange} color="primary" />
);

const VideoLectures = () => {
  const { subject } = useParams();
  const [displayData, setDisplayData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Dropdown state for subject menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubjectSelect = (selectedSubject) => {
    navigate(`/video/track/${selectedSubject}`);
    setAnchorEl(null);
  };

  // Load data and merge with localStorage data
  useEffect(() => {
    const loadData = () => {
      try {
        // Get base data from imported JSON
        const baseData = dataMap[subject] || [];
        
        // Only retrieve user progress from localStorage
        const savedProgress = localStorage.getItem(`lectureProgress-${subject}`);
        
        if (savedProgress) {
          // Parse saved progress
          const userProgress = JSON.parse(savedProgress);
          
          // Merge base data with user progress
          const mergedData = baseData.map(item => {
            const progress = userProgress[item.id];
            return {
              ...item,
              completed: progress?.completed || false,
              note: progress?.note || ''
            };
          });
          
          setDisplayData(mergedData);
        } else {
          // If no saved progress, use base data as is
          setDisplayData(baseData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setDisplayData(dataMap[subject] || []);
      }
    };

    loadData();
  }, [subject]);

  // Save only user progress data
  const saveUserProgress = (updatedData) => {
    try {
      // Create an object with only user progress data
      const progressData = {};
      
      updatedData.forEach(item => {
        // Only store items with notes or completion status
        if (item.note || item.completed) {
          progressData[item.id] = {
            completed: item.completed || false,
            note: item.note || ''
          };
        }
      });
      
      // Save only the progress data to localStorage
      localStorage.setItem(`lectureProgress-${subject}`, JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleNoteClick = (row) => {
    setSelectedNote(row);
    setNoteText(row.note || '');
    setOpen(true);
  };

  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedData = displayData.map(item => 
      item.id === selectedNote.id ? { ...item, note: noteText } : item
    );
    
    setDisplayData(updatedData);
    saveUserProgress(updatedData);
    setOpen(false);
  };

  const handleCompletionChange = (id) => {
    const updatedData = displayData.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setDisplayData(updatedData);
    saveUserProgress(updatedData);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
    setNoteText('');
  };

  if (!displayData.length) return <Typography variant="h6">Loading...</Typography>;

  // Determine the split point for Class 11 vs Class 12 based on subject
const splitPoint = subject === "physics" ? 18 : 
                   subject === "chemistry" ? 24 : 
                   subject === "math" ? 23 : 0;


  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Title on Left and Dropdown on Right */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3"  align="center" sx={{ flexGrow: 1 }}>
          {subject.charAt(0).toUpperCase() + subject.slice(1)} Video Lectures
        </Typography>
        <Box>
          <Button 
            variant="outlined"
            onClick={handleMenuClick}
            sx={{ textTransform: 'capitalize' }}
          >
            Subjects
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleSubjectSelect('physics')}>Physics</MenuItem>
            <MenuItem onClick={() => handleSubjectSelect('chemistry')}>Chemistry</MenuItem>
            <MenuItem onClick={() => handleSubjectSelect('math')}>Mathematics</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Class 11 Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Class 11th Topics
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Topic
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Video
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Notes
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Completed
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {displayData.filter(row => row.id < splitPoint).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }} />
                  </a>
                </TableCell>
                <TableCell 
                  onClick={() => handleNoteClick(row)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Complete
                    checked={row.completed || false}
                    onChange={() => handleCompletionChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Class 12 Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Class 12th Topics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Topic
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Video
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
                Notes
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                Completed
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {displayData.filter(row => row.id >= splitPoint).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <a href={row.videoLink} target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }} />
                  </a>
                </TableCell>
                <TableCell 
                  onClick={() => handleNoteClick(row)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  {row.note ? (
                    <NoteIcon color="primary" />
                  ) : (
                    <EditNoteIcon color="action" />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Complete
                    checked={row.completed || false}
                    onChange={() => handleCompletionChange(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Note Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            minHeight: '400px',
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">
            Notes for: {selectedNote?.topic}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={8}
            maxRows={12}
            variant="outlined"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Start typing your notes here..."
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1.1rem',
                lineHeight: 1.5
              }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSaveNote}
            disabled={noteText === (selectedNote?.note || '')}
            sx={{ px: 4, py: 1 }}
          >
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoLectures;