import PropTypes from 'prop-types';
import { Container, Grid, Typography, Divider, Stack, Box } from "@mui/material";
import { difficultyColors } from '../../../constant/index'
import TimerComponent from './Timer';

const LabDetails = ({ title, description, difficulty, status, timeSpent }) => {
    return (
        <Container sx={{ padding: 3 }}>
            <Grid container spacing={2} sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb:2
            }}>
                <Grid items sm={12} md={9}>
                    <Typography variant="h4">{title}</Typography>
                </Grid>
                <Grid items sm={12} md={3}>
                    <TimerComponent timeSpent={timeSpent} />
                </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom>{description}</Typography>
            <Divider sx={{ width: "100%", marginBottom: "20px" }} />
            <Stack direction='row' spacing={2}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold' }}
                    color={difficultyColors[difficulty.toLowerCase()]}>
                    Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: '#5b5e5c', fontWeight: "bold" }}>
                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                </Typography>
            </Stack>
        </Container>
    );

}
LabDetails.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default LabDetails;
