import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


//======= Icons ========
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CoursesCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} sm={6} md={6} lg={4} key={course.id} onClick={() => navigate(`/dashboard/course/${course.path}`)} >
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
                    image={course.thumbnailImage}
                    alt={course.title}
                    sx={{
                        height: 180,
                        objectFit: "cover",
                    }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold", mb: 1 }}
                    >
                        {course.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {course.description}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 2,
                            gap: 1,
                        }}
                    >
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">
                            {course.duration}
                        </Typography>
                        <span>•</span>
                        <i
                            className="fa-solid fa-bolt"
                            style={{ fontSize: 16 }}
                        ></i>
                        <Typography variant="body2">{course.level}</Typography>
                        <span>•</span>
                        <i
                            className="fa-solid fa-briefcase"
                            style={{ fontSize: 16 }}
                        ></i>
                        <Typography variant="body2">
                            {course.techNonTech}
                        </Typography>
                    </Box>
                    {/* <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Completed:</strong> {course.progress}%
                                </Typography>

                                <LinearProgress
                                    variant="determinate"
                                    value={course.progress}
                                    sx={{ mt: 1, height: 10, borderRadius: 5 }}
                                />
                            </Box> */}
                </CardContent>
            </Card>
        </Grid>
    )
}

CoursesCard.propTypes = {
    course: PropTypes.array.isRequired,
};

export default CoursesCard