import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearMessage, loginUser, reset } from "../../action/userAction";
import {
  clearError as stuErrorClean,
  clearMessage as stuClear,
  loginUser as stuLogin,
} from "../../action/studentAction";
import toast from "react-hot-toast";
import MetaData from "../../utils/Metadata";
const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, loginMessage, user } = useSelector(
    (state) => state.mentor
  );
  const {
    loading: studentLoad,
    isAuthenticated: studentAuth,
    error: stuError,
    loginMessage: stuMessage,
    user: stu,
  } = useSelector((state) => state.student);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.name === "stu"
      ? dispatch(stuLogin({ loginEmail, loginPassword }))
      : dispatch(loginUser({ loginEmail, loginPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        id:'signin-mentor'
      });
      dispatch(clearError());
    }
    if (stuError) {
    
      toast.error(stuError.message,{
          id:'signin-mentor'
      });
      dispatch(stuErrorClean());
    }
    if (isAuthenticated && loginMessage) {
      toast.success(loginMessage);
      dispatch(clearMessage());
    }
    if (studentAuth && stuMessage) {
      toast.success(stuMessage);
      dispatch(stuClear());
    }
    if (loading === false && isAuthenticated) {
      navigate(`/verify/account`);
    }
    if (studentLoad === false && studentAuth) {
      navigate(`/verify/account`);
    }
    dispatch(reset())
  }, [
    error,
    stuError,
    isAuthenticated,
    studentAuth,
    stuMessage,
    loginMessage,
    dispatch,
    navigate,
    user?.user?._id,
    loading,
    stu?.user?._id,
    studentLoad,
  ]);
  return (
    <>
    <MetaData title="Login - PrepSaarthi" />
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ mb: "8vmax" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <LoadingButton
                type="submit"
                fullWidth
                name='mentor'
                variant="contained"
                loading={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  mr:2,
                  fontSize: { xs: "2.1vmax", md: "1.8vmax", lg: "1vmax" },
                  bgcolor: "var(--button1)",
                  "&:hover": { bgcolor: "var(--button1Hover)" },
                }}
                onClick={handleSubmit}
              >
               Mentor
              </LoadingButton>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                name="stu"
                loading={studentLoad}
                onClick={handleSubmit}
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: { xs: "2.1vmax", md: "1.8vmax", lg: "1vmax" },
                  bgcolor: "var(--button1)",
                  "&:hover": { bgcolor: "var(--button1Hover)" },
                }}
              >
                Student
              </LoadingButton>
            </Box>
            <Grid container>
              <Grid item xs> 
                <Link
                  component={ReactLink}
                  style={{ textDecoration: "none" }}
                  to='/forgot/password'
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/signup"
                  variant="body2"
                  component={ReactLink}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
