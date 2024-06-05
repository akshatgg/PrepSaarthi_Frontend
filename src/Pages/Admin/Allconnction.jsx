import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import { Box, Tabs } from "@mui/material";

import Connection from "./Connection";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnections } from "../../action/userAction";
const Allconnction = () => {
  const dispatch = useDispatch();
  const [newConnection, setNewConnection] = useState([]);
  const [activeConnection, setActiveConnection] = useState([]);
  const [resolvedConnection, setResolvedConnection] = useState([]);
  const { connection, loading } = useSelector(
    (state) => state.connections
  );
  useEffect(() => {
    dispatch(getAllConnections());
  }, [dispatch]);

  useEffect(() => {
    if (loading === false) {
      const pendingConnections = connection?.connection?.filter((item) => {
        if (item.isActive === true && item.isConnected === false) {
          return item;
        }
        else
        {
          return false
        }
      });
      const approvedConnections = connection?.connection?.filter((item) => {
        if (item.isActive === true && item.isConnected === true) {
          return item;
        }
        return false
      });
      const resolvedConnections = connection?.connection?.filter((item) => {
        if (item.isActive === false && item.isConnected === false) {
          return item;
        }
        return false
      });

      setNewConnection(pendingConnections);
      setActiveConnection(approvedConnections);
      setResolvedConnection(resolvedConnections);
    }
  }, [loading,connection?.connection]);
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
  );
};

export default Allconnction;
