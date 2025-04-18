import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { getAllConnectionsStu, clearError } from "../../action/studentAction";
import { Link } from "react-router-dom";
import MetaData from "../../utils/Metadata";
const convertToIST = (time) => {
  const utcTimestampString = time;
  const utcTimestamp = new Date(utcTimestampString);

  utcTimestamp.setHours(utcTimestamp.getHours() + 5);
  utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 30);

  const istTimestampString = utcTimestamp.toISOString();
  return istTimestampString;
};
const MenorInfo = ({ active }) => {
  const dispatch = useDispatch();
  const { connection, loading, error } = useSelector(
    (state) => state.getAllConnectionStuPast  //thia
  );
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
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
      return;
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getAllConnectionsStu());
  }, [dispatch]);
  const isConnection = connection?.connection?.filter((i) => {
    if (i.isActive === active) return i;
    else
    return false
  });
  // const [loader,setLoading] = useState(-1);
  return (
    <>
        <MetaData title={`Your Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {isConnection?.length === 0 ? (
                <Box sx={{height:'100%',minWidth:'65vw', display:'flex', flexDirection:"column", alignItems:'center', justifyContent:'center'}}>
                <Typography fontSize={"2vmax"} fontWeight={600}>No mentorships to show</Typography>
                <Typography component={Link} to="/lists/mentors">Click here to buy best mentorship for you</Typography>
                </Box>
          ) : (
            <>
              <Box sx={{ overflowY: "scroll", height: "42vmax" ,minWidth:'65vw', p:'1vmax'}}>
                {connection?.connection?.map((item, i) => {
                  if (item.isActive === active) {
                    return (
                      <Card
                        key={i}
                        sx={{
                          maxWidth: { xs: "100%", md: "80%" },
                          m: "2vmax auto",
                          height: { xs: 150, md: 180, lg: 200 },
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
                                {item?.studentDetails?.name} asked to connnect
                                with {item?.mentorDetails?.name} on{" "}
                                {
                                  convertToIST(item?.boughtAt)
                                    .split("T")[1]
                                    .split(".")[0]
                                }{" "}
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
                                  item?.isActive === true && <>Active till {(item?.expiresIn)?.split('T')[0]}</>}{" "}
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
                    );
                  }
                  return false
                }
                )}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MenorInfo;
