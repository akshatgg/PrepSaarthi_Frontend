import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
const Authenticity = ({ mentorName, idcard }) => {
  const [open, setOpen] = React.useState(false);
  const [openID, setOpenID] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenID = () => {
    setOpenID(true);
  };
  const handleCloseID = () => {
    setOpenID(false);
  };

  const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ "base-Backdrop-open": open }, className)}
        ref={ref}
        {...other}
      />
    );
  });

  const CustomListItem = styled(ListItem)({
    "&::before": {
      content: '"•"',
      color: "#007FFF",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
    color: "#333", // Text color
    fontSize: "26px", // Font size
    margin: "10px 0", // Margin between items
  });
  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };

  const blue = {
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0066CC",
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

  const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const ModalContent = styled("div")(
    ({ theme }) => css`
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === "dark"
          ? "rgb(0 0 0 / 0.5)"
          : "rgb(0 0 0 / 0.2)"};
      padding: 24px;
      color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }

      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `
  );

  const TriggerButton = styled("button")(
    ({ theme }) => css`
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:hover {
        background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      }

      &:active {
        background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
      }

      &:focus-visible {
        box-shadow: 0 0 0 4px
          ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
        outline: none;
      }
    `
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: 600,
        overflowY: "scroll",
        color: "#474747",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="p" sx={{ fontWeight: 700, fontSize: "1.5vmax" }}>
        We Take Our Mentors' Authenticity Very Seriously
      </Typography>
      <Typography>
        At PrepSaarthi, the integrity and quality of our mentorship are our top
        priorities. Each mentor undergoes a rigorous verification process to
        ensure they meet our high standards
      </Typography>
      <TriggerButton
        type="button"
        onClick={handleOpen}
        component={Link}
        sx={{
          display: "flex",
          border: 0,
          alignItems: "center",
          fontWeight: "600",
          color: "#663096",
          m: 2,
        }}
      >
        <span>Know How we verify our mentors</span>
        <ArrowForwardIcon sx={{ fontWeight: 100 }} />
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            Our Verification Process
          </h2>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Candidate Selection Process
            </Typography>
            <List>
              <CustomListItem>
                <ListItemText primary="Application Shortlisting: Review and shortlist applications." />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Screening Round: Conduct a screening round for selected candidates." />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="One-hour Workshop (Online): Participate in an online workshop." />
              </CustomListItem>
            </List>
            <Typography
              variant="body1"
              style={{ color: "#333", fontSize: "16px", margin: "10px 0" }}
            >
              Upon completing these steps successfully, candidates can become
              permanent mentors on our platform and set their own fees based on
              their expertise.
            </Typography>
          </Box>
        </ModalContent>
      </Modal>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openID}
        onClose={handleCloseID}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width:{xs:'95vw',md:"60vw"}, height:{xs:'85vh', md:'60vh'}}}>
        <Box
        sx={{
          overflow: "hidden",
          width: "95%",
          borderRadius: "1vmax",
          border: "0.5px solid grey",
          margin: "0 auto",
          p: "1vmax",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>{mentorName}'s College ID Card</Typography>
        <Box
          component="img"
          src={idcard?.public_URI}
          borderRadius={"1.5vmax"}
          alt="id card"
          sx={{
            width:'100%',
            height:'100%',
            objectFit:'contain',
            objectPosition:'center'
          }}
        ></Box>
      </Box>
      <Button onClick={handleCloseID} sx={{color:"blue"}}>CLOSE</Button>
        </ModalContent>
      </Modal>
     <Button variant="contained"onClick={handleOpenID}>Tap to view ID Card</Button>
    </Box>
  );
};

export default Authenticity;
