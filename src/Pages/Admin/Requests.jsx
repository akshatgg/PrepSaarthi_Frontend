import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pendingreq, ApprovedReq, RejectedReq,UpdationReq } from "./AllRequest";
import { useSelector, useDispatch } from "react-redux";
import { getMentorRequest } from "../../action/metorListAction";
import Loader from "../../Components/Loader/Loader";
import MetaData from "../../utils/Metadata";


const Requests = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.requestList);

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
        {value === index && (
          <Box>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getMentorRequest());
  }, [dispatch]);

  return (
    <>
        <MetaData title="Requests" />

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ width: "22vw" }}
                label={`Pend(${user?.usersPending?.length})`}
                {...a11yProps(0)}
              />
              <Tab
                sx={{ width: "22vw" }}
                label={`Upd(${user?.usersUpdation?.length})`}
                {...a11yProps(1)}
              />
              <Tab
                sx={{ width: "22vw" }}
                label={`App(${user?.userApproved?.length})`}
                {...a11yProps(2)}
              />
              <Tab
                sx={{ width: "22vw" }}
                label={`Rej(${user?.userRejected?.length})`}
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Pendingreq requests={user?.usersPending} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UpdationReq requests={user?.usersUpdation} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ApprovedReq requests={user?.userApproved} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <RejectedReq requests={user?.userRejected} />
          </CustomTabPanel>
        </Box>
      )}
    </>
  );
};

export default Requests;
