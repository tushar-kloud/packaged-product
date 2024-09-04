import React from "react";
import { Box, Grid } from "@mui/material";
import PromptChat from "../components/PromptChat"; // Ensure the path is correct
import BlobFix from "../components/BusinessDev/BlobFix";

const pdfUl = "https://docs.google.com/gview?a=v&pid=explorer&chrome=false&api=true&embedded=true&srcid=1zdGzDoecrzJOqe-GsHZZ5H6O3Ytzi7B9&embedded=true";

const BusinessLab =() => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        marginTop: 15,
        // marginBottom:10,
        height: "95vh",
        overflow: "hidden",
        flexDirection: { xs: "column", sm: "row" }, // Stack vertically on xs screens, side by side on sm and above
      }}
    >
      <Box sx={{marginLeft:2}}>
        <Button onClick={(e) => navigate("/dashboard")} variant="outlined">
          Go Back
        </Button>
      </Box> 
      {/* PDF Box */}
      <Grid
        container
        spacing={0}
        sx={{
          marginTop: 2,
          marginBottom: 10,
          height: "95vh",
          overflow: "hidden",
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on xs screens, side by side on sm and above
        }}
      >
        {/* PDF Box */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: { xs: "50%", sm: "100%" }, // 50% height on xs screens, full height on sm and above
            overflow: "hidden",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              // position: "absolute",
              top: 0,
              left: 0,
              width: "auto", // Match iframe width
              height: "95vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
              // pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "auto", // Match iframe width
                height: "95vh", // Match iframe height
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 0, 0.1)", // Overlay color
              }}
            />
            <iframe
              src={pdfUrl} // Replace with your PDF URL
              style={{
                width: "100%",
                height: "95vh",
                border: "none",
                zIndex: 0,
                padding: "10px",
              }}
              title="PDF Viewer"
            />
          </Box>
        </Grid>

        {/* Prompt Chat Box */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: { xs: "50%", sm: "100%" }, // 50% height on xs screens, full height on sm and above
            overflow: "hidden",
            paddingRight: { xs: "0", sm: "20px" }, // Remove padding on small screens
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              padding: 1,
            }}
          >
            <BlobFix />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BusinessLab;
