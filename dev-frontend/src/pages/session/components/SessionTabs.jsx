import PropTypes from 'prop-types';
import { Tabs, Tab } from "@mui/material";

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SessionTabs = ({ value, handleChange }) => (
    <Tabs value={value} onChange={handleChange} aria-label="session tabs" sx={{ marginBottom: 3 }}>
        <Tab label="Jupyter Notebook" {...a11yProps(0)} sx={tabStyles} />
        <Tab label="Terminal" {...a11yProps(1)} sx={tabStyles} />
    </Tabs>
);

const tabStyles = {
    border: '1px solid',
    borderColor: 'primary.main',
    color: 'primary.main',
    borderRadius: 1,
    '&.Mui-selected': {
        backgroundColor: 'primary.light',
        color: 'white'
    }
};

SessionTabs.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default SessionTabs;
