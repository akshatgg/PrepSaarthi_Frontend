import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  loadUser,
  resendOTP,
  reset,
  sendOTP,
  stuVerifyOTP,
  sturesendOTP,
  stusendOTP,
  verifyOTP,
} from "../../action/userAction";
import { loadUser as loadStu } from "../../action/studentAction";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, message, error } = useSelector(
    (state) => state.newOTPsend
  );
  const {
    user: mentor,
    isAuthenticated: mAuth,
    loading: mloading,
  } = useSelector((state) => state.mentor);
  const {
    user: stuUser,
    isAuthenticated: sAuth,
    loading: sloading,
  } = useSelector((state) => state.student);
  const {
    loading: reLoading,
    success: reSuccess,
    message: reMessage,
    error: reError,
  } = useSelector((state) => state.resendOtherOTP);
  const {
    loading: vLoading,
    success: vSuccess,
    message: vMessage,
    error: vError,
    user,
  } = useSelector((state) => state.verifyUser);

  const [resend, setResend] = useState(false);
  const [otp, setOTP] = useState("");

  useEffect(() => {
    if (loading === false && success) {
      setResend(true);
      toast.success(message);
      dispatch(reset());
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (reLoading === false && reSuccess) {
      toast.success(reMessage);
      dispatch(reset());
    }
    if (reError) {
      toast.error(reError.message);
      dispatch(clearError());
    }
    if (vLoading === false && vSuccess) {
      toast.success(vMessage);
      dispatch(loadUser());
      dispatch(loadStu());
      dispatch(reset());
    }
    if (vError) {
      toast.error(vError.message);
      dispatch(clearError());
    }
  }, [
    dispatch,
    error,
    loading,
    success,
    message,
    reError,
    reLoading,
    reSuccess,
    reMessage,
    vError,
    vLoading,
    vSuccess,
    vMessage,
  ]);

  useEffect(() => {
    if (mloading === false && sloading === false) {
      if (
        mAuth &&
        (mentor?.user?.role === "mentor" ||mentor?.user?.role === "user" || mentor?.user?.role === "admin") &&
        mentor?.user?.verified &&
        mentor?.user?.isStepLastCompleted
      ) {
        navigate(`/user/${mentor?.user?._id}`);
      }
      if (!sloading && !mloading && !sAuth && !mAuth) {
        navigate("/notfound");
      }
      if (
        mAuth &&
        mentor?.user?.role === "user" &&
        mentor?.user?.verified &&
        !mentor?.user?.isStepLastCompleted
      ) {
        navigate("/role/mentor/final");
      }
      if (
        sAuth &&
        stuUser?.user?.role === "student" &&
        stuUser?.user?.verified
      ) {
        navigate(`/user/${stuUser?.user?._id}`);
      }
    }
  }, [
    sloading,
    mloading,
    user,
    mentor,
    stuUser,
    navigate,
    sAuth,
    mAuth,
    stuUser?.user?.verified,
    mentor?.user?.verified,
  ]);
  return (
    <>
      {!mentor?.user?.verified &&
        !stuUser?.user?.verified &&
        !sloading &&
        !mloading && (
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="p"
              sx={
                !resend
                  ? { display: "flex", fontSize: "1.4vmax" }
                  : { display: "none" }
              }
              component="div"
            >
              Please verify your account
            </Typography>
            <LoadingButton
              loading={loading}
              size="small"
              onClick={() => {
                sAuth && dispatch(stusendOTP());
                mAuth && dispatch(sendOTP());
              }}
              sx={!resend ? { display: "flex" } : { display: "none" }}
            >
              Send OTP
            </LoadingButton>
            <Box
              textAlign={"center"}
              sx={resend ? { display: "block" } : { display: "none" }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "1.4vmax" }}
                component="div"
              >
                OTP has been sent to your registered email
              </Typography>
              <Typography
                sx={{ mb: 1.5, fontSize: "1.4vmax" }}
                color="text.secondary"
              >
                OTP is valid for 10 mins
              </Typography>
              <LoadingButton
                loading={reLoading}
                size="small"
                onClick={() => {
                  mAuth && dispatch(resendOTP());
                  sAuth && dispatch(sturesendOTP());
                }}
                sx={
                  resend
                    ? { display: "flex", m: "0 auto" }
                    : { display: "none" }
                }
              >
                Resend OTP
              </LoadingButton>
            </Box>
            <Box
              component="div"
              sx={
                resend
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "none" }
              }
            >
              <TextField
                id="outlined-basic"
                label="Enter the OTP"
                variant="outlined"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                type="number"
              />
              <LoadingButton
                loading={vLoading}
                size="small"
                onClick={() => {
                  mAuth && dispatch(verifyOTP(otp));
                  sAuth && dispatch(stuVerifyOTP(otp));
                }}
                disabled={otp.split("").length < 5}
              >
                Verify OTP
              </LoadingButton>
            </Box>
          </Card>
        )}
    </>
  );
}
