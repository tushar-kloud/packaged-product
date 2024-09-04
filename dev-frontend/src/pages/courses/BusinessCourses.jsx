import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Button, Container, Grid, Box, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getLabList } from "../../redux/actions/labActions";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { LAB_SESSION_DETAILS_RESET } from "../../constant/labConstants"

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '... ';
  }
  return text;
};

const BusinessCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const labsList = useSelector((state) => state.labsList);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const { loading: labListLoading, error: labListError, labsData } = labsList

  // console.log(labsData);
  const mlCourse = labsData?.filter(course => course.course === 'BIZ');
  // console.log(mlCourse)
  dispatch({ type: LAB_SESSION_DETAILS_RESET })


  useEffect(() => {
    if (labsData == null || !labsData) dispatch(getLabList())

    if (!userInfo || !userInfo._id) navigate("/signin");

  }, [userInfo]);

  if (labListError) {
    return <Alert severity="error">{labListError}</Alert>;
  }
  return (
    <Container>
      <Box
        sx={{
          background: "#fafafa",
          p: 3,
          borderRadius: 5,
          mt: 7,
        }}
      >
         <Box sx={{ marginTop: 2, marginBottom: 3 }}>
          <Button
            onClick={(e) => {
              navigate("/dashboard");
            }}
            variant="outlined"
          >
            Go Back
          </Button>
        </Box>
        <Typography variant="sectionHeaderHeadline">
          Generative AI in Business
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            <strong>About this course</strong>
          </Typography>
          <Typography variant="body1">
            Our Generative AI in Business course teaches you how to leverage AI-driven technologies for content creation, marketing, and automation. You&apos;ll explore practical applications of generative AI to enhance business strategies, optimize workflows, and innovate in your industry. Ideal for professionals looking to integrate AI into their business practices.
          </Typography>
        </Box>
      </Box>
      {labListLoading && (
        <Box
          component="section"
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Grid container lg={11} spacing={3} sx={{ my: 2 }}>
        {mlCourse?.map((lab) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={lab.id} component={Link} to={`/session/${lab.id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                backgroundColor: "background.default",
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 500,
                width: "100%",
                margin: "auto",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={lab.imageUrl}
                alt={lab.title}
                sx={{
                  height: 180,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1, height: '130px' }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                  {lab.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncateText(lab.description, 15)}
                </Typography>
              </CardContent>
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    Difficulty: {lab.difficulty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    Status: {lab.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" sx={{ width: '90%' }}>Start Lab</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default BusinessCourses