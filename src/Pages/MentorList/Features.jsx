"use client"

import { useEffect } from "react"
import { Box, Typography, Grid, Card, CardContent, Container, Fade } from "@mui/material"
import { CalendarClock, Users, FileBarChart, UserRound, Network, GraduationCap, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
const Features = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/lists/mentors");
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const featureItems = [
    {
      title: "Goal-Oriented Weekly Planning",
      icon: <CalendarClock size={48} color="#3A5AFF" />,
      content: [
        "Each student will receive a structured weekly target tailored to their academic needs, ensuring that they have a clear direction to follow.",
        "The mentor will meticulously monitor progress on a daily basis, ensuring students stay on track and identify areas that need improvement.",
        "Personalized guidance will be provided to help students overcome challenges, refine their study techniques, and stay motivated throughout their learning journey.",
        "Regular reviews will be conducted to assess performance and make necessary adjustments to the study plan, ensuring continuous growth and learning.",
      ],
    },
    {
      title: "Daily One-on-One Mentorship Sessions",
      icon: <Users size={48} color="#3A5AFF" />,
      content: [
        "Students will have the opportunity to interact with their mentors every day through Google Meet, allowing them to clarify doubts and stay motivated.",
        "These daily sessions ensure that students receive consistent guidance, structured learning, and immediate solutions to their queries.",
        "Mentors will track student progress in real-time and make necessary adjustments to study plans based on student performance and feedback.",
        "The one-on-one interaction creates a strong mentor-student bond, ensuring students feel comfortable sharing their concerns and seeking personalized advice.",
      ],
    },
    {
      title: "Weekly Progress Reports for Parents",
      icon: <FileBarChart size={48} color="#3A5AFF" />,
      content: [
        "Every week, a detailed Google Meet session will be held with parents to discuss the student's academic growth, strengths, weaknesses, and areas requiring improvement.",
        "Parents can actively participate and provide their own insights, enabling them to support their child's learning journey more effectively.",
        "Mentors will also share study strategies with parents so they can encourage their children and ensure a conducive learning environment at home.",
      ],
    },
    {
      title: "Personalized Attention with Small Mentor Groups",
      icon: <UserRound size={48} color="#3A5AFF" />,
      content: [
        "Each mentor will be assigned only 3-5 mentees, ensuring focused attention and personalized study plans.",
        "With fewer mentees, mentors can spend more time on individual progress tracking, providing in-depth explanations, and addressing specific concerns.",
        "This setup helps create a close-knit learning community where students receive tailored support based on their academic needs.",
        "Mentors can dedicate more time to solving doubts, providing constructive feedback, and helping students build effective study habits.",
      ],
    },
    {
      title: "Peer Networking and Collaborative Learning",
      icon: <Network size={48} color="#3A5AFF" />,
      content: [
        "If a mentor has multiple mentees, students will have the opportunity to interact, collaborate, and build strong peer networks.",
        "A friendly and competitive atmosphere is cultivated, helping students develop critical thinking and problem-solving skills through peer discussions.",
        "Group study sessions and collaborative projects will be encouraged to enhance teamwork and shared learning experiences.",
        "Engaging discussions and study groups allow students to gain different perspectives on various topics and improve their conceptual understanding.",
      ],
    },
    {
      title: "Real-Life College Insights for Motivation",
      icon: <GraduationCap size={48} color="#3A5AFF" />,
      content: [
        "Mentors will share their personal experiences from college life to inspire students, giving them a clear idea of what to expect in higher education.",
        "Insights into academic challenges, extracurricular activities, and career-building opportunities will be discussed to help students make informed decisions.",
        "Mentors will also guide students on how to balance academics with social life, internships, and skill-building activities.",
        "Real-world examples and experiences will help students stay motivated and set clear career goals for their future endeavors.",
      ],
    },
    {
      title: "Proven Preparation Strategies from Mentors",
      icon: <BookOpen size={48} color="#3A5AFF" />,
      content: [
        "Each mentor will share their personal journey of how they prepared for competitive exams, providing students with effective strategies that actually work.",
        "Students will receive tried-and-tested study plans, practical tips, and learning techniques that have helped mentors achieve academic success.",
        "Detailed insights into time management, revision techniques, and question-solving strategies will be shared to help students optimize their preparation.",
        "Mentors will also recommend the best resources, including books, online lectures, and mock tests, ensuring students have access to high-quality study materials.",
      ],
    },
  ]

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem 0",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Hero Section with Image */}
      <Box
        sx={{
          position: "relative",
          height: "400px",
          width: "100%",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <img
          src="/classroom-mentorship.png"
          alt="Mentorship Program"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Why Join Our Mentorship Program?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              maxWidth: "800px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Structured guidance and personalized support for your academic journey
          </Typography>
        </Box>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "1000px",
            margin: "0 auto 5rem",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: "1.8", mb: 4 }}>
            Our mentorship program is designed to provide students with a structured learning path, continuous guidance,
            and personalized support. Whether you are enrolled in a coaching institute or doing self-study, our mentors
            will help you navigate your preparation journey effectively. We ensure that every student receives the best
            possible mentorship to maximize their potential and achieve their goals.
          </Typography>

          <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: "1.8", mb: 4 }}>
            Our program goes beyond just academic support—it fosters discipline, time management, and a strategic
            approach to learning. By following a well-defined study plan, students can enhance their conceptual
            understanding, minimize distractions, and maintain a steady progression towards their goals. Our mentors
            also provide motivation and accountability, ensuring that students remain focused and committed to their
            journey.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 } }}>
          {featureItems.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <Fade in={true} timeout={(index + 1) * 300}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 8px 24px rgba(58, 90, 255, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(58, 90, 255, 0.15)",
                    },
                    overflow: "visible",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: { xs: "center", md: "flex-start" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", md: "flex-start" },
                            position: "sticky",
                            top: "20px",
                          }}
                        >
                          <Box
                            sx={{
                              mb: 2,
                              p: 2,
                              borderRadius: "12px",
                              backgroundColor: "rgba(58, 90, 255, 0.05)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="h4"
                            sx={{
                              color: "#3A5AFF",
                              fontWeight: "bold",
                              mb: 2,
                              textAlign: { xs: "center", md: "left" },
                            }}
                          >
                            {index + 1}. {feature.title}
                          </Typography>

                          {/* {index % 2 === 0 && (
                            <Box
                              sx={{
                                width: "100%",
                                height: "200px",
                                position: "relative",
                                borderRadius: "12px",
                                overflow: "hidden",
                                display: { xs: "none", md: "block" },
                                mt: 2,
                              }}
                            >
                              <img
                                src={`/education-mentorship.png`}
                                alt={feature.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          )} */}
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <Box sx={{ pl: { md: 2 } }}>
                          <ul style={{ paddingLeft: "20px" }}>
                            {feature.content.map((item, i) => (
                              <li key={i} style={{ marginBottom: "16px" }}>
                                <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                                  {item}
                                </Typography>
                              </li>
                            ))}
                          </ul>

                          {/* {index % 2 !== 0 && (
                            <Box
                              sx={{
                                width: "100%",
                                height: "200px",
                                position: "relative",
                                borderRadius: "12px",
                                overflow: "hidden",
                                mt: 3,
                              }}
                            >
                              <img
                                src={`/education-mentorship.png`}
                                alt={feature.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          )} */}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            mb: 4,
            p: 4,
            borderRadius: "16px",
            backgroundColor: "rgba(58, 90, 255, 0.05)",
            maxWidth: "1000px",
            mx: "auto",
          }}
        >
          <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
            Ready to Transform Your Learning Experience?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 4 }}>
            Join our mentorship program today and take the first step towards academic excellence.
          </Typography>
          <Box
            component="button"
            onClick={handleClick} 
            sx={{
              backgroundColor: "#3A5AFF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#2A4AEF",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(58, 90, 255, 0.3)",
              },
            }}
          >
            Enroll Now
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Features
