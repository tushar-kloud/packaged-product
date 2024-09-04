import Hero from "../components/Hero"
import Features from "../components/Features"
import Footer from "../components/Footer"
import { Zoom, Fab, useScrollTrigger } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { techLearningPaths, nonTechLearningPaths } from "../constant";
// import LearningPathsSection from "../components/LearningPath";


function ScrollTop(props) {
    // eslint-disable-next-line react/prop-types
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#hero"
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Zoom in={trigger}>
            <div
                onClick={handleClick}
                role="presentation"
                style={{ position: "fixed", bottom: 16, right: 16 }}
            >
                {children}
            </div>
        </Zoom>
    );
}

const HomePage = () => {
    return (
        <>
            <Hero />
            <Features />
            {/* <LearningPathsSection title="Technical Learning Paths" learningPaths={techLearningPaths} />
            <LearningPathsSection title="Learning Paths For Businesses" learningPaths={nonTechLearningPaths} /> */}
            <ScrollTop>
                <Fab color="primary" size="large" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Footer />
        </>
    )
}

export default HomePage