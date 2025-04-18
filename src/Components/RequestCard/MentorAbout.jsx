import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAdmin } from "../../action/userAction";
import { getSuccessMentorConnection } from "../../action/metorListAction";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { buttonClasses } from "@mui/base/Button";
import MentorIntro from "../../Pages/MentorList/MentorIntro";
import RatingMentor from "../../Pages/MentorList/RatingMentor";
import Authenticity from "../../Pages/MentorList/Authenticity";

const MentorAbout = ({ id }) => {
  const { user } = useSelector((state) => state.mentorDeatilAdmin);
  const { connection } = useSelector((state) => state.connectionCount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailsAdmin(id));
    dispatch(getSuccessMentorConnection(id));
  }, [dispatch, id]);

  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
width: 100%;
font-family: 'IBM Plex Sans', sans-serif;
font-size: 0.875rem;
padding: 20px 12px;
background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
border-radius: 12px;
opacity: 0.9;
`
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
min-width: 400px;
background-color: ${blue[500]};
border-radius: 12px;
margin-bottom: 16px;
display: flex;
align-items: center;
justify-content: center;
align-content: space-between;
box-shadow: 0px 4px 30px ${
  theme.palette.mode === "dark" ? grey[900] : grey[200]
};
`
);


  return (
    <>
      <Box sx={{ position: "relative", height: { xs: "35vh", md: "45vh" }}}>
        <Box
          component="img"
          src={user?.coverImg?.public_URI}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          borderRadius={'2vmax'}
        ></Box>
        <Box
          component="img"
          src={user?.avatar?.public_URI}
          sx={{
            position: "absolute",
            bottom: -50,
            borderRadius: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "14vmax",
            height: "14vmax",
            objectFit: "cover",
            objectPosition: "center",
          }}
        ></Box>
      </Box>
      <Box sx={{ mt: "60px" , display:'flex', justifyContent:'center' ,alignItems:'center', flexDirection:'column'}}>
        <Box>
      <Button
          variant="outlined"
          sx={{ width: { xs: "18vmax", md: "12vmax" }, mb:1 }}
        >
          &#8377;
          {Intl.NumberFormat("en-IN").format(user?.ppd)}/day
        </Button>
        {(user?.isUpd === 'yes'&& user?.ppdO !== user?.ppd) && <Box component='span'  sx={{fontSize:'1.5vmax', ml:'1vmax'}}>Old Price &#8377;{Intl.NumberFormat("en-IN").format(user?.ppdO)}/D</Box>} 
        </Box>
        <Box>
        <Button
          variant="contained"
          sx={{
            width: { xs: "18vmax", md: "12vmax" },
            mb:1
          }}
          >
          &#8377;
          {Intl.NumberFormat("en-IN").format(user?.ppm)}/week
        </Button>
        {(user?.isUpd === 'yes'&& user?.ppmO !== user?.ppm) && <Box  component='span' sx={{fontSize:'1.5vmax', ml:'1vmax'}}>Old Price &#8377;{Intl.NumberFormat("en-IN").format(user?.ppmO)}/W</Box>} 
          </Box>
        <p><strong>{user?.name}</strong></p>
        <Box sx={{mt:1, mb:1}}>
          <span style={{marginRight:'10px'}}>
            <strong>{user?.ratings} </strong>
            Ratings
          </span>
          <span style={{marginRight:'10px'}}>
            <strong>{connection?.count} </strong>
            Mentee
          </span>
          <span style={{marginRight:'10px'}}>
            <strong>{user?.yearOfStudy} </strong>
            Present Year
          </span>
        </Box>
      </Box>
      <Box textAlign={'center'}>
        {user?.about}
      </Box>
      <Box
                      sx={{
                        maxWidth: { xs: "100vw" },
                        p: { xs: "1vmax", md: "2vmax 10vmax" },
                        mt: { xs: "3vmax", md: "5vmax" },
                      }}
                    >
                      <Tabs defaultValue={0}>
                        <TabsList
                          sx={{ minWidth: "10px", width: { xs: "100%" } }}
                        >
                          <Tab value={0}>Mentor Video</Tab>
                          <Tab value={1}>Authenticity</Tab>
                          <Tab value={2}>Ratings</Tab>
                          <Tab value={3}>Conn.</Tab>
                        </TabsList>
                        <TabPanel value={0}>
                          <MentorIntro />
                        </TabPanel>
                        <TabPanel value={1}>
                          <Authenticity
                            mentorName={user?.name}
                            idcard={user?.idCard}
                          />
                        </TabPanel>
                        <TabPanel value={2}>
                          <RatingMentor
                            mentorId={id}
                            student={id}
                          />
                        </TabPanel>
                        <TabPanel value={3}>
                          <RatingMentor
                            mentorId={id}
                            student={id}
                          />
                        </TabPanel>
                      </Tabs>
                    </Box>
    </>
  );
};

export default MentorAbout;
