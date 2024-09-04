import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Copyright from './Copyright';


const logoStyle = {
  width: '140px',
  height: 'auto',
};

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
        gap: { xs: 4, sm: 6, md: 8 },
        py: { xs: 6, sm: 8, md: 10 },
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          gap: { xs: 4, sm: 8 },
          justifyContent: { xs: 'center', sm: 'space-between' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: { xs: '100%', sm: '60%' },
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '80%' } }}>
            <img
              src="/Kloudstac_logo.png"
              style={logoStyle}
              alt="logo of Kloudstac"
            />
            <Typography variant="body2" color="text.secondary" mb={2} textAlign={{ xs: 'center', sm: 'left' }}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <Button variant="contained" sx={{ flexShrink: 0, backgroundColor: "rgb(9, 89, 170)" }}>
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 4,
            width: '40%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Product
            </Typography>
            <Link color="text.secondary" href="#">Highlights</Link>
            <Link color="text.secondary" href="#">Pricing</Link>
            <Link color="text.secondary" href="#">FAQs</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Company
            </Typography>
            <Link color="text.secondary" href="#">About us</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Legal
            </Typography>
            <Link color="text.secondary" href="#">Terms</Link>
            <Link color="text.secondary" href="#">Privacy</Link>
            <Link color="text.secondary" href="#">Contact</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Footer;