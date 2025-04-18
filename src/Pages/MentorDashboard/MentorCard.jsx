import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Modal
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {
  clearError,
  clearMessage,
} from "../../action/userAction";
import toast from "react-hot-toast";
import { getMentorRequest } from "../../action/metorListAction";
import MentorAbout from "./MentorAbout.jsx";
import Loader from "../../Components/Loader/Loader.jsx";
const MentorCard = ({ item, i }) => {
  const dispatch = useDispatch();
  const { loading, error, status } = useSelector((state) => state.roleUpdate);
  const { loading: listLoad, error: listError } = useSelector(
    (state) => state.requestList
  );
  const [loaderButton, setLoad] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (status?.success) {
      toast.success(status.message);
      dispatch(clearMessage());
      dispatch(getMentorRequest());
    }
  }, [status, dispatch, error]);

  useEffect(() => {
    if (listError) {
      toast.error(listError.message);
    }
  }, [listError]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '98%',
    height:'98%',
    overflowY:'scroll',
    bgcolor: '#fffffffc',
    borderRadius:'10px',
    border:0,
    outline:'none',
    boxShadow: 24,
    p: 1,
  };
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {listLoad ? (
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
          <MentorAbout id={item._id}/>
        </Box>
      </Modal>
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
            onClick={handleOpen}
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: { lg: "0.8vmax" } }}
                >
                  {item.collegeName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: { lg: "0.8vmax" } }}
                >
                  {item.exam?.name === "jeemains" && (
                    <span>JEE MAINS({item.exam?.rank})</span>
                  )}
                  {item.exam?.name === "jeeadv" && (
                    <span>JEE ADV({item.exam?.rank})</span>
                  )}
                  {item.exam?.name === "bitsat" && (
                    <span>BITSAT({item.exam?.rank})</span>
                  )}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        </>
      )}
    </>
  );
};

export default MentorCard;
