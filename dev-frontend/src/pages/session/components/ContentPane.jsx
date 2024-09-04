import PropTypes from 'prop-types';
import { Box, CircularProgress } from "@mui/material";
import CustomTabPanel from './CustomTabPanel';
import BlobFix from '../../../components/BusinessDev/BlobFix';
import XtermTerminal from '../../../components/Terminal';

const ContentPane = ({ course, userInfo, value, labLoading }) => {
    if (course === "BIZ") {
        return (
            <Box sx={{ height: '110vh',p:2 }}>
                <BlobFix />
            </Box>
        );
    }

    return (
        <Box>
            <CustomTabPanel value={value} index={0}>
                {labLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{ height: '110vh' }}>
                        <iframe
                            src={userInfo ? userInfo.jupyterLabUrl : ""}
                            width="100%"
                            height="100%"
                            title="Notebook Viewer"
                            style={{ border: 'none' }}
                        ></iframe>
                    </Box>
                )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <XtermTerminal />
            </CustomTabPanel>
        </Box>
    );
};

ContentPane.propTypes = {
    course: PropTypes.string.isRequired,
    labInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    labLoading: PropTypes.bool.isRequired,
};

export default ContentPane;
