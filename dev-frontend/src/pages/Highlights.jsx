import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UseCaseIcon from "@mui/icons-material/BusinessCenter";

const highlights = [
  {
    title: "Scalable Solutions",
    description:
      "Our product scales effortlessly to meet the demands of any organization size.",
    image:
      "https://media.istockphoto.com/id/467248618/photo/cloud-computing.jpg?s=612x612&w=0&k=20&c=WWTw8AsuNtbruDHWNtD9-PzFzBpokUxhpIvC6zT1bd0=", // Replace with actual image paths
  },
  {
    title: "Advanced Security",
    description:
      "Built-in advanced security features to protect your data and ensure compliance.",
    image:
      "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041839.jpg",
  },
  {
    title: "Custom Integrations",
    description:
      "Seamlessly integrate with your existing tools and workflows for enhanced productivity.",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-api-illustration_23-2149379500.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721088000&semt=ais_user",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you.",
    image:
      "https://st3.depositphotos.com/4320021/36710/v/450/depositphotos_367103918-stock-illustration-service-concept-open-support-service.jpg",
  },
  {
    title: "Compliance and Governance",
    description:
      "Adhere to industry standards and governance frameworks with our compliant solutions.",
    image:
      "https://www.shutterstock.com/image-photo/compliance-rules-law-regulation-policy-600nw-1139995271.jpg", // Replace with actual image paths
  },
  {
    title: "Regulatory Compliance",
    description:
      "Stay compliant with regulatory requirements and ensure data security.",
    image:
      "https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595842.jpg", // Replace with actual image paths
  },
  {
    title: "Data Security",
    description:
      "Robust data security measures to protect your sensitive information.",
    image:
      "https://media.istockphoto.com/id/1484313578/photo/cyber-security-network-data-protection-privacy-concept.jpg?s=612x612&w=0&k=20&c=mBkwneErmbHd7s8xauDNU-uXitNSXXBtxJ7C9He0Y9s=", // Replace with actual image paths
  },
];

const useCases = [
  {
    title: "E-commerce Platforms",
    description:
      "Optimize your online store with our powerful tools for better customer engagement.",
    icon: UseCaseIcon,
  },
  {
    title: "Healthcare Systems",
    description:
      "Improve patient care and streamline operations with our tailored healthcare solutions.",
    icon: UseCaseIcon,
  },
  {
    title: "Educational Institutions",
    description:
      "Enhance learning experiences with our interactive and scalable educational tools.",
    icon: UseCaseIcon,
  },
  {
    title: "Financial Services",
    description:
      "Secure and efficient financial management with our comprehensive solutions.",
    icon: UseCaseIcon,
  },
];

const HighlightsScreen = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <strong>Product Highlights</strong>
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {highlights.map((highlight, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                alt={highlight.title}
                height="140"
                image={highlight.image}
                title={highlight.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {highlight.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {highlight.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <strong>Use Cases</strong>
      </Typography>
      <Grid container spacing={4}>
        {useCases.map((useCase, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <useCase.icon
                sx={{ fontSize: 48, color: "primary.main", mr: 2 }}
              />
              <Box>
                <Typography variant="h6" component="div">
                  {useCase.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {useCase.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <strong>Questions and Answers</strong>
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How do I create an account?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              To create an account, click on the Sign Up button on the top
              right corner of the homepage. Fill in the required information and
              submit the form. You will receive a confirmation email to verify
              your account.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How do I reset my password?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              To reset your password, click on the Forgot Password link on the
              login page. Enter your email address and follow the instructions
              sent to your email to reset your password.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How do I cancel my subscription?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              To cancel your subscription, go to your account settings and click
              on the Cancel Subscription button. Follow the prompts to confirm
              the cancellation. You will receive a confirmation email once your
              subscription has been successfully cancelled.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How do I contact customer support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              To contact customer support, click on the Contact Us link at the
              bottom of the page. Fill out the form with your question or issue
              and a customer support representative will get back to you as soon
              as possible.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default HighlightsScreen
