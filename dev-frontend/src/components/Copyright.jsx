import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Container from '@mui/material/Container';


const Copyright = () => {
    return (
        <Container maxWidth="lg" sx={{pb: { xs: 6, sm: 8, md: 10 }, mt:2}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', sm: 'space-between' },
                    pt: { xs: 2, sm: 4, md: 6 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    textAlign: { xs: 'center', sm: 'left' },
                }}
            >
                <Box>
                    <Link color="text.secondary" to="/">Privacy Policy
                    </Link>
                    <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" to="/">
                        Terms of Service
                    </Link>
                    <Typography variant="body2" color="text.secondary" my={1}>
                        {'Copyright © '}
                        <Link href="/">Kloudstac&nbsp;</Link>
                        {new Date().getFullYear()}
                    </Typography>
                </Box>

                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{
                        color: 'text.secondary',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        // mt: { xs: 2, sm: 0 },
                    }}
                >
                    <IconButton
                        color="inherit"
                        href="https://twitter.com/kloudstac"
                        aria-label="Twitter"
                        sx={{ alignSelf: 'center' }}
                    >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://www.linkedin.com/company/kloudstac/mycompany/"
                        aria-label="LinkedIn"
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    )
}

export default Copyright