import PropTypes from 'prop-types';
import { Box } from "@mui/material";

const PdfViewer = ({ pdfUrl }) => {
    return (
        <Box sx={{height: '100%' }}>
            <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                title="PDF"
                style={{ border: 'none' }}
            />
        </Box>
    );
}



PdfViewer.propTypes = {
    pdfUrl: PropTypes.string.isRequired,
};

export default PdfViewer;
