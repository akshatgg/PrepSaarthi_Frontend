import { ThemeProvider } from "@emotion/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearMessage,
  loadUser,
  updateMentorFinalInfo,
} from "../../action/userAction";
import Loader from "../../Components/Loader/Loader";
import LoadingButton from "@mui/lab/LoadingButton";
import imageCompression from "browser-image-compression";
import CircularProgress from "@mui/material/CircularProgress";
const defaultTheme = createTheme();

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const FinalStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    user: successMessage,
  } = useSelector((state) => state.mentorUpdateLastStep);
  const { user, loading: userLoad } = useSelector((state) => state.mentor);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!card) {
      toast.error("You must upload your college id card");
      return;
    }
    const mentorInformation = new FormData();

    mentorInformation.set("isDropper", mentorInfo.isDropper);
    mentorInformation.set("yearOfStudy", mentorInfo.yearOfStudy);
    mentorInformation.set("studyMode", mentorInfo.studyMode);
    mentorInformation.set("exam", JSON.stringify(mentorInfo.exam));
    mentorInformation.set("linkedin", mentorInfo.linkedin);
    mentorInformation.set("youtube", mentorInfo.youtube);
    mentorInformation.set("disc", mentorInfo.descp);
    mentorInformation.set("about", mentorInfo.about);
    mentorInformation.set("ppm", mentorInfo.pricem);
    mentorInformation.set("ppd", mentorInfo.priced);
    mentorInformation.set("branch", mentorInfo.branch.toUpperCase());
    mentorInformation.set("idCard", card);

    const serializedData = {};
    mentorInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(updateMentorFinalInfo(serializedData));
  };
  const [mentorInfo, setMentorInfo] = useState({
    isDropper: "",
    yearOfStudy: -1,
    studyMode: "",
    exam: {
      name: "",
      rank: "",
    },
    linkedin: "",
  });
  const [exam, setExam] = useState("");
  const [cardPreviwew, setCardPreview] = useState("/images/idcard.png");
  const [card, setCard] = useState(null);

  const [toggleRank, setRankToogler] = useState(false);
  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);

  React.useEffect(() => {
    if (prgress === 100) {
      setSuccess(true);
      setTimeout(() => {
        setProgress(0);
      }, 800);
      setTimeout(() => {
        setSuccess(false);
      }, 1200);
    }
  }, [prgress]);

  const handleChange = async (event) => {
    if (event.target.name === "exam" && event.target.value !== "") {
      setRankToogler(true);
      setExam(event.target.value);
    } else if (event.target.name === "rank" && exam !== "") {
      const examInfo = {
        name: exam,
        rank: event.target.value,
      };
      setMentorInfo({ ...mentorInfo, exam: examInfo });
    } else if (event.target.name === "idcard") {
      setuploading(true);
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        onProgress: (progress) => {
          setProgress((prevProgress) => {
            if (progress !== prevProgress) {
              return progress;
            }
            return prevProgress;
          });
        },
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const base64img = await convertBase64(compressedFile);
        setuploading(false);
        setCard(base64img);
        setCardPreview(base64img);
      } catch (error) {
        setuploading(false);
        toast.error(error.message);
      }
    } else {
      setMentorInfo({ ...mentorInfo, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      // dispatch(clearError());
    }
    if (successMessage?.success) {
      toast.success("Your application is submitted successfully");
      navigate(`/mentors/${user?.user?._id}`);
      dispatch(clearMessage());
      dispatch(loadUser());
    }
  }, [
    error,
    dispatch,
    successMessage?.success,
    userLoad,
    user?.user?.isStepLastCompleted,
    navigate,
    user?.user?._id,
  ]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {userLoad ? (
          <Loader />
        ) : user?.user?.isStepLastCompleted && user?.user?.role === "user" ? (
          <Box
            sx={{
              background: "rgba( 255, 255, 255, 0.25 )",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: " blur( 13px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              height: { xs: "60vh", md: "80vh" },
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
            <HourglassBottomIcon
              sx={{
                fontSize: { xs: "3.8vmax", md: "2.8vmax" },
                color: "#ffff72",
              }}
            />
            <Typography
              component="h2"
              variant="p"
              color={"grey"}
              sx={{ fontSize: { xs: "2.5vmax", md: "1.8vmax" } }}
            >
              {user?.user?.updateRequest === "yes" ? (
                <> Your application's changes are under review</>
              ) : (
                <> Your application is under process</>
              )}
            </Typography>
          </Box>
        ) : user?.user.isStepLastCompleted && user?.user.role === "mentor" ? (
          <Box
            sx={{
              background: "rgba( 255, 255, 255, 0.25 )",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: " blur( 13px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              height: { xs: "60vh", md: "80vh" },
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
            <CheckCircleIcon
              sx={{
                fontSize: { xs: "3.8vmax", md: "2.8vmax" },
                color: "lightgreen",
              }}
            />
            <Typography
              component="h2"
              variant="p"
              color={"grey"}
              sx={{ fontSize: { xs: "2vmax", md: "1.8vmax" } }}
            >
              You are already a mentor
            </Typography>
          </Box>
        ) : (
          !user?.user.isStepLastCompleted &&
          user?.user.role === "user" &&
          user?.user.signedUpFor === "mentor" && (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: "2.5vmax",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pb: "2.5vmax",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography textAlign="center" component="h1" variant="h5">
                  Last step for becoming a mentor
                </Typography>
                <Typography
                  component="h1"
                  variant="span"
                  sx={{
                    fontSize: { xs: "2vmax", md: "1.5vmax", lg: "1.2vmax" },
                  }}
                  fontWeight="400"
                  textAlign="center"
                  color="var(--button1)"
                >
                  You can do this any time by going to your account section
                </Typography>
                <Box
                  component="form"
                  action="/somewhere_else"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl required>
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="h6" component="h5">
                            Are You a dropper
                          </Typography>
                        </FormLabel>
                        <RadioGroup
                          defaultValue="dropper"
                          name="isDropper"
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="NoDropper"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                      <FormControl required>
                        <FormLabel
                          id="demo-radio-buttons-group-label-mode-study"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="h6" component="h5">
                            What was your mode of study
                          </Typography>
                        </FormLabel>
                        <RadioGroup
                          onChange={handleChange}
                          defaultValue="Online"
                          name="studyMode"
                        >
                          <FormControlLabel
                            value="online"
                            control={<Radio />}
                            label="Online"
                          />
                          <FormControlLabel
                            value="offline"
                            control={<Radio />}
                            label="Offline"
                          />
                        </RadioGroup>
                      </FormControl>
                      <FormControl fullWidth required sx={{ mt: "12px" }}>
                        <InputLabel id="exam-select">Select a exam</InputLabel>
                        <Select
                          required
                          labelId="selct-exam-label"
                          id="select-exam"
                          value={exam}
                          name="exam"
                          label="Choose a exam"
                          onChange={handleChange}
                        >
                          <MenuItem value="jeemains">Jee Mains</MenuItem>
                          <MenuItem value="jeeadv">Jee Advance</MenuItem>
                          <MenuItem value="bitsat">BITSAT</MenuItem>
                        </Select>
                      </FormControl>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          required
                          fullWidth
                          id="rank"
                          label="Rank"
                          name="rank"
                          sx={
                            toggleRank
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          type="number"
                          onChange={handleChange}
                          autoComplete="rank"
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="branch"
                        label="Branch"
                        name="branch"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        id="gradyr"
                        label="Current Year (eg.1st,2nd ,etc.)"
                        name="yearOfStudy"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="linkedin-profile"
                        label="Linkedin Profile"
                        name="linkedin"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="youtube-link"
                        label="Youtube Link"
                        name="youtube"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="disc-you"
                        label="Quote"
                        name="descp"
                        inputProps={{ maxLength: 40 }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="about-you"
                        label="About You"
                        name="about"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Charges Per Week in ₹"
                        id="priced"
                        name="priced"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Charges Per Month in ₹"
                        id="pricem"
                        name="pricem"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            position: "relative",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={prgress}
                            sx={
                              prgress === 0
                                ? {
                                    position: "absolute",
                                    top: "5.18px",
                                    left: "5px",
                                    display: "none",
                                  }
                                : {
                                    position: "absolute",
                                    top: "5.18px",
                                    left: "5px",
                                  }
                            }
                          />
                          <div
                            class="success-animation"
                            style={
                              success
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <svg
                              class="checkmark"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 52 52"
                            >
                              <circle
                                class="checkmark__circle"
                                cx="26"
                                cy="26"
                                r="25"
                                fill="none"
                              />
                              <path
                                class="checkmark__check"
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                              />
                            </svg>
                          </div>
                          <Box
                            component="img"
                            src={card || cardPreviwew}
                            width="30px"
                            height="30px"
                            sx={{
                              aspectRatio: "1/1",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%,-50%)",
                              borderRadius: "50%",
                            }}
                            mr="10px"
                          ></Box>
                        </Box>

                        <Button variant="contained" component="label">
                          Upload Your ID Card
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            name="idcard"
                            onChange={handleChange}
                          />
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="p">
                        By proceeding ahead you are agreeing to our{" "}
                        <Link
                          style={{ textDecoration: "underline" }}
                          to="/privacy"
                        >
                          Privacy & Policy
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    disabled={uploading}
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      p: "0.8vmax 0",
                      fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                      bgcolor: "var(--button1)",
                      "&:hover": { backgroundColor: "var(--button1Hover)" },
                    }}
                  >
                    Apply For Mentor
                  </LoadingButton>
                </Box>
              </Box>
            </Container>
          )
        )}
      </ThemeProvider>
    </>
  );
};

export default FinalStep;
