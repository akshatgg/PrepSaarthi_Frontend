import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: { xs: "56px", sm: "64px", md: "68.5px" },
        left: "0px",
        zIndex: "100",
        bgcolor: "white",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
