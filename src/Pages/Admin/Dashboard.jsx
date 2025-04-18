import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SchoolIcon from "@mui/icons-material/School";
import FaceIcon from "@mui/icons-material/Face";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import MetaData from "../../utils/Metadata";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { users } = useSelector((state) => state.allStudents);
  const { users:mentors } = useSelector((state) => state.allMentors);
  const { connection } = useSelector(
    (state) => state.connections
  );
  const CustomIconWrapper = styled("div")(({ variant }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5vmax",
    color: "white",
    width: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    height: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    fontSize: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    backgroundColor:
      variant === "rupee"
        ? "var(--button1)"
        : variant === "mentor"
        ? "crimson"
        : variant === "student"
        ? "pink"
        : variant === "connection"
        ? "blue"
        : "",
    borderRadius: "50%",
  }));
  const sumPrice = connection?.connection?.reduce((sum, item) => sum + item.price, 0);

  const CustomIcon = ({ icon, variant }) => {
    return <CustomIconWrapper variant={variant}>{icon}</CustomIconWrapper>;
  };
  const cards = [
    {
      name: "Earning",
      total: sumPrice,
      icon: <CustomIcon icon={<CurrencyRupeeIcon />} variant={"rupee"} />,
    },
    {
      name: "Student",
      total: users?.users?.length,
      icon: <CustomIcon icon={<FaceIcon />} variant={"student"} />,
    },
    {
      name: "Mentors",
      total: mentors?.users?.length,
      icon: <CustomIcon icon={<SchoolIcon />} variant={"mentor"} />,
    },
    {
      name: "Connections",
      total: connection?.connection?.length,
      icon: <CustomIcon icon={<SyncAltIcon />} variant={"connection"} />,
    },
  ];
  return (
    <>
        <MetaData title="Dashboard" />

      <Grid container spacing={2}>
        {cards.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%", borderRadius: "2vmax" }}>
              <CardActionArea
                sx={{
                  width: "100%",
                  height: { sm: "22vmax" },
                  alignItems: "center",
                  justifyContent: "flex-start",
                  display: "flex",
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    sx={{ fontSize: 20, fontWeight: 600 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="h3">
                    {item?.total?.toLocaleString("en-IN") || <CircularProgress />}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
