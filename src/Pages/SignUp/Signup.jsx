import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import StudentSignUp from "./StudentSignup";
import MentorSignUp from "./MentorSignup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
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
  const { loading, isAuthenticated,user:mUser } = useSelector(
    (state) => state.mentor
  );
  const {
    loading: studentLoad,
    isAuthenticated: studentAuth,
    user:sUser

  } = useSelector((state) => state.student);
  const navigate = useNavigate()

  useEffect(() => {
   
    if (loading === false && isAuthenticated) {
      navigate(`/user/${mUser?.user?._id}`);
    }
    if (studentLoad === false && studentAuth) {
      navigate(`/user/${sUser?.user?._id}`);
    }
  }, [
    loading,
    isAuthenticated,
    studentLoad,
    studentAuth,
    mUser?.user?._id,
    sUser?.user?._id,
    navigate,
  ]);
  return (
    <>
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
              label="Student"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ minWidth: "50%", color: "white" }}
              label="Mentors"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <StudentSignUp />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MentorSignUp />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Signup;
