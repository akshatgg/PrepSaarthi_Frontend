import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ActiveMentors } from './MentorsPresent';
import { useDispatch, useSelector } from 'react-redux';
import { allMentors } from '../../action/userAction';
import Loader from '../../Components/Loader/Loader';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p:3 }}>{children}</Box>}
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
  const AllMentors = () => {
    const {mentors,loading,error} = useSelector(state => state.headMentor)
      const dispatch = useDispatch()
      const [value, setValue] = React.useState(0);
      
      const handleChange = (event, newValue) => {
          setValue(newValue);
        };

    useEffect(() => {
        dispatch(allMentors())
    }, [dispatch])

    const activeMentor = mentors?.filter(item => item.mentoringStatus === 'active')
    const inActiveMentor = mentors?.filter(item => item.mentoringStatus === 'inactive')
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Active Mentors" {...a11yProps(0)} />
          <Tab label="Inactive Mentors" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      {loading === false ? <ActiveMentors requests={activeMentor} /> : <Loader/> }
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      {loading === false ? <ActiveMentors requests={inActiveMentor} /> : <Loader/> }
      </CustomTabPanel>

    </Box>
    </>
  )
}

export default AllMentors