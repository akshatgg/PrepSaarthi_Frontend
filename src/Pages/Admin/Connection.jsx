import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignConnection,
  clearError,
  getAllConnections,
  reset,
  resolveConnection,
} from "../../action/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import ConnectionCard from './ConnectionCard.jsx'
import toast from "react-hot-toast";
const convertToIST = (time) => {
  const utcTimestampString = time;
  const utcTimestamp = new Date(utcTimestampString);

  utcTimestamp.setHours(utcTimestamp.getHours() + 5);
  utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 30);

  const istTimestampString = utcTimestamp.toISOString();
  return istTimestampString;
};

const Connection = ({ connection }) => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector(
    (state) => state.connectionAssign
  );
  const { user } = useSelector(
    (state) => state.mentor
  );
  const {
    success: rsuccess,
    loading: rloading,
    error: rerror,
  } = useSelector((state) => state.connectionResolve);
  const RoundedImg = styled("img")(({ theme }) => ({
    width: 60,
    aspectRatio: "1/1",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.up("md")]: {
      width: 100,
    },
  }));

  useEffect(() => {
    if (success) {
      toast.success("Connection is now active");
      dispatch(reset());
      dispatch(getAllConnections());
      return;
    }
    if (rsuccess) {
      toast.success("Connection is now resolved");
      dispatch(reset());
      dispatch(getAllConnections());
      return;
    }
  }, [loading, success, rloading, rsuccess, dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
      return;
    }
    if (rerror) {
      toast.error(rerror.message);
      dispatch(clearError());
      return;
    }
  }, [error, rerror,dispatch]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '98%',
    height:'98%',
    overflowY:'scroll',
    bgcolor: 'background.paper',
    borderRadius:'10px',
    border:0,
    outline:'none',
    boxShadow: 24,
    p: 1,
  };
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [connections, setConnections] = useState(null)
  const [loader, setLoading] = useState(-1);
  return (
    <>
      {connection?.length === 0 ? (
          <Box
          sx={{
            background: "rgba( 255, 255, 255, 0.25 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: " blur( 13px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            height: { xs: "60vh", md: "75vh" },
            width: "95%",
            margin: "10px auto",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
         
          <Typography
            component="h2"
            variant="p"
            color={"grey"}
            sx={{
              fontSize: { xs: "2vmax", md: "1.8vmax" },
            }}
          >
            
              <>
                No Connection Available{" "}
              </>
            
          </Typography>
        </Box>
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
          <ConnectionCard connection={connections}/>
        </Box>
      </Modal>
          {connection?.map((item, i) => (
            <Card
              key={i}
              sx={{
                maxWidth: { xs: "100%", md: "80%" },
                m: "2vmax auto",
                height: { xs: 150, md: 180, lg: 200 },
              }}
              onClick={() => {
                handleOpen()
                setConnections(item)
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box textAlign="center">
                    <RoundedImg
                      src={item?.studentDetails?.avatar?.public_URI}
                      alt={item?.studentDetails?.name}
                    />
                    <Typography component="p">
                      {item?.studentDetails?.name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="70%"
                  >
                    <Box
                      display={"flex"}
                      width="100%"
                      justifyContent={"center"}
                    >
                      <ArrowBackIosIcon sx={{}} />
                      ...........................
                      <ArrowForwardIosIcon />
                    </Box>
                    <Typography
                      variant="p"
                      component="span"
                      width={"100%"}
                      textAlign={"center"}
                      fontSize="1.5vmax"
                    >
                      {item?.studentDetails?.name} asked to connnect with{" "}
                      {item?.mentorDetails?.name} on{" "}
                      {convertToIST(item?.boughtAt).split("T")[1].split(".")[0]}{" "}
                      at {convertToIST(item?.boughtAt).split("T")[0]}
                    </Typography>
                    <Typography
                      variant="p"
                      component="span"
                      width={"100%"}
                      textAlign={"center"}
                      fontSize="0.8vmax"
                      color="red"
                    >
                      {item?.isConnected === false &&
                        item?.isActive === false && <>Expired</>}{" "}
                    </Typography>
                    {item?.isConnected === false && item?.isActive === true && (
                       user?.user?.role === 'admin' && (
                        <Box display={"flex"}>
                        <Button
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            bgcolor: "#25D366",
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                            mr: "1vmax",
                            color: "white",
                          }}
                          startIcon={<WhatsAppIcon />}
                        >
                          Connect
                        </Button>
                        <LoadingButton
                          variant="contained"
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                          }}
                          loading={loader === i && loading}
                          onClick={() => {
                            setLoading(i);
                            dispatch(assignConnection(item._id));
                          }}
                        >
                          Enable
                        </LoadingButton>
                      </Box>
                       )
                    
                    )}
                    {item?.isConnected === true && item?.isActive === true && (
                      <Box display={"flex"}>
                        <LoadingButton
                          variant="contained"
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                            mr: "1vmax",
                          }}
                          loading={loader === i && rloading}
                          onClick={() => {
                            setLoading(i);
                            dispatch(
                              resolveConnection({
                                id: item._id,
                                sid: item?.studentDetails?._id,
                              })
                            );
                          }}
                        >
                          Resolve
                        </LoadingButton>
                      </Box>
                    )}
                  </Box>
                  <Box textAlign="center">
                    <RoundedImg
                      src={item?.mentorDetails?.avatar?.public_URI}
                      alt={item?.mentorDetails?.name}
                    />
                    <Typography component="p">
                      {item?.mentorDetails?.name}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Connection;
