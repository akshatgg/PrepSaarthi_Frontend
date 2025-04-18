import * as React from "react";
import { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { clearError, otpReset, resendOTP, reset, sendOTP, signUpMentor,mentorVerifyOTPEmail,mentorVerifyOTPNumb,stusendOTPnumb,stusendOTPemail, mentorSendOTPnumb,mentorSendOTPemail} from "../../action/userAction";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import MetaData from "../../utils/Metadata";
import imageCompression from "browser-image-compression";
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import { Input as BaseInput } from '@mui/base/Input';

import "./success.css";
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

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join('');
    });
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split('');

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(''));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? '',
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};


export default function MentorSignUp() {
  const navigate = useNavigate();
  const [mentorInfo, setMentorInfo] = React.useState({});
  const [avatarPrview, setAvatarPreview] = React.useState(
    "/images/profile.png"
  );
  const [avatar, setAvatar] = React.useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.mentor);
  const {
    error: otpError,
    loading: otpLoading,
    success: otpSuccess,
    sent
  } = useSelector((state) => state.newOTPsend);
    const {
      error: otpEmailError,
      loading: otpEmailLoading,
      success: otpEmailSuccess,
      sent: emailsent
    } = useSelector((state) => state.newMentorOTPsendemail);
    const {
      error: otpNumbError,
      loading: otpNumbLoading,
      success: otpNumbSuccess,
      sent: numbsent
    } = useSelector((state) => state.newMentorOTPsendnumb);
    
  const {
    loading: reLoading,
    success: reSuccess,
    error: reError,
  } = useSelector((state) => state.resendOtherOTP);

    const [Numbloading, NumbsetLoading] = React.useState(false);
    const [NumbOtpBoxes, setNumbOtpBoxes] = React.useState(false);
      const [NumbOtp, setNumbOtp] = React.useState('');

    function NumbhandleClick() {
      NumbsetLoading(true);
      setTimeout(() => {
        NumbsetLoading(false);
        setNumbOtpBoxes(true);
  
      }, 1000)
    }

  const [Gmailloading, GmailsetLoading] = React.useState(false);
  const [GmailOTPBoxes, setGmailOTPBoxes] = React.useState(false);
  const [gmailOtp, setgmailOtp] = React.useState('');

  function GmailhandleClick() {
    GmailsetLoading(true);
    setTimeout(() => {
      GmailsetLoading(false);
      setGmailOTPBoxes(true);
    }, 1000)

  }
  
  
  React.useEffect(() => {
    if(reSuccess){
      toast.success("OTP has been resent")
      dispatch(reset())
    }
    if(reError){
      toast.error(reError.message)
      dispatch(clearError())
    }
  }, [dispatch, reSuccess, reError])
  const handleSubmit = (event) => {
    event.preventDefault();
    const mentorInformation = new FormData();

    mentorInformation.set("name", mentorInfo.name);
    mentorInformation.set("email", mentorInfo.email);
    mentorInformation.set("mobileNumber", mentorInfo.phoneNo);
    mentorInformation.set("password", mentorInfo.password);
    mentorInformation.set("collegeName", mentorInfo.college);
    mentorInformation.set("emailOTP", mentorInfo.emailOTP);
    mentorInformation.set("numberOTP", mentorInfo.numberOTP);
    mentorInformation.set("avatar", avatar);

    const serializedData = {};
    mentorInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpMentor(serializedData));
  };

  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  
  React.useEffect(() => {
    dispatch(reset())
  }, [dispatch])
  React.useEffect(() => {
    if(otpSuccess){
      toast.success("OTP has been sent to your submitted email and mobile number")
      dispatch(reset())
    }
    if(otpError){
      toast.error(otpError.message)
      dispatch(clearError())
    }
  }, [dispatch, otpError, otpSuccess])
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

  {/* Adding Password Validation By Rajendra Jat */ }
  
    const [passwordCriteria, setPasswordCriteria] = React.useState({
      minLength: false,
      uppercase: false,
      number: false,
      specialChar: false,
    }); //Password Hint
    const [password, setPassword] = useState("");
    const [isHintVisible, setIsHintVisible] = useState(false);

  const handleChange = async (event) => {
    if (event.target.name === "avatar") {
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
        setAvatar(base64img);
        setAvatarPreview(base64img);
      } catch (error) {
        setuploading(false);
        toast.error(error.message);
      }
      // if (fileSizeMB > 3) {
      //   // Compression options
      //   const options = {
      //     maxSizeMB: 2, // Maximum size in MB
      //     maxWidthOrHeight: 1920, // Maximum width or height
      //     useWebWorker: true, // Use web worker
      //     maxIteration: 10, // Maximum number of iterations
      //     exifOrientation: undefined, // Preserve EXIF orientation
      //     fileType: 'image/jpeg', // Output file type
      //     initialQuality: 0.8, // Initial quality
      //   };

      //   try {
      //     console.log('start compressing')
      //     const compressedImage = await imageCompression(files, options);
      //     console.log('compressing done')
      //     const fileToUpload = compressedImage;
      //     const fileSizeMBC = fileToUpload.size/ 1024 / 1024;
      //     console.log(fileSizeMBC)
      //     const base64 = await convertBase64(fileToUpload);
      //     setAvatar(base64);
      //     setAvatarPreview(base64);
      //     return;
      //   } catch (error) {
      //     console.error("Error during image compression:", error);
      //   }
      // }
      // if (files.length === 1) {
      //   const base64 = await convertBase64(files[0]);
      //   setAvatar(base64);
      //   setAvatarPreview(base64);
      //   return;
      // }
    } else {
      setMentorInfo({ ...mentorInfo, [event.target.name]: event.target.value });
    }

    {/* Adding Password Validation By Rajendra Jat */ }
    if (event.target.name === "password") {
      const password = event.target.value;
      setPasswordCriteria({
        minLength: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(otpReset())
      dispatch(clearError());
    }
    if (user) {
      dispatch(otpReset())
      navigate("/verify/account");
    }
  }, [dispatch, error, navigate, user]);
  
  React.useEffect(() => {

    if (otpEmailSuccess) {
      toast.success("OTP has been sent to your submitted email")
      dispatch(reset())
    }
    if (otpEmailError) {
      toast.error(otpEmailError.message)
      dispatch(clearError())
    }
  }, [dispatch, otpEmailError, otpEmailSuccess])

  React.useEffect(() => {
    if (otpNumbSuccess) {
      toast.success("OTP has been sent to your submitted Mobile number")
      dispatch(reset())
    }
    if (otpNumbError) {
      toast.error(otpNumbError.message)
      dispatch(clearError())
    }
  }, [dispatch, otpNumbError, otpNumbSuccess])

  return (
    <>
      <MetaData title="Sign Up Mentor" />
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="mentorName"
                    label="Your Name"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    disabled={emailsent}
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LoadingButton
                            variant="contained"
                            sx={{
                              padding: "4px 10px", // Adjust the padding as needed
                              minWidth: "auto", // Remove the default minimum width of the button
                            }}
                            // loading={Gmailloading}
                            loading={otpEmailLoading}
                            onClick={() => {
                              // GmailhandleClick(); 

                              dispatch(
                                mentorSendOTPemail({
                                  email: mentorInfo.email
                                })
                              );
                            }}
                          >
                            <SendIcon />
                          </LoadingButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={emailsent ? { display: 'block' } : { display: 'none' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* OTP Input */}
                    <OTP
                      name="emailOTP"
                      id="emailOTP"
                      autoComplete="emailOTP"
                      separator={<span>-</span>}
                      value={gmailOtp}
                      onChange={(otp) => {
                        handleChange();
                        setgmailOtp(otp)
                      }}
                      length={5}
                    />

                    {/* Verify Button */}
                    <SubButton onClick={() => {
                      dispatch(mentorVerifyOTPEmail(gmailOtp))
                    }

                    }>Verify</SubButton>
                  </Stack>


                  <LoadingButton
                    loading={reLoading}
                    onClick={() => {
                      dispatch(resendOTP({
                        email: mentorInfo.email
                      }))
                    }}>Resend OTP</LoadingButton>
                </Grid>



                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="college"
                    label="College"
                    name="college"
                    autoComplete="college"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} >
                  <TextField
                    required
                    onChange={handleChange}
                    disabled={numbsent}
                    fullWidth
                    id="phoneno"
                    label="Mobile Number"
                    name="phoneNo"
                    autoComplete="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LoadingButton
                            variant="contained"
                            sx={{
                              padding: "4px 10px", // Adjust the padding as needed
                              minWidth: "auto", // Remove the default minimum width of the button
                            }}
                            // loading={Numbloading}
                            loading={otpNumbLoading}
                            onClick={() => {
                              // NumbhandleClick();
                              dispatch(
                                mentorSendOTPnumb({
                                  phoneNo: mentorInfo.phoneNo
                                })
                              );
                            }
                            }>
                            <SendIcon />
                          </LoadingButton>

                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sx={numbsent ? { display: 'block' } : { display: 'none' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* OTP Input */}
                    <OTP
                      id="numberOTP"
                      name="numberOTP"
                      separator={<span>-</span>}
                      value={NumbOtp}
                      onChange={(otp) => {
                        handleChange();
                        setNumbOtp(otp)
                      }}
                      length={5}
                    />

                    {/* Button */}
                    <SubButton
                      onClick={() => {
                        dispatch(mentorVerifyOTPNumb(NumbOtp))
                      }}
                    >Verify</SubButton>
                  </Stack>
                  <LoadingButton
                    loading={reLoading}
                    onClick={() => {
                      dispatch(resendOTP({
                        mobileNumber: mentorInfo.phoneNo
                      }))
                    }}>Resend OTP</LoadingButton>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onFocus={() => setIsHintVisible(true)}
                    onBlur={() => setIsHintVisible(false)}
                  />
                </Grid>

                {/* Adding Password Validation By Rajendra Jat */}
                {isHintVisible && (
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle1">Password must include:</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: passwordCriteria.minLength ? "green" : "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{passwordCriteria.minLength ? "✔" : "✖"}</span> Minimum 8 characters
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: passwordCriteria.uppercase ? "green" : "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{passwordCriteria.uppercase ? "✔" : "✖"}</span> At least one uppercase letter
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: passwordCriteria.number ? "green" : "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{passwordCriteria.number ? "✔" : "✖"}</span> At least one number
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: passwordCriteria.specialChar ? "green" : "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{passwordCriteria.specialChar ? "✔" : "✖"}</span> At least one special character
                      </Typography>
                    </Box>
                  </Grid>
                )}

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
                          success ? { display: "block" } : { display: "none" }
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
                        src={avatarPrview}
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
                      Upload Your Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="avatar"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    // loading={otpLoading}
                    // onClick={() => {
                    //   dispatch(
                    //     sendOTP({
                    //       email: mentorInfo.email,
                    //       mobileNumber: mentorInfo.phoneNo,
                    //     })
                    //   );
                    // }}
                    onClick={handleSubmit}
                    fullWidth
                    loading={loading}
                    disabled={uploading}
                    sx={!sent ? {
                      display:'block',
                      mt: 3,
                      mb: 2,
                      color:'white',
                      p: "0.8vmax 0",
                      fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                      bgcolor: "var(--button1)",
                      "&:hover": { backgroundColor: "var(--button1Hover)" },
                    } : {display:"none"}}
                  >
                   Sign Up
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="emailOTP"
                    label="Email Verification Code"
                    name="emailOTP"
                    autoComplete="emailOTP"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="numberOTP"
                    label="Mobile Number Verification Code"
                    name="numberOTP"
                    autoComplete="numberOTP"
                    onChange={handleChange}
                  />
                  <LoadingButton 
                  loading={reLoading}
                  onClick={() => {
                    dispatch(resendOTP({email: mentorInfo.email,
                      mobileNumber: mentorInfo.phoneNo}))
                  }}>Resend OTP</LoadingButton>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <Typography variant="p">
                    By signing up you are agreeing to our{" "}
                    <Link style={{ textDecoration: "underline" }} to="/privacy">
                      Privacy & Policy
                    </Link>
                  </Typography>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
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
                Sign Up
              </LoadingButton>
                </Grid>

              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" component={ReactLink}>
                    Already have an account? Sign in
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







const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const blueBtn = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  /* firefox */
  &:focus-visible {
    outline: 0;
  }
`,
);

const SubButton = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blueBtn[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blueBtn[500]};
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${blueBtn[400]}, inset 0 -2px 1px ${blueBtn[600]};

  &:hover {
    background-color: ${blueBtn[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blueBtn[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blueBtn[300] : blueBtn[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);