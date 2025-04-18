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
import React from "react";
import MetaData from "../../utils/Metadata";
const convertToIST = (time) => {
  const utcTimestampString = time;
  const utcTimestamp = new Date(utcTimestampString);

  utcTimestamp.setHours(utcTimestamp.getHours() + 5);
  utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 30);

  const istTimestampString = utcTimestamp.toISOString();
  return istTimestampString;
};
const MenorInfoConnection = ({ active }) => {
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

  // const [loader,setLoading] = useState(-1);
  return (
    <>
        <MetaData title="Mentor Info Connection" />
        <>
          {active?.length === 0 ? (
            <Box sx={{height:'100%',minWidth:'65vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography fontSize={"2vmax"} fontWeight={600}>No Connection To show:(</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ overflowY: "scroll", height: "42vmax",minWidth:'65vw' }}>
                {active?.map((item, i) => {
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
                  
                })}
              </Box>
            </>
          )}
        </>
      
    </>
  );
};

export default MenorInfoConnection;
