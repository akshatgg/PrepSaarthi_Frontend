import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Tracker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subject, setSubject] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event, subject) => {
    setAnchorEl(event.currentTarget);
    setSubject(subject);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSubject(null);
  };

  // Function to handle navigation with data transfer
  const handleMenuItemClick = (division) => {
    navigate('/syllabus/drawer', { state: { subject, division } });
    handleCloseMenu();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        p: 2,
        maxHeight:{xs:'65vh', md:'45vh'}
      }}
    >
      <Box
        sx={{
          p: 4,
          backgroundColor: '#fff',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          IIT JEE Syllabus Tracker
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => handleOpenMenu(event, 'Physics')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Physics
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(event) => handleOpenMenu(event, 'Chemistry')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Chemistry
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={(event) => handleOpenMenu(event, 'Math')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Math
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              minWidth: '150px',
              padding: '10px 0',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            },
          }}
        >
          {subject && (
            <>
              <MenuItem
                onClick={() => handleMenuItemClick(11)}
                sx={{
                  fontWeight: 'bold',
                  color: subject === 'Physics' ? '#1976d2' : subject === 'Chemistry' ? '#d32f2f' : '#2e7d32',
                  '&:hover': {
                    backgroundColor: subject === 'Physics' ? '#e3f2fd' : subject === 'Chemistry' ? '#ffebee' : '#e8f5e9',
                  },
                }}
              >
                {subject} - Class 11
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(12)}
                sx={{
                  fontWeight: 'bold',
                  color: subject === 'Physics' ? '#1976d2' : subject === 'Chemistry' ? '#d32f2f' : '#2e7d32',
                  '&:hover': {
                    backgroundColor: subject === 'Physics' ? '#e3f2fd' : subject === 'Chemistry' ? '#ffebee' : '#e8f5e9',
                  },
                }}
              >
                {subject} - Class 12
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default Tracker;
