import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Entries from '../Entries/Entries'


const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
        height: '2 in',
        width: 'auto',

    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    grid: {
        padding: "30 px",
    }
}));

export const NoteBook = (props) => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const {selectedSmokeList} = props

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className={classes.root}>
            {/* <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Show"
            /> */}
            {selectedSmokeList &&
            
            <div className={classes.container}>
                <Grow in={checked}>
                    {/* <CssBaseline /> */}
                    <Container maxWidth="md">
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '120vh', width: 'auto', overflow: 'hidden' }} >
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.grid}
                        >
                            <Grid item xs={24}>
                                <Paper className={classes.paper}>
                                    {selectedSmokeList.title}
                                    <br></br>
                                    {selectedSmokeList.description}
                                </Paper>
                            </Grid>
                            <Grid item xs={24} md={20}> 
                            <Entries smokeListPage={true} />
                            </Grid>
                        </Grid>
                        </Typography>
                    </Container> 
                </Grow>
                {/* Conditionally applies the timeout prop to change the entry speed. */}
                {/* <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <Container maxWidth="md">
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', width: 'auto' }} >
                            {selectedSmokeList.title}
                        </Typography>
                    </Container>
                </Grow> */}
            </div>}
        </div>
    );
}

const mapStateToProps = (store) => ({
    selectedSmokeList: store.smokeLists.selectedSmokeList,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NoteBook)
