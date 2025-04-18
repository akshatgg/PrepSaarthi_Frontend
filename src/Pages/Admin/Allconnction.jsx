import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import { Box, Button, Tabs } from "@mui/material";

import Connection from "./Connection";
import { useSelector } from "react-redux";
import MetaData from "../../utils/Metadata";
const Allconnction = () => {
  const [newConnection, setNewConnection] = useState([]);
  const [activeConnection, setActiveConnection] = useState([]);
  const [resolvedConnection, setResolvedConnection] = useState([]);
  const { connection, loading } = useSelector(
    (state) => state.connections
  );
  // useEffect(() => {
  //   dispatch(getAllConnections());
  // }, [dispatch]);
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(connection?.connection)
   }, [connection])
  useEffect(() => {
    if (loading === false) {
      const pendingConnections = array?.filter((item) => {
        if (item.isActive === true && item.isConnected === false) {
          return item;
        }
        else
        {
          return false
        }
      });
      const approvedConnections = array?.filter((item) => {
        if (item.isActive === true && item.isConnected === true) {
          return item;
        }
        return false
      });
      const resolvedConnections = array?.filter((item) => {
        if (item.isActive === false && item.isConnected === false) {
          return item;
        }
        return false
      });

      setNewConnection(pendingConnections);
      setActiveConnection(approvedConnections);
      setResolvedConnection(resolvedConnections);
    }
  }, [loading,connection?.connection, array]);
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="_mentor-inf0-section"
        style={{ height: "100%" }}
      >
        {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
        <MetaData title="Connections" />
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Button sx={{mb:'8px', width:{xs:'20vmax', md:'10vmax'}}} variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ justifyContent: "center", backgroundColor: "#2b2b2b" }}
        >
          <Tab
            sx={{ minWidth: "30%", color: "white" }}
            label="Pending"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ minWidth: "30%", color: "white" }}
            label="Active"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ minWidth: "30%", color: "white" }}
            label="Resolved"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {loading === false && <Connection connection={newConnection} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {loading === false && <Connection connection={activeConnection} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {loading === false && <Connection connection={resolvedConnection} />}
      </CustomTabPanel>
    </Box>
    </>
  );
};

export default Allconnction;
