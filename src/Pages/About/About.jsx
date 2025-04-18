import React, { useEffect } from "react";
import { Box, Typography, Grid, Avatar, Link } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailIcon from '@mui/icons-material/Mail';
const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      },[]);
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem 1rem",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Title Section */}
        <Typography variant="h3" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
          About PrepSaarthi
        </Typography>

        {/* Description Section */}
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
          PrepSaarthi is a dedicated platform designed to support students on their journey to cracking JEE Mains and JEE Advanced. We connect aspiring IITians with mentors who have successfully cleared these prestigious exams and are now ready to share their knowledge and insights.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
          At PrepSaarthi, we believe that personalized mentorship is key to effective preparation. Our experienced mentors provide tailored guidance, helping you understand difficult concepts, build efficient study strategies, and manage the pressures that come with preparing for such a demanding exam. Whether you need help clarifying doubts, optimizing your time, or just a boost of motivation, our mentors are here to help.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
          PrepSaarthi ensures you have the support you need to navigate the challenges of IIT JEE preparation. With the right mentorship and resources, you can confidently work towards your goal of securing a place at one of India’s top IITs. Let us help you shape your future, step by step.
        </Typography>

        {/* Vision Section */}
        <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
          Our Vision
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
          At PrepSaarthi, our vision is to democratize access to high-quality guidance and mentorship for every JEE aspirant. We aim to create a future where every student, regardless of their background, has the opportunity to receive personalized support from those who have successfully achieved their IIT dreams. By empowering students with the right resources and mentorship, we envision a world where the path to IIT is more accessible and navigable for all.
        </Typography>

        {/* Mission Section */}
        <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
          Our mission at PrepSaarthi is to provide a comprehensive platform that connects students with mentors who can offer the expertise and encouragement needed to excel in JEE Mains and JEE Advanced. We are committed to fostering a supportive environment where students can thrive, learn from the best, and develop the skills necessary to succeed in one of the toughest exams in India.
        </Typography>

        {/* Why Choose Us Section */}
        <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
          Why Choose PrepSaarthi?
        </Typography>
        <ul style={{ textAlign: "left", listStyle: "none", paddingLeft: 0 }}>
          <li style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            <strong>Expert Mentorship:</strong> Learn directly from IITians who have mastered the JEE journey.
          </li>
          <li style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            <strong>Personalized Guidance:</strong> Receive tailored advice and strategies to enhance your preparation.
          </li>
          <li style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            <strong>Comprehensive Support:</strong> Access resources and support designed to address every aspect of your JEE preparation.
          </li>
          <li style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            <strong>Motivational Boost:</strong> Stay inspired and focused with mentorship that keeps you on track towards your goals.
          </li>
        </ul>

        {/* Team Section */}
        <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Founder */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Avatar
              src="/images/founder.jpg"
              alt="Founder Name"
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                border: `3px solid #ffc43b`,
              }}
            />
            <Typography variant="h6" sx={{ color: "#3A5AFF", fontWeight: "bold", mt: 2 }}>
              Ayush Tiwari
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "#777" }}>
              Founder & CEO
            </Typography>
            <Link href="https://www.linkedin.com/in/ayush-tiwari-725753203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" sx={{ color: "#ffc43b", textDecoration: "none", mt: 1 }}>
            <LinkedInIcon />
            </Link>
            <Link href="https://www.youtube.com/@AyushTiwari." target="_blank" sx={{ color: "#ffc43b", textDecoration: "none", mt: 1 }}>
            <YouTubeIcon />
            </Link>
          </Grid>

          {/* Website Developer */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Avatar
              src="/images/techL.jpg"
              alt="Vaibhav Markandeya Singh"
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                border: `3px solid #ffc43b`,
              }}
            />
            <Typography variant="h6" sx={{ color: "#3A5AFF", fontWeight: "bold", mt: 2 }}>
              Vaibhav Markandeya Singh
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "#777" }}>
              Technical Lead & Full-Stack Developer
            </Typography>
            <Link
    href="mailto:vaibhavsingh4141@gmail.com"  // Replace with your email address
    sx={{ color: '#ffc43b', textDecoration: 'none', mt: 1 }}
  >            <MailIcon />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutPage;
