import { useEffect, useState } from "react";
import { Container, CssBaseline, Box, Typography, Alert, CircularProgress, Divider, Stack, Button } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getLabDetails } from "../../redux/actions/labActions";
import { user_logout } from "../../redux/actions/userActions";

// import TimerComponent from "./components/TimerComponent";
// import { difficultyColors } from '../../constant/index'
import { socket } from '../../utils/socket'
import SessionTabs from "./components/SessionTabs";
import LabDetails from './components/LabDetails';
import PdfViewer from './components/PdfViewer';
import ContentPane from './components/ContentPane';
import CompleteButton from './components/CompleteButton';


const SessionPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const labDetails = useSelector((state) => state.labDetails);

  const { userInfo } = userLogin;
  const { loading: labLoading, error: labError, success: labSuccess, labInfo } = labDetails;

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const stopTimmer = (e) => {
    e.stopPropagation();
    if (labInfo.status !== "completed") {
      const { id: labId } = labInfo;
      const userId = userInfo.userId;

      socket.emit("stop-session", { userId, labId }, (response) => {
        if (response.error) console.error(response.error);
      });
    }
    navigate("/dashboard");
  };

  const handleComplete = () => {
    if (labInfo && labInfo.status !== "completed") {
      const { id: labId } = labInfo;
      const userId = userInfo.userId;

      socket.emit("mark-as-completed", { userId, labId }, (response) => {
        if (response.error) {
          console.error(response.error);
        }
      });
    }
    navigate("/dashboard");
  };


  useEffect(() => {
    const handleConnect = () => console.log('Socket connection sucessfully:', socket.connected);
    // const handleError = (error) => console.error('Socket connection error:', error);

    socket.on("connect", handleConnect);
    // socket.on("error", handleError);

    if (labError && labError.response != null && labSuccess == false) {
      if (labError.response.status == 401 && labError.response.data == 'Invalid or expired token') {
        console.log('need new token');
        dispatch(user_logout())
        navigate("/login")
      }
    }

    if (labDetails == null || !labInfo) dispatch(getLabDetails(id));
    if (!userInfo || !userInfo._id) navigate("/signin");

    return () => {
      socket.off('connect', handleConnect);
      // socket.off("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, labError]);

  if (labError) {
    return (
      <Box component="section" sx={{ marginTop: 10 }}>
        <Alert severity="error">{labError.message}</Alert>
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 15, marginBottom: 10 }}>
      <CssBaseline />
      <Container>
        <Button onClick={(e) => stopTimmer(e)} variant="outlined">
          Go Back
        </Button>
      </Container>


      {labLoading ? (
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
      ) : (
        labInfo && (
          <Box
            sx={{
              height: "170vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <LabDetails
              title={labInfo.title}
              description={labInfo.description}
              difficulty={labInfo.difficulty}
              status={labInfo.status}
              timeSpent={labInfo.timeSpent}
            />

            {/* <Box sx={{ marginBottom: 1 }}>
              {labInfo.status != "completed" ? (
                <TimerComponent timeSpent={labInfo.timeSpent} />
              ) : null}
            </Box> */}

            {
              labInfo.course !== 'BIZ' && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <SessionTabs value={tabValue} handleChange={handleTabChange} />
                </Box>)
            }

            <Allotment className="allotment-container">
              <Allotment.Pane minSize={300} maxSize={700}>
                <PdfViewer pdfUrl={labInfo.pdfUrl} />
              </Allotment.Pane>
              <Allotment.Pane>
                <ContentPane
                  course={labInfo.course}
                  labInfo={labInfo}
                  userInfo={userInfo}
                  value={tabValue}
                  labLoading={labLoading}
                />
              </Allotment.Pane>
            </Allotment>

            {labInfo.status !== "completed" && (
              <CompleteButton onComplete={handleComplete}
              />
            )}
          </Box>
        )
      )}
    </Container>
  );
}

export default SessionPage;
