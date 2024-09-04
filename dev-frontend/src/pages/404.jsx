import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'; // Assuming you use React Router

const NotFound = () => (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}
    >
      <Box 
        sx={{ 
          textAlign: 'center',
          padding: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h1" color="error" sx={{ fontSize: '6rem' }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, mt:1 }}>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
);

export default NotFound;
