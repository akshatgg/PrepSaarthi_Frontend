import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      {/* Funny GIF or Picture */}
      <Box sx={{ maxWidth: "400px", marginBottom: "2rem" }}>
        <img
          src="https://i.pinimg.com/originals/ca/ad/f3/caadf374b82e85159e784f8f908062fb.gif" // Replace this with the actual URL of your chosen GIF or image
          alt="Confused Student"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Box>

      {/* Main Text */}
      <Typography variant="h3" sx={{ color: "#3A5AFF", fontWeight: "bold" }}>
        404 - Looks like you're lost in the syllabus!
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body1"
        sx={{ fontSize: "1.2rem", color: "#555", marginTop: "1rem", marginBottom: "2rem" }}
      >
        Just like when you hit a tough chapter without any idea what's going on... 
        You're at the wrong page!
      </Typography>

      {/* Back Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#3A5AFF",
          color: "#fff",
          "&:hover": { backgroundColor: "#2B48CC" },
        }}
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
