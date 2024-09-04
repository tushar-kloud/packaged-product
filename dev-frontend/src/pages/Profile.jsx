import { useState, Fragment } from 'react'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper, Grid, Box, Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { List, ListItem, Divider, ListItemText } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { dailyActivityData, dailyActivityOptions, topicCompletionData, topicCompletionOptions } from "../constant/index"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ProfilePage = () => {
    const [open, setOpen] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Grid container spacing={2} sx={{ mt: 5, padding: 3 }}>
            <Grid item xs={3}>
                <Item >
                    <Box>
                        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center"', alignItems: 'center' }}>
                            <Grid item md={5} xs={12}>
                                <img src="/profile.png" width="100px" alt="" />
                            </Grid>
                            <Grid item md={7} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                                <Typography variant="subtitle1"> {userInfo && userInfo.firstName}</Typography>
                                <Typography variant="body2">ANZ</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body2"> {userInfo && userInfo.email}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="h6">Skills</Typography>
                            <Box>
                                <Chip label="OpenAI" sx={{ cursor: 'pointer', m: 1 }} />
                                <Chip label="Hugging Face" sx={{ cursor: 'pointer', m: 1 }} />
                                <Chip label="NLP" sx={{ cursor: 'pointer', m: 1 }} />
                                <Chip label="Machine Learning" sx={{ cursor: 'pointer', m: 1 }} />
                                <Chip label="Computer Vision" sx={{ cursor: 'pointer', m: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={9}>
                <Item>
                    <Box>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item md={6} xs={12}>
                                <Card sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
                                    <CardHeader title="Generative AI for Full Stack Developer" />
                                    <CardContent>
                                        <Typography>Progress</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Box width="100%" mr={1}>
                                                <BorderLinearProgress variant="determinate" value={40} />
                                            </Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">{`40%`}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Card sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
                                    <CardHeader title="Generative AI for Managers" />
                                    <CardContent>
                                        <Typography>Progress</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Box width="100%" mr={1}>
                                                <BorderLinearProgress variant="determinate" value={12} />
                                            </Box>
                                            <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">{`12%`}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <Card style={{ border: "1px solid #ccc", padding: "16px" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ marginBottom: '40px' }}>
                                            Daily Activity Chart
                                        </Typography>
                                        <Line data={dailyActivityData} options={dailyActivityOptions} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card style={{ border: "1px solid #ccc", padding: "16px" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ marginBottom: '40px' }}>
                                            Topic Completion Percentage
                                        </Typography>
                                        <Bar data={topicCompletionData} options={topicCompletionOptions} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                        <Fragment>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Generative AI for Full Stack Developer
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <Box sx={{ width: '100%' }}>
                                                    <Typography>Introduction to Generative AI</Typography>
                                                    <BorderLinearProgress variant="determinate" value={50} />
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Introduction to AI and Machine Learning"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        Introduction to AI and Machine Learning
                                                                    </Typography>
                                                                    {" — I'll be in your neighborhood doing errands this…"}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Summer BBQ"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        to Scott, Alex, Jennifer
                                                                    </Typography>
                                                                    {" — Wish I could come, but I'm out of town this…"}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Oui Oui"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        Sandra Adams
                                                                    </Typography>
                                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2-content"
                                                id="panel2-header"
                                            >
                                                <Box sx={{ width: '100%' }}>
                                                    <Typography>Advanced AI Techniques with Hugging Face and OpenAI</Typography>
                                                    <BorderLinearProgress variant="determinate" value={50} />
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Introduction to Hugging Face"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {/* Ali Connors */}
                                                                    </Typography>
                                                                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Understanding Transformers"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {/* to Scott, Alex, Jennifer */}
                                                                    </Typography>
                                                                    {/* {" — Wish I could come, but I'm out of town this…"} */}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText
                                                            primary="Text Generation with GPT-3"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {/* Sandra Adams */}
                                                                    </Typography>
                                                                    {/* {' — Do you have Paris recommendations? Have you ever…'} */}
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>

                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    </Box>
                </Item>
            </Grid>
        </Grid>
    )
}

export default ProfilePage