import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ShieldIcon from "@mui/icons-material/Shield";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

const Settings = () => {
  const { user } = useSelector((state) => state.mentor);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 13px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  };
  const open = true;
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: { xs: "90%", md: "40%" },
              height: { xs: "80%", md: "60%" },
              bgcolor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <SettingsIcon
              sx={{ color: "grey", textAlign: "center ", fontSize: "3vmax" }}
            />
            <Typography
              component="h2"
              variant="p"
              sx={{ color: "grey", mb: "2vmax", textAlign: "center " }}
            >
              Settings
            </Typography>
            <Link
              to={
                user?.user.role === "admin" || user?.user.role === "mentor"
                  ? "/update/profile/mentor"
                  : "/update/profile/student"
              }
            >
              <Button
                variant="contained"
                startIcon={<EditIcon sx={{ fontSize: "2vmax" }} />}
                sx={{
                  mb: "1vmax",
                  width: { xs: "24vmax", md: "20vmax" },
                  height: { xs: "8vmax", md: "5vmax" },
                  fontSize: { xs: "1.5vmax", md: "1.1vmax" },
                }}
              >
                Edit your acount
              </Button>
            </Link>
            <Link to='/password/change'>
              <Button
                variant="contained"
                startIcon={<ShieldIcon sx={{ fontSize: "2vmax" }} />}
                sx={{
                  mb: "1vmax",
                  width: { xs: "24vmax", md: "20vmax" },
                  height: { xs: "8vmax", md: "5vmax" },
                  fontSize: { xs: "1.5vmax", md: "1.1vmax" },
                }}
              >
                Change your password
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: "2vmax" }} />}
                sx={{
                  mb: "1vmax",
                  width: { xs: "24vmax", md: "20vmax" },
                  height: { xs: "8vmax", md: "5vmax" },
                  fontSize: { xs: "1.5vmax", md: "1.1vmax" },
                }}
              >
                Go to your profile
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Settings;
