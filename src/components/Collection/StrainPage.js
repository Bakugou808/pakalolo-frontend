import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChemChart from '../ChemChart'
import Entries from '../Entries/Entries'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function StrainPage(props) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [value, setValue] = React.useState(0);
    const { strain } = props
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom component="div">
                {`${strain.name}: Strain Details`}
            </Typography>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Entries" {...a11yProps(1)} />
                    {/* <Tab label="Terpene Profile" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
            {/* Tab 1: Strain Description*/}
            <TabPanel value={value} index={0}>
                <div className={classes2.root}>
                    {strain && <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                <ChemChart data={strain.cannabinoidList} cannabinoids={true} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                <ChemChart data={strain.terpeneList} cannabinoids={false} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes2.paper}>
                                {strain.description}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                Flavors: {strain.flavorList}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                Positive: {strain.effects.positive.join(', ')}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                Negative: {strain.effects.negative.join(', ')}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes2.paper}>
                                Medical/Treats: {strain.effects.medical.join(', ')}
                            </Paper>
                        </Grid>
                    </Grid>}
                </div>
            </TabPanel>
            {/* Tab 2: Lab Results */}
            <TabPanel value={value} index={1}>
                <Entries />
                {/* {strain.cannabinoidList} */}
            </TabPanel>
            {/* Strain entries for logged in user */}
            {/* <TabPanel value={value} index={2}>
            </TabPanel> */}
        </div>
    );
}


const mapStateToProps = (store) => {
    return {
        strain: store.collection.selectedStrain
    }
}
const mapDispatchToProps = (store) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StrainPage)