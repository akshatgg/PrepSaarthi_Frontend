"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Collapse from "@mui/material/Collapse"
import SyllabusTracker from "./SyllabusTracker"
import ListIcon from "@mui/icons-material/List"
import { useLocation } from "react-router-dom"

export default function SyllabusDrawer() {
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
  const { subject, division } = location.state || {}
  const [expandedSections, setExpandedSections] = React.useState({})
  const [selection, setSelection] = React.useState(null)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  React.useEffect(() => {
    // First try to get selection from URL state
    if (subject && division) {
      const newSelection = { division, subject }
      setSelection(newSelection)
      // Save to localStorage for persistence
      localStorage.setItem("syllabusSelection", JSON.stringify(newSelection))
    } else {
      // If not in URL state, try to get from localStorage
      const savedSelection = localStorage.getItem("syllabusSelection")
      if (savedSelection) {
        setSelection(JSON.parse(savedSelection))
      }
    }
  }, [subject, division])

  const toggleSection = (subject) => {
    setExpandedSections((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }))
  }

  const handleSelectionChange = (newDivision, newSubject) => {
    const newSelection = { division: newDivision, subject: newSubject }
    setSelection(newSelection)
    // Save to localStorage whenever selection changes
    localStorage.setItem("syllabusSelection", JSON.stringify(newSelection))
    toggleDrawer(false)()
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["Chemistry", "Physics", "Maths"].map((subject) => (
          <React.Fragment key={subject}>
            <ListItem>
              <ListItemButton onClick={() => toggleSection(subject)}>
                <ListItemText primary={subject} />
                {expandedSections[subject] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
            <Collapse in={expandedSections[subject]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem onClick={() => handleSelectionChange(11, subject)}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Class 11" />
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={() => handleSelectionChange(12, subject)}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Class 12" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      <Button
        sx={{ position: "absolute", top: 85, right: 10 }}
        variant="contained"
        startIcon={<ListIcon />}
        onClick={toggleDrawer(true)}
      >
        Show Content
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} disableScrollLock={true}>
        {DrawerList}
      </Drawer>
      <SyllabusTracker tracker={selection} />
    </div>
  )
}
