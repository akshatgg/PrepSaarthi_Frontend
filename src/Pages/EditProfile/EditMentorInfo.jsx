import { ThemeProvider } from "@emotion/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from '@mui/icons-material/Lock';
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
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import CircularProgress from "@mui/material/CircularProgress";
import {
  clearError,
  clearMessage,
  loadUser,
  updateMentorFinalInfoAfter,
} from "../../action/userAction";
import Loader from "../../Components/Loader/Loader";
import LoadingButton from "@mui/lab/LoadingButton";
import MetaData from "../../utils/Metadata";

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

const EditMentorInfo = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    user: successMessage,
  } = useSelector((state) => state.mentorUpdateLastStep);
  const { user, loading: userLoad } = useSelector((state) => state.mentor);
  const handleSubmit = (event) => {
    event.preventDefault();
    const examobj = {
      name: exam,
      rank: rank,
    };
    const mentorInformation = new FormData();

    mentorInformation.set("isDropper", dropper);
    mentorInformation.set("yearOfStudy", year);
    mentorInformation.set("studyMode", mode);
    mentorInformation.set("exam", JSON.stringify(examobj));
    mentorInformation.set("linkedin", linkedin);
    mentorInformation.set("youtube", youtube);
    mentorInformation.set("disc", desc);
    mentorInformation.set("about", about);
    mentorInformation.set("ppm", ppm);
    mentorInformation.set("ppd", ppd);
    mentorInformation.set("branch", branch.toUpperCase());
    mentorInformation.set("idCard", card);

    const serializedData = {};
    mentorInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(updateMentorFinalInfoAfter(serializedData));
  };

  const [isToottip, setTooltip] = useState({});
  const [exam, setExam] = useState("jeemains");
  const [rank, setRank] = useState("");
  const [dropper, setDropper] = useState("");
  const [mode, setMode] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [desc, setDesc] = useState("");
  const [about, setAbout] = useState("");
  const [ppm, setppm] = useState("");
  const [ppd, setppd] = useState("");
  const [cardPreviwew, setCardPreview] = useState("");
  const [card, setCard] = useState("");

  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  
  React.useEffect(() => {
    if(prgress === 100)
      {setSuccess(true)
      setTimeout(() => {
        
    setProgress(0)
      }, 800);
      setTimeout(() => {
        setSuccess(false)
      }, 1200);}
  }, [prgress ])

  const handleChange = async (event) => {
    if (event.target.name === "idcard") {
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
        setuploading(false)
        setCard(base64img);
            setCardPreview(base64img);
      } catch (error) {
        setuploading(false)
        toast.error(error.message)
      }
    }
  };

  const handleToolTipChange = (e) => {
    setTooltip({ ...isToottip, [e.target.name]: true });
  };
  const removeChanges = (e) => {
    setTooltip({ ...isToottip, [e.target.name]: false });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (successMessage?.success) {
      toast.success("Your application is updated successfully");
      dispatch(loadUser());
      dispatch(clearMessage());
    }
  }, [
    error,
    dispatch,
    successMessage?.success,
    userLoad,
    user?.user?.isStepLastCompleted,
  ]);

  useEffect(() => {
    if (userLoad === false) {
      setExam(user?.user?.exam?.name);
      setRank(user?.user?.exam?.rank);
      setDropper(user?.user?.isDropper);
      setMode(user?.user?.studyMode);
      setBranch(user?.user?.branch);
      setYear(user?.user?.yearOfStudy);
      setLinkedin(user?.user?.linkedin);
      setYoutube(user?.user?.youtube);
      setDesc(user?.user?.desc);
      setAbout(user?.user?.about);
      setppm(user?.user?.pricePerMonth);
      setppd(user?.user?.pricePerDay);
      setCardPreview(user?.user?.idCard?.public_URI);
    }
  }, [userLoad, user]);

  return (
    <>
        <MetaData title="Edit Your Profile Info" />

      {userLoad ? (
        <Loader />
      ) : (
        <>
        {user?.user?.isStepLastCompleted ? (
          <ThemeProvider theme={defaultTheme}>
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
              <Typography component="h1" variant="h5">
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
                        value={dropper}
                        onChange={(e) => setDropper(e.target.value)}
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
                        onChange={(e) => setMode(e.target.value)}
                        defaultValue="Online"
                        name="studyMode"
                        value={mode}
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
                        value={exam || "jeemains"}
                        name="exam"
                        label="Choose a exam"
                        onChange={(e) => setExam(e.target.value)}
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
                        value={rank}
                        type="number"
                        onChange={(e) => setRank(e.target.value)}
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
                      value={branch}
                      name="branch"
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="gradyr"
                      value={year}
                      label="Graduation Year"
                      name="yearOfStudy"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="linkedin-profile"
                      label="Linkedin Profile"
                      value={linkedin}
                      name="linkedin"
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="youtube-link"
                      label="Youtube Link"
                      value={youtube}
                      name="youtube"
                      onChange={(e) => setYoutube(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="disc-you"
                      value={desc?.slice(0,35)}
                      label={`Quote (${35 - desc?.slice(0,35)?.length})`}
                      error={desc?.length >= 35}
                      name="descp"
                      inputProps={{ maxLength: 35 }} 
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="about-you"
                      label={`About You (${400-about?.length})`}
                      error={about?.length >= 400}
                      name="about"
                      value={about?.slice(0,400)}
                      inputProps={{maxLength:400}}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} position="relative">
                    <TextField
                      required
                      fullWidth
                      id="pricem"
                      label="Charges Per Month"
                      name="pricem"
                      value={ppm}
                      onChange={(e) => setppm(e.target.value)}
                      onFocus={handleToolTipChange}
                      onBlur={removeChanges}
                    />
                    <Tooltip
                      sx={
                        Boolean(isToottip.pricem)
                          ? {
                              display: "block",
                              position: "absolute",
                              right: 0,
                              top: "33.33%",
                            }
                          : { display: "none" }
                      }
                      title="Changing your charges will temporarily remove you from the mentor list until your changes are approved."
                    >
                      <IconButton>
                        <ErrorIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} position="relative">
                    <TextField
                      required
                      fullWidth
                      id="priced"
                      label="Charges Per Week"
                      name="priced"
                      value={ppd}
                      onChange={(e) => setppd(e.target.value)}
                      onFocus={handleToolTipChange}
                      onBlur={removeChanges}
                    />
                    <Tooltip
                      sx={
                        Boolean(isToottip.priced)
                          ? {
                              display: "block",
                              position: "absolute",
                              right: 0,
                              top: "33.33%",
                            }
                          : { display: "none" }
                      }
                      title="Changing your charges will temporarily remove you from the mentor list until your changes are approved."
                    >
                      <IconButton>
                        <ErrorIcon />
                      </IconButton>
                    </Tooltip>
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
                        sx={prgress === 0 ? {
                          position: "absolute",
                          top: "5.18px",
                          left: "5px",
                          display:"none"
                        }:{
                          position: "absolute",
                          top: "5.18px",
                          left: "5px",
                        }}
                      />
                      <div class="success-animation" style={success? {display:'block'} : {display:'none'}}>
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
                  variant="contained"
                  disabled={uploading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    p: "0.8vmax 0",
                    fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                    bgcolor: "var(--button1)",
                    "&:hover": { backgroundColor: "var(--button1Hover)" },
                  }}
                >
                  Edit Mentorship Info
                </LoadingButton>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        ):(<>
           <Box sx={{
                          background: 'rgba( 255, 255, 255, 0.25 )',
                          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                          backdropFilter:' blur( 13px )',
                          borderRadius: '10px',
                          border: '1px solid rgba( 255, 255, 255, 0.18 )',
                          height:'80vh',
                          width:'95%',
                          margin:'10px auto',
                          display:'flex',
                          textAlign:'center',
                          justifyContent:'center',
                          alignItems:'center',
                          flexDirection:'column',
                          p:2
                        }}>
                          <LockIcon sx={{color:'grey', fontSize:{xs:'6vmax',md:'3vmax'}}}/>
                          <Typography component='h2' variant="p" color={'grey'} sx={{fontSize:{xs:'2.8vmax', md:'1.5vmax'}}}>
                            Kindly complete the mentor application 
                          </Typography>
                        </Box>
        </>)}
        </>
      )}
    </>
  );
};

export default EditMentorInfo;
