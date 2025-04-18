import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AllMentors from './AllMentors.jsx'
const MentorDashboard = () => {
  const { error, loading, user, isAuthenticated } = useSelector(
    (state) => state.mentor
  );
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [menudata, setMenuData] = useState("Mentors");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const naviagteMenu = (text) => {
    setMenuData(text);
    sessionStorage.setItem("menu", text);
  };
  useEffect(() => {
    const page = sessionStorage.getItem("menu");
    if (Boolean(page)) {
      setMenuData(page);
    }
  }, []);
  const DrawerItem = ["Mentors", "Settings"]
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {DrawerItem.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => naviagteMenu(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  useEffect(() => {
    if (!loading) {
      if (!user?.user?.isHeadMentor || user?.user?.role !== "mentor") {
        navigate("/notfound");
      }
    }
  }, [loading, user?.user?.role, user?.user?.isHeadMentor, navigate]);
  return (
    <div>
      <Button variant="outlined" onClick={toggleDrawer(true) }sx={{mt:'0.5vmax', ml:'1vmax'}}>Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {menudata === "Mentors" && <AllMentors />}
      </Box>
    </div>
  );
};

export default MentorDashboard;
