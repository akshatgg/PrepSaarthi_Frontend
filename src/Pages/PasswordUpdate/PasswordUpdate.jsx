import { Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, updatePasswordMentor } from "../../action/userAction";
import { updatePasswordStudent,clearError as stuErrorClear, clearMessage as stuClearMessage } from "../../action/studentAction";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  width: { xs: "90vw", md: "60vw", lg: "40vw" },
  height: { xs: "80vh", md: "60vh", lg: "60vh" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0 auto",
  "& .MuiFormControl-root": {
    mt: "1vmax",
    mb: "1vmax",
  },
  "& .MuiButtonBase-root": {
    mt: "1vmax",
    height: { xs: "5vmax", md: "4vmax" },
  },
};
const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.mentor);
  const { loading, error, status } = useSelector(
    (state) => state.mentorPassword
  );
  const {
    loading: stuLoading,
    error: stuError,
    status: stuStatus,
  } = useSelector((state) => state.studentPassword);
  const { user: stuUser } = useSelector((state) => state.student);
  const [oldPassword, setOldPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);

  const changePassword = (event) => {
    event.preventDefault();
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    if (user?.user?.signedUpFor === "mentor") {
      dispatch(updatePasswordMentor(payload));
    } else if (stuUser?.user?.signedUpFor === "student") {
      dispatch(updatePasswordStudent(payload));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (stuError) {
      toast.error(stuError.message);
      dispatch(stuErrorClear());
    }
    if (!loading && status === "success") {
      toast.success("Password updated successfully");
      dispatch(clearMessage())
    }
    if (!stuLoading && stuStatus === "success") {
        toast.success("Password updated successfully");
        dispatch(stuClearMessage())
    }
  }, [dispatch, error, stuError, loading, status, stuLoading, stuStatus]);
  return (
    <Box sx={style} component="form" onSubmit={changePassword}>
      <TextField
        id="outlined-basic"
        label="Old Password"
        type="password"
        variant="outlined"
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="New Password"
        type="password"
        variant="outlined"
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Confirm New Password"
        type="password"
        variant="outlined"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <LoadingButton variant="contained" type="submit" loading={loading || stuLoading}>
        Update Password
      </LoadingButton>
    </Box>
  );
};

export default PasswordUpdate;
