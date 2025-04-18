import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import MentorCard from "./MentorCard";
export const ActiveMentors = ({ requests }) => {
    return (
      <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
        {requests?.length === 0 ? (
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
                   No Mentors Available{" "}
                 </>
               
             </Typography>
           </Box>
        ) : (
          <>
            <Grid container spacing={2} justifyContent="center">
              {requests?.map((item, i) => {
                return <MentorCard item={item} i={i + "p"} />;
              })}
            </Grid>
          </>
        )}
      </Box>
    );
  };