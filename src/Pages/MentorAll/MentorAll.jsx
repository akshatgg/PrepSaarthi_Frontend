import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Tab from "@mui/material/Tab";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Tabs,
  Modal,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../../Components/Loader/Loader";
import {
  clearError,
  deleteUser,
  reset,
  updateStatusHeadMentor,
} from "../../action/userAction";
import MetaData from "../../utils/Metadata";
import MentorAbout from "../../Components/RequestCard/MentorAbout";
const MentorAll = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.allMentors);
  const {
    sucess: success,
    error: statusError,
    loading: statusLoading,
    actionApplied,
  } = useSelector((state) => state.grantStatus);
  const {
    isDeleted,
    error: deleteError,
    message,
    loading: deleteLoder,
  } = useSelector((state) => state.deleteUser);
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(users?.users)
   }, [users])
  const [loaderButton, setLoad] = useState(null);
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
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError.message);
      dispatch(clearError());
    }
    if (statusError) {
      toast.error(statusError?.message);
      dispatch(clearError());
    }
  }, [dispatch, error, deleteError, statusError]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(message);
      dispatch(reset());
    }
  }, [isDeleted, message, dispatch]);
  useEffect(() => {
    if (success) {
      if (actionApplied) {
        toast.success("User has been granted a position of Head Mentor");
      } else {
        toast.success("User has been removed from the position of Head Mentor");
      }
      dispatch(reset());
    }
  }, [success, dispatch,actionApplied]);
  // useEffect(() => {
  // }, [dispatch]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "98%",
    height: "98%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    borderRadius: "10px",
    border: 0,
    outline: "none",
    boxShadow: 24,
    p: 1,
  };
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(' ');
  const handleClose = () => setOpen(false);

  return (
    <>
      <MetaData title="All Mentors" />

      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CloseIcon
                  sx={{
                    cursor: "pointer",
                    transition: "color .5s",
                    "&:hover": { color: "blue" },
                  }}
                  onClick={() => setOpen(false)}
                />
                <MentorAbout id={user} />
              </Box>
            </Modal>
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
                    sx={{ minWidth: "50%", color: "white" }}
                    label="Active"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ minWidth: "50%", color: "white" }}
                    label="Inactive"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {loading === false && (
                  <>
                    <Grid container>
                      {array?.map(
                        (item, i) =>
                          item.role === "mentor" && (
                            <Grid key={i} item xs={12} sm={6} lg={4}>
                              <Card
                              onClick={() => {
                                setUser(item._id)
                                setOpen(true)
                              }}
                                sx={{
                                  width: { xs: "100%", lg: "90%" },
                                  height: { xs: 180, md: 200, xl: "14vmax" },
                                  display: "flex",
                                  margin: "0 auto",
                                  alignItems: "center",
                                  paddingLeft: "2vmax",
                                  mt: "2vmax",
                                  borderRadius: "1.5vmax",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  alt={item.name}
                                  image={item?.avatar?.public_URI}
                                  sx={{
                                    width: { xs: 100, md: 125, lg: "8vmax" },
                                    aspectRatio: "1/1",
                                    borderRadius: "50%",
                                  }}
                                />
                                <Box sx={{ display: { xs: "block" } }}>
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "2.5vmax",
                                          lg: "1.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item._id}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      Mentoring Status:-
                                      {item.mentoringStatus === "active" ? (
                                        <span style={{ color: "green" }}>
                                          Active
                                        </span>
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          InActive
                                        </span>
                                      )}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item.isActive ? (
                                        <span style={{ color: "green" }}>
                                          Active
                                        </span>
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Deleted
                                        </span>
                                      )}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <LoadingButton
                                      sx={{
                                        width: { xs: "8vmax", lg: "6vmax" },
                                        fontSize: {
                                          xs: "1.2vmax",
                                          lg: "0.8vmax",
                                        },
                                      }}
                                      size="medium"
                                      variant="contained"
                                      color="error"
                                      name={`${i}`}
                                      loading={
                                        parseInt(loaderButton) ===
                                          parseInt(i) && deleteLoder
                                      }
                                      onClick={(e) => {
                                        dispatch(deleteUser(item._id));
                                        setLoad(e.target.name);
                                      }}
                                    >
                                      Remove
                                    </LoadingButton>
                                    <LoadingButton
                                      sx={
                                        item?.isHeadMentor
                                          ? {
                                              width: {
                                                xs: "13vmax",
                                                lg: "11vmax",
                                              },
                                              fontSize: {
                                                xs: "1.2vmax",
                                                lg: "0.8vmax",
                                              },
                                              bgcolor: "red",
                                            }
                                          : {
                                              width: {
                                                xs: "13vmax",
                                                lg: "11vmax",
                                              },
                                              fontSize: {
                                                xs: "1.2vmax",
                                                lg: "0.8vmax",
                                              },
                                              bgcolor: "green",
                                            }
                                      }
                                      size="medium"
                                      variant="contained"
                                      name={`${i}`}
                                      loading={
                                        parseInt(loaderButton) ===
                                          parseInt(i) && statusLoading
                                      }
                                      onClick={(e) => {
                                        dispatch(
                                          updateStatusHeadMentor({
                                            id: item._id,
                                            status: !Boolean(
                                              item?.isHeadMentor
                                            ),
                                          })
                                        );
                                        setLoad(e.target.name);
                                      }}
                                    >
                                      {item?.isHeadMentor === true ? (
                                        <>Deny Head</>
                                      ) : (
                                        <>Grant Head</>
                                      )}
                                    </LoadingButton>
                                  </CardActions>
                                </Box>
                              </Card>
                            </Grid>
                          )
                      )}
                    </Grid>
                  </>
                )}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {loading === false && (
                  <>
                    <Grid container>
                      {array?.map(
                        (item, i) =>
                          item.role === "user" && (
                            <Grid key={i} item xs={12} sm={6} lg={4}>
                              <Card
                                sx={{
                                  width: { xs: "100%", lg: "90%" },
                                  height: { xs: 180, md: 200, xl: "14vmax" },
                                  display: "flex",
                                  margin: "0 auto",
                                  alignItems: "center",
                                  paddingLeft: "2vmax",
                                  mt: "2vmax",
                                  borderRadius: "1.5vmax",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  alt={item.name}
                                  image={item?.avatar?.public_URI}
                                  sx={{
                                    width: { xs: 100, md: 125, lg: "8vmax" },
                                    aspectRatio: "1/1",
                                    borderRadius: "50%",
                                  }}
                                />
                                <Box sx={{ display: { xs: "block" } }}>
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "2.5vmax",
                                          lg: "1.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item._id}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      Mentoring Status:-
                                      {item.mentoringStatus === "active" ? (
                                        <span style={{ color: "green" }}>
                                          Active
                                        </span>
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          InActive
                                        </span>
                                      )}
                                    </Typography>
                                  </CardContent>
                                  <CardContent sx={{ pt: 0, pb: 0 }}>
                                    <Typography
                                      gutterBottom
                                      variant="p"
                                      component="div"
                                      sx={{
                                        fontSize: {
                                          xs: "1vmax",
                                          lg: "0.8vmax",
                                        },
                                        fontWeight: 500,
                                      }}
                                    >
                                      {item.isActive ? (
                                        <span style={{ color: "green" }}>
                                          Active
                                        </span>
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Deleted
                                        </span>
                                      )}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <LoadingButton
                                      sx={{
                                        width: { xs: "8vmax", lg: "6vmax" },
                                        fontSize: {
                                          xs: "1.2vmax",
                                          lg: "0.8vmax",
                                        },
                                      }}
                                      size="medium"
                                      variant="contained"
                                      color="error"
                                      name={`${i}`}
                                      loading={
                                        parseInt(loaderButton) ===
                                          parseInt(i) && deleteLoder
                                      }
                                      onClick={(e) => {
                                        dispatch(deleteUser(item._id));
                                        setLoad(e.target.name);
                                      }}
                                    >
                                      Remove
                                    </LoadingButton>
                                  </CardActions>
                                </Box>
                              </Card>
                            </Grid>
                          )
                      )}
                    </Grid>
                  </>
                )}
              </CustomTabPanel>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default MentorAll;
