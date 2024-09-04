import { Box, Container, Grid, Typography } from "@mui/material";
import CoursesCard from '../components/Cards/CoursesCard';

const courses = [
  {
    id: 1,
    title: "Machine Learning",
    description: "This Machine Learning course covers algorithms, data processing, and model building, teaching how to create systems that learn from data.",
    thumbnailImage: "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-117808.jpg?t=st=1725000270~exp=1725003870~hmac=0bf3834bd2bec893bfe05e1f994eae67d0f634e242deacd678f075df294f3c32&w=826",
    duration: "4 weeks",
    level: "Beginner",
    techNonTech: "Tech",
    path: "machine-learning"
  },
  {
    id: 2,
    title: "Artificial Intelligence",
    description: "This AI course teaches concepts like neural networks, and data analysis, equipping learners with skills for building intelligent systems",
    thumbnailImage: "https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1724666915~exp=1724670515~hmac=ab4ab609f283c5c0ca545ff7dc6f436599edcde3c204c95d8344bfe3d57720fc&w=900",
    duration: "4 weeks",
    level: "Beginner",
    techNonTech: "Tech",
    path: "artificial-intelligence"
  },
  {
    id: 3,
    title: "Generative AI in Business",
    description: "Generative AI in Business course explores AI-driven content creation, automation, and strategies for leveraging AI to enhance business operations.",
    thumbnailImage: "https://img.freepik.com/free-photo/ordinary-human-job-performed-by-anthropomorphic-robot_23-2151008339.jpg?t=st=1725000128~exp=1725003728~hmac=fdc89e615fa2237dcd4e09bb00be7feda96a65ba703bec05e33595f411feb0e8&w=740",
    duration: "4 weeks",
    level: "Beginner",
    techNonTech: "Tech",
    path: "business-labs"
  }
]

const DashboardPage = () => {

  return (

    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={10}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="sectionHeaderHeadline">
              Courses
            </Typography>
            <Grid container spacing={3} sx={{ my: 2 }}>
              {courses?.map((course, idx) => <CoursesCard key={idx} course={course} />)}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
