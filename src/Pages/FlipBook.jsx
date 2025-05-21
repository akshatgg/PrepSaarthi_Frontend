import React from 'react'
import './flipbook.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Box } from '@mui/material'
import VideoLecture from './VideoLecture/VideoLecture';
import Tracker from './tracker/tracker.jsx';
import { useEffect } from 'react';
const FlipBook = () => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
//   useEffect(() => {
//   // Run this when needed (e.g., on a reset button click or tab switch)
//   ['lectureNotes-math', 'lectureNotes-physics', 'lectureNotes-chemistry'].forEach(key => {
//     localStorage.removeItem(key);
//   });
// }, []);

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs sx={{"& .MuiTabs-flexContainer":{justifyContent:'center'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="IIT JEE Video Lectures" {...a11yProps(0)}  sx={{ fontSize: {xs:'1.25vmax',md:'0.9vmax'} }}/>
        <Tab label="IIT JEE Syllabus Tracker" {...a11yProps(1)} sx={{ fontSize: {xs:'1.25vmax',md:'0.9vmax'} }}/>
      </Tabs>
    </Box>
    <CustomTabPanel  value={value} index={0}>
      <VideoLecture />  
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
     <Tracker />
    </CustomTabPanel>
  </Box>
  )
}

export default FlipBook