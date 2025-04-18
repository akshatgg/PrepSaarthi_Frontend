import React from "react";
import YoutubeIFrame from "../../Components/YoutubeIFrame/YoutubeIFrame";
import { Box } from "@mui/material";

const MentorIntro = () => {
  return (
    <Box sx={{ width: "100%", height: { xs: 350, md: 600 } }}>
      <YoutubeIFrame />
    </Box>
  );
};

export default MentorIntro;
