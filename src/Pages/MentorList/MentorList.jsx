import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getMentorList } from "../../action/metorListAction";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
const MentorList = () => {
  const dispatch = useDispatch();
  const {
    error,
    user: mentList,
    loading,
  } = useSelector((state) => state.mentorList);
  const [user, setUser] = useState([]);
  useEffect(() => {
    dispatch(getMentorList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (loading === false) {
      setUser([...mentList.users]);
    }
  }, [loading, mentList]);

  const sortRatingDesc = () => {
    if (!loading) {
      const userSorted = [...user].sort((a, b) => b.ratings - a.ratings);
      setUser(userSorted);
    }
  };
  const sortRatingAsc = () => {
    if (!loading) {
      const userSorted = [...user].sort((a, b) => a.ratings - b.ratings);
      setUser(userSorted);
    }
  };
  const sortByCreatedDate = () => {
    if (!loading) {
      const userSorted = [...user].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUser(userSorted);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        mentList && (
          <>
            <Box
              maxWidth={"90vw"}
              sx={{ display: "flex", alignItems: "center" }}
              margin="0 auto"
              mt="1vmax"
              p="0 1.8vmax"
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.4vmax", md: "1vmax" },
                  fontWeight: 600,
                }}
              >
                Fitlers:
              </Typography>
              <Button
                variant="outlined"
                onClick={sortRatingDesc}
                sx={{
                  maxWidth: "16vmax",
                  display: "flex",
                  textalign: "center",
                  fontSize: {
                    xs: "1.2vmax",
                    md: "0.8vmax",
                    marginLeft: "1vmax",
                  },
                  p: { xs: "0 0.4vmax" },
                }}
              >
                Rating
                <ArrowUpwardIcon
                  sx={{ fontSize: { xs: "1.5vmax", md: "1vmax" } }}
                />
              </Button>
              <Button
                variant="outlined"
                onClick={sortRatingAsc}
                sx={{
                  maxWidth: "16vmax",
                  fontSize: {
                    xs: "1.2vmax",
                    md: "0.8vmax",
                    marginLeft: "1vmax",
                  },
                  p: { xs: "0 0.4vmax" },
                }}
              >
                Rating
                <ArrowDownwardIcon
                  sx={{ fontSize: { xs: "1.5vmax", md: "1vmax" } }}
                />
              </Button>
              <Button
                variant="outlined"
                onClick={sortByCreatedDate}
                sx={{
                  maxWidth: "16vmax",
                  fontSize: {
                    xs: "1.2vmax",
                    md: "0.8vmax",
                    marginLeft: "1vmax",
                  },
                  p: { xs: "0 0.4vmax" },
                }}
              >
                New Mentors
              </Button>
            </Box>
            <Grid container maxWidth={"90vw"} m="0 auto">
              {loading === false &&
                user?.map((item, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    key={i}
                    width={"20vw"}
                    p="1vmax"
                  >
                    <Card
                      sx={{
                        display: "flex",
                        width: { xs: "100%", md: "95%" },
                        borderRadius: "1vmax",
                        boxShadow: "-1px 1px 14px -5px rgba(0,0,0,0.4)",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                      component={Link}
                      to={`/mentors/${item._id}`}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: 100, sm: 120, md: 150 },
                          height: { xs: 100, sm: 120, md: 150 },
                          p: "1vmax",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        image={item.avatar.public_URI}
                        alt={item.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent>
                          <Typography
                            component="p"
                            variant="p"
                            sx={{
                              fontSize: { xs: "2.2vmax", md: "1.2vmax" },
                              fontWeight: 600,
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="p"
                            color="text.secondary"
                            component="p"
                            sx={{
                              fontSize: { xs: "1.8vmax", md: "1vmax" },
                              fontWeight: 500,
                            }}
                          >
                            {item.collegeName}({item.branch})
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{
                              fontSize: { xs: "1.8vmax", md: "1vmax" },
                              fontWeight: 500,
                            }}
                          >
                            {item.exam?.name === "jeemains" && (
                              <span>JEE MAINS({item.exam?.rank})</span>
                            )}
                            {item.exam?.name === "jeeadv" && (
                              <span>JEE ADV({item.exam?.rank})</span>
                            )}
                            {item.exam?.name === "bitsat" && (
                              <span>BITSAT({item.exam?.rank})</span>
                            )}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{
                              fontSize: { xs: "1.8vmax", md: "1vmax" },
                              fontWeight: 500,
                            }}
                          >
                            Current Year : {item.yearOfStudy}
                          </Typography>
                          <Rating
                            value={item?.ratings}
                            size={window.innerWidth < 600 ? "small" : "medium"}
                            readOnly
                            precision={0.5}
                          />
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          {/* <IconButton aria-label="previous">
                 {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
               </IconButton>
               <IconButton aria-label="play/pause">
                 <PlayArrowIcon sx={{ height: 38, width: 38 }} />
               </IconButton>
               <IconButton aria-label="next">
                 {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
               </IconButton> */}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </>
        )
      )}
    </>
  );
};

export default MentorList;
