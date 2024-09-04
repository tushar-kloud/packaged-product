import { useState } from 'react';
import { Box, Button, Card, Chip, Container, Grid, Link, Stack, Typography, CardMedia } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';


const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard and Metrics',
    description: 'A metric capturing and showcasing mechanism tMonitor your learning progress in real time with easy-to-read metrics that help you stay on top of your goals.',
    imageSrc: "/product1.jpg"
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Integrated Learning Environment',
    description: 'Integrated tools that allow the user to perform learning-related coding operations in real-time.',
    imageSrc: "/product2.jpg"
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Customizable Curriculum',
    description: 'Empowers organizations to design and implement personalized learning paths tailored to their specific needs and goals.',
    imageSrc: "/product1.jpg"
  }
];

const Features = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here you can provide a brief overview of the key features of the
              product. For example, you could list the number of features, the types
              of features, add-ons, or the benefits of the features.
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: selectedItemIndex === index ? 'primary.light' : '',
                  background: selectedItemIndex === index ? 'none' : '',
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              src={items[selectedItemIndex].imageSrc}
              sx={{ minHeight: 280, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link color="primary" variant="body2" fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
              </Link>
            </Box>
          </Box>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: selectedItemIndex === index ? 'primary.light' : 'grey.200'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box sx={{ color: selectedItemIndex === index ? 'primary.main' : 'grey.300' }}>
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => { event.stopPropagation() }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              src={items[selectedItemIndex].imageSrc}
              sx={{ m: 'auto', width: 420, height: 500 }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Features;