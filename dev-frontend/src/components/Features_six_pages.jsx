import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

const features = [
  {
    name: 'Feature 1',
    icon: 'feature_icon1', // replace with actual icon name or path
    description: 'Description for Feature 1',
  },
  {
    name: 'Feature 2',
    icon: 'feature_icon2', // replace with actual icon name or path
    description: 'Description for Feature 2',
  },
  {
    name: 'Feature 3',
    icon: 'feature_icon3', // replace with actual icon name or path
    description: 'Description for Feature 3',
  },
  {
    name: 'Feature 4',
    icon: 'feature_icon4', // replace with actual icon name or path
    description: 'Description for Feature 4',
  },
  {
    name: 'Feature 5',
    icon: 'feature_icon5', // replace with actual icon name or path
    description: 'Description for Feature 5',
  },
  {
    name: 'Feature 6',
    icon: 'feature_icon6', // replace with actual icon name or path
    description: 'Description for Feature 6',
  },
];

function FeatureTab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="feature tabs">
            {features.map((feature, index) => (
              <Tab key={index} icon={<Icon>{feature.icon}</Icon>} label={feature.name} value={(index + 1).toString()} />
            ))}
          </TabList>
        </Box>
        {features.map((feature, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <Typography variant="h6" sx={{ mt: 4 }}>{feature.name}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {feature.description}
            </Typography>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default FeatureTab;
