import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import EditPersonalInfo from "./EditPersonalInfo";
import EditMentorInfo from "./EditMentorInfo";
import MetaData from "../../utils/Metadata";

const EditProfile = () => {
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
        <MetaData title="Edit Profile" />

      <Box
        sx={{
          width: { xs: "90%", md: "50%", lg: "30%" },
          mr: "auto",
          ml: "auto",
          border: "0.5px solid  grey",
          borderRadius: "1vmax",
          overflow: "hidden",
          mt: "2vmax",
          mb: "2vmax",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ justifyContent: "center", backgroundColor: "#2b2b2b" }}
          >
            <Tab
              sx={{ minWidth: "50%", color: "white" }}
              label="Personal Info"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ minWidth: "50%", color: "white" }}
              label="Mentorship Info"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <EditPersonalInfo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <EditMentorInfo />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default EditProfile;
