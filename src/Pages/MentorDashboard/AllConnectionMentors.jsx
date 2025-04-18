import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Connection from '../Admin/Connection';

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
  
const AllConnectionMentors = ({connection}) => {
    const [value, setValue] = React.useState(0);

    const ActieConnection = connection?.filter(item => item.isActive)
    const ClosedConnection = connection?.filter(item => !item.isActive)
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Open Conn." {...a11yProps(0)} />
            <Tab label="Closed Conn." {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <Connection connection={ActieConnection} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <Connection connection={ClosedConnection} />
        </CustomTabPanel>
      </Box>
    );
}

export default AllConnectionMentors