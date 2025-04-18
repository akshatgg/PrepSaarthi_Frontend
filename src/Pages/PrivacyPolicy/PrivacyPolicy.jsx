import React, { useEffect } from "react";
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Default MUI primary color
    },
    secondary: {
      main: "#FFC43B",
    },
  },
});

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to PrepSaarthi's Privacy Policy. We are committed to
            protecting your privacy and ensuring that your personal information
            is handled in a safe and responsible manner. This policy outlines
            how we collect, use, disclose, and protect your information when you
            use our services.
          </Typography>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Information We Collect
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Mentors
            </Typography>
            <Typography variant="body1" paragraph>
              Personal Information: Name, contact details (email, phone number),
              educational background, professional experience.
            </Typography>
            <Typography variant="body1" paragraph>
              Profile Information: Photographs, biographies, areas of expertise,
              availability.
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
              Students
            </Typography>
            <Typography variant="body1" paragraph>
              Personal Information: Name, contact details (email, phone number),
              academic background, preferences for mentorship.
            </Typography>
            <Typography variant="body1" paragraph>
              Educational Information: Current education level, preparation
              status for JEE/NEET exams, preferences for mentor selection.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              To Provide Services: To match students with suitable mentors based
              on their preferences and to facilitate communication between
              mentors and students.
            </Typography>
            <Typography variant="body1" paragraph>
              To Improve Our Services: To understand your needs and preferences
              better, and to improve our website and services.
            </Typography>
            <Typography variant="body1" paragraph>
              To Communicate With You: To send you updates, newsletters, and
              other relevant information related to our services.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Disclosure of Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We are committed to protecting your privacy and will not share,
              sell, or rent your personal information to third parties without
              your consent, except in the following circumstances:
            </Typography>
            <Typography variant="body1" paragraph>
              Legal Requirements: If required by law, we may disclose your
              information to comply with legal processes.
            </Typography>
            <Typography variant="body1" paragraph>
              Protection of Rights: To protect and defend our rights and
              property, including enforcing our Terms of Service.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, disclosure,
              alteration, or destruction. These measures include physical,
              electronic, and managerial procedures to safeguard and secure the
              information we collect online.
            </Typography>
          </Box>
          <Box mt={4}>
  <Typography variant="h5" color="secondary" gutterBottom>
    Prohibited Conduct: Off-Platform Transactions and Refund Manipulation
  </Typography>
  <Typography variant="body1" paragraph>
    We are committed to maintaining a fair and trustworthy environment for both students and mentors. Engaging in off-platform transactions or manipulating the refund process is strictly prohibited. This includes, but is not limited to:
  </Typography>
  
  <List sx={{ listStyleType: 'disc' }}>
    <ListItem >
      <ListItemText
        primary="Mentors suggesting or advising students to cancel their mentorship and request a refund, followed by offering services at a discounted rate privately."
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary="Students proposing or agreeing to such off-platform arrangements with mentors."
      />
    </ListItem>
  </List>

  <Typography variant="h6" color="primary" gutterBottom>
        Consequences of Violations:
  </Typography>
  
  <List>
    <ListItem>
      <ListItemText
        primary="If a mentor is found engaging in these activities, their account will be permanently disabled without any prior notice. Any pending payments owed to the mentor will be forfeited."
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary="If a student is found engaging in these activities, their account will also be permanently disabled without prior notice. Access to mentorship services will be immediately revoked."
      />
    </ListItem>
  </List>

  <Typography variant="h6" color="primary" gutterBottom>
    Reporting and Investigation:
  </Typography>
  
  <List>
    <ListItem>
      <ListItemText
        primary="We encourage both students and mentors to report any suspicious or prohibited conduct without fear of unjust consequences. Reports will be thoroughly investigated, and actions will only be taken against the party found guilty of the violation."
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary="The account of the offending party will be banned based on the investigation's findings, ensuring that innocent parties are not penalized."
      /> 
    </ListItem>
  </List>

  <Typography variant="body1" paragraph>
    By using our platform, you agree to adhere strictly to these guidelines. Violations will be addressed with immediate and decisive actions to protect the integrity of our mentorship community.
  </Typography>
</Box>
          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to:
            </Typography>
            <Typography variant="body1" paragraph>
              Access Your Information: Request access to the personal
              information we hold about you.
            </Typography>
            <Typography variant="body1" paragraph>
              Correct Your Information: Request corrections to any inaccurate or
              incomplete information.
            </Typography>
            <Typography variant="body1" paragraph>
              Delete Your Information: Request the deletion of your personal
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              Our website may use cookies and other tracking technologies to
              enhance your experience. Cookies are small data files stored on
              your device that help us understand how you use our website and
              improve our services. You can control the use of cookies through
              your browser settings.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on our
              website. You are advised to review this Privacy Policy
              periodically for any changes.
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </Typography>
            <Typography variant="body1" paragraph>
              PrepSaarthi
            </Typography>
            <Typography variant="body1" paragraph>
              B606 Luxuria Estate,
              <br />
              Aditya World City NH9 ,<br />
              Ghaziabad-201002, India
            </Typography>
            <Typography variant="body1" paragraph>
            team@prepsaarthi.com
            </Typography>
            <Typography variant="body1" paragraph>
            +91 9336254473
            </Typography>
            <Typography variant="body1" paragraph>
              By using our services, you consent to the collection and use of
              your information as described in this Privacy Policy.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
