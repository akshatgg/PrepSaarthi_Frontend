import { Box, FormControl, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteReviews,
  getAllReviews,
  newReview,
  reset,
} from "../../action/studentAction";
import toast from "react-hot-toast";
const RatingMentor = ({ mentorId, student }) => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.allReview);
  const { loading: rloading, success,error } = useSelector(
    (state) => state.newReviews
  );
  const { loading: dloading, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [reviewUserId, setReviewUserId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const mentorReview = new FormData();
    mentorReview.set("rating", rating);
    mentorReview.set("comment", review);
    mentorReview.set("mentorId", mentorId);

    const serializedData = {};
    mentorReview.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(newReview(serializedData));
  };
  useEffect(() => {
    if (rloading === false && success?.success === true) {
      toast.success("Review Submitted Successfully");
      setOpen(false);
      dispatch(reset());
      dispatch(getAllReviews(mentorId));
    }
  }, [rloading, success, dispatch, mentorId]);
  useEffect(() => {
    dispatch(getAllReviews(mentorId));
  }, [dispatch, mentorId]);
  useEffect(() => {
    if(error){
      toast.error(error.message)
      dispatch(clearError())
    }
  })
  useEffect(() => {
    if (loading === false) {
      const signedUserReview = reviews?.reviews?.filter((item) => {
        if (item?.user?._id === student?._id) {
          return item;
        } else {
          return false;
        }
      });
      setRating(signedUserReview[0]?.rating || 0);
      setReview(signedUserReview[0]?.comment || "");
      setReviewId(signedUserReview[0]?._id || "");
      setReviewUserId(signedUserReview[0]?.user?._id || "");
    }
  }, [loading, reviews?.reviews, student?._id]);
  useEffect(() => {
    if (dloading === false && isDeleted?.success === true) {
      toast.success("Review deleted successfully");
      dispatch(reset());
      setOpen(false);
      dispatch(getAllReviews(mentorId));
    }
  }, [dloading, isDeleted, dispatch, mentorId]);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Box>
        <TriggerButton
          type="button"
          m="0"
          onClick={() => {
            if (!student) {
              toast("Login to give review");
            } else {
              handleOpen();
            }
          }}
        >
          Your Review
        </TriggerButton>
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
        >
          <ModalContent sx={{ width: 400, height: 300 }}>
            <Box
              onSubmit={handleSubmit}
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Rating
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                sx={{ mb: "0.5vmax" }}
              />
              <FormControl sx={{ mb: "0.5vmax" }}>
                <TextField
                  id="standard-multiline-static"
                  label="Your Review"
                  multiline
                  rows={4}
                  variant="standard"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                />
                <Box sx={{ mt: "1vmax" }}>
                  <LoadingButton
                    loading={rloading}
                    type="submit"
                    variant="outlined"
                    sx={{ width: "3vmax", mr: "1vmax" }}
                    disabled={rating === 0}
                  >
                    <SendIcon />
                  </LoadingButton>
                  <LoadingButton
                    variant="outlined"
                    loading={dloading}
                    onClick={() =>
                      dispatch(
                        deleteReviews({ reviewId, reviewUserId, mentorId })
                      )
                    }
                    sx={{
                      width: "3vmax",
                      mr: "1vmax",
                      border: "0.3px solid red",
                    }}
                  >
                    <DeleteIcon color="error" />
                  </LoadingButton>
                </Box>
              </FormControl>
            </Box>
          </ModalContent>
        </Modal>
      </Box>
      {reviews?.reviews?.length === 0 ? (
        <>
          <Typography>No Reviews Yet</Typography>
        </>
      ) : (
        <>
          <div className="_rating-container">
            {reviews?.reviews?.map((item, i) => (
              <Box className="testimonial-box" key={i} sx={{margin:'1vmax', border:'0.5px solid grey', borderRadius:'10px', padding:'1vmax', pl:'1.5vmax'}}>
                <div className="box-top">
                  <Box className="profile" sx={{mb:'1vmax'}}>
                    <Box className="profile-img" sx={{width:{xs:'6vmax',md:"4vmax"},height:{xs:'6vmax',md:"4vmax"},mb:'1vmax', borderRadius:'50%',border:'1px solid grey',overflow:'hidden' , aspectRatio:'1/1', "& img": {
                      width:'100%',
                      height:'100%',
                      objectFit:'contain',
                      objectPosition:'center'
                    }}}>
                      <img src={item?.user?.avatar?.public_URI} alt="user" />
                    </Box>
                    <div className="name-user">
                      <strong>{item?.name}</strong>
                    </div>
                  </Box>
                  <div className="reviews">
                    <Rating name="read-only" value={item.rating} readOnly />
                  </div>
                </div>
                <div className="client-comment">
                  <p>{item.comment}</p>
                </div>
              </Box>
            ))}
          </div>
        </>
      )}
    </>
  );
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
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
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
export default RatingMentor;
