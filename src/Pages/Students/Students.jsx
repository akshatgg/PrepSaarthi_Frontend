import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import StudentCard from './StudentCard.jsx'
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Modal,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../../Components/Loader/Loader";
import {
  clearError,
  deleteUser,
  getAllStudents,
  reset,
} from "../../action/userAction";
const Students = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.allStudents);
  const {
    isDeleted,
    error: deleteError,
    message,
    loading: deleteLoder,
  } = useSelector((state) => state.deleteUser);
  const [loaderButton, setLoad] = useState(null);
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(users?.users)
   }, [users])
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
    dispatch(getAllStudents());
  }, [dispatch]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:"98%", md:'60%'},
    overflowY:'scroll',
    bgcolor: 'background.paper',
    borderRadius:'10px',
    border:0,
    outline:'none',
    boxShadow: 24,
    p: 1,
  };
  const [open, setOpen] = React.useState(false);
  const [student, setStudent] = React.useState(null);
  const handleClose = () => setOpen(false);

  return (
    <>
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
          sx={
            {
              cursor:'pointer',
              transition:'color .5s',
              "&:hover":{color:'blue'},
            }
          }
          onClick={() => setOpen(false)} />
          <StudentCard student={student}/>
        </Box>
      </Modal>
            <Button variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>
          <Grid container>
            {array?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} lg={4}>
                <Card
                onClick={() => {
                  setStudent(item)
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
                          parseInt(loaderButton) === parseInt(i) && deleteLoder
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
            ))}
          </Grid>
          </>
        )}
      </>
    </>
  );
};

export default Students;
