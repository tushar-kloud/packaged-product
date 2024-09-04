import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledCard = styled(Card)(({ theme }) => ({
  maxHeight: 100,
  maxWidth: 300,
  width:250,
  // padding: theme.spacing(1),
  // margin: 'auto',
  // borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[3],
  // border: `1px solid red`,
}));

const TimerBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  // marginRight: theme.spacing(1),
}));

const TimerText = styled(Typography)({
  fontWeight: 'bold',
  // marginLeft: 'auto',
});

const Title = styled(Typography)(({ theme }) => ({
  // marginRight: theme.spacing(1),
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const TimerComponent = ({ timeSpent }) => {
  const [elapsedTime, setElapsedTime] = useState(timeSpent);

  useEffect(() => {
    // Set the initial start time considering the timeSpent
    const startTime = Date.now() - elapsedTime;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeSpent]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <StyledCard>
      <CardContent>
        {/* <Title variant="body1" textAlign="center">
          Session Timer
        </Title> */}
        <TimerBox>
          <StyledAvatar>
            <AccessTimeIcon />
          </StyledAvatar>
          <TimerText variant="body1">
            {formatTime(elapsedTime)}
          </TimerText>
        </TimerBox>
      </CardContent>
    </StyledCard>
  );
};

export default TimerComponent;
