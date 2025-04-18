import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../../Components/Loader/Loader";
import {
  clearError,
  deleteUser,
  getAllAdmin,
  reset,
} from "../../action/userAction";
import MetaData from "../../utils/Metadata";

const AllAdmin = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.allAdmin);
  const {
    isDeleted,
    error: deleteError,
    message,
    loading: deleteLoder,
  } = useSelector((state) => state.deleteUser);
  const [loaderButton, setLoad] = useState(null);
  useEffect(() => {}, [loaderButton]);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError.message);
      dispatch(clearError());
    }
  }, [dispatch, error, deleteError]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(message);
      dispatch(reset());
    }
  }, [isDeleted, message, dispatch]);
  useEffect(() => {
    dispatch(getAllAdmin());
  }, [dispatch]);
  return (
    <>
        <MetaData title="All Admins - PrepSaarthi" />

      <>
        {loading ? (
          <Loader />
        ) : (
          <Grid container>
            {users?.users?.map((item, i) => {
              if (item?._id === users?.userSigned) {
                return (
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
                              fontSize: { xs: "2.5vmax", lg: "1.8vmax" },
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
                              fontSize: { xs: "1.2vmax", lg: "1vmax" },
                              fontWeight: 500,
                            }}
                          >
                            You
                          </Typography>
                        </CardContent>
                        <CardContent sx={{ pt: 0, pb: 0 }}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
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
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
                              fontWeight: 500,
                            }}
                          >
                            Mentoring Status:-
                            {item.mentoringStatus ? (
                              <span style={{ color: "green" }}>Active</span>
                            ) : (
                              <span style={{ color: "Yellow" }}>InActive</span>
                            )}
                          </Typography>
                        </CardContent>
                        <CardContent sx={{ pt: 0, pb: 0 }}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
                              fontWeight: 500,
                            }}
                          >
                            {item.isActive ? (
                              <span style={{ color: "green" }}>Active</span>
                            ) : (
                              <span style={{ color: "red" }}>Deleted</span>
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
                              parseInt(loaderButton) === parseInt(i) &&
                              deleteLoder
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
                );
              } else {
                return false;
              }
            })}
            {users?.users?.map((item, i) => {
              if (item?._id !== users?.userSigned) {
                return (
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
                              fontSize: { xs: "2.5vmax", lg: "1.8vmax" },
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
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
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
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
                              fontWeight: 500,
                            }}
                          >
                            Mentoring Status:-
                            {item.mentoringStatus ? (
                              <span style={{ color: "green" }}>Active</span>
                            ) : (
                              <span style={{ color: "Yellow" }}>InActive</span>
                            )}
                          </Typography>
                        </CardContent>
                        <CardContent sx={{ pt: 0, pb: 0 }}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              fontSize: { xs: "1vmax", lg: "0.8vmax" },
                              fontWeight: 500,
                            }}
                          >
                            {item.isActive ? (
                              <span style={{ color: "green" }}>Active</span>
                            ) : (
                              <span style={{ color: "red" }}>Deleted</span>
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
                              parseInt(loaderButton) === parseInt(i) &&
                              deleteLoder
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
                );
              } else {
                return false;
              }
            })}
          </Grid>
        )}
      </>
    </>
  );
};

export default AllAdmin;
