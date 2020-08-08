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


const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
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
}));

export const NoteBook = () => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Show"
            />
            <div className={classes.container}>
                <Grow in={checked}>
                    {/* <CssBaseline /> */}
                    <Container maxWidth="md">
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '80vh', width: 'auto', overflow: 'hidden' }} >
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item xs={8}> I am an item</Grid>
                        </Grid>
                        </Typography>
                    </Container>
                </Grow>
                {/* Conditionally applies the timeout prop to change the entry speed. */}
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <Container maxWidth="md">
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', width: 'auto' }} >

                        </Typography>
                    </Container>
                    {/* <Paper elevation={4} className={classes.paper}>
                        <svg className={classes.svg}>
                            <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                        </svg>
                    </Paper> */}
                </Grow>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NoteBook)
