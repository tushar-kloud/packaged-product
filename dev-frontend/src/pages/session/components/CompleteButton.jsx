import PropTypes from 'prop-types';
import { Box, Button } from "@mui/material";

const CompleteButton = ({ onComplete, disabled }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
      marginTop: "20px",
    }}
  >
    <Button variant="contained" onClick={onComplete} disabled={disabled}>
      Mark as Complete
    </Button>
  </Box>
);

CompleteButton.propTypes = {
  onComplete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CompleteButton.defaultProps = {
  disabled: false,
};

export default CompleteButton;
