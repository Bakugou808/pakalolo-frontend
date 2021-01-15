import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { deleteSmokeList, setNoteBookDisplay } from '../../actions/smokeListActions'
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Entries from '../Entries/Entries'
import { setEntriesForSmokeList } from '../../actions/smokeListActions'
import { setSelectedStrainsEntries } from '../../actions/entriesActions'
// import {Container as BSContainer} from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-bootstrap/Modal';
import ListForm from './ListForm'


const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
        width: '100%',
    },
    paper: {
        margin: theme.spacing(1),
        height: '2 in',
        width: '100%',

    },
    paper2: {
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
    },
    container2: {
        display: 'block',
    },
    title: {
        position: 'relative',
        top: '50%',
        // transform: 'translateY(-30 %)',
        'font-size': '30px',
        float: 'left',
        // left: '10%',
        width: 'inherit'
    },
    menuIcon: {
        float: "right",
        position: "relative",
        // transform: 'translateY(-30 %)',
        top: '50%',
        // left: '10%'

    },
    description:{
        'font-size': '18px',
        position: 'relative',
        // 'text-align': 'center',
        // margin: '20x',
        top: '80%',
        // transform: 'translateY(-30 %)',



    },
    table: {
        width: 'inherit',
        'padding-top': '20px'
    }

}));

export const NoteBook = (props) => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editSmokeList, setEditSmokeList] = React.useState(false)

    const { selectedSmokeList, onSetEntriesForSmokeList, onSetSelectedStrainsEntries, onDeleteSmokeList, onSetNotebook } = props

    const handleChange = () => {
        setChecked((prev) => !prev);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteSmokeList = () => {
        onDeleteSmokeList(selectedSmokeList.id)
    }



    useEffect(() => {

    }
    )

    return (
        <div className={classes.root}>

            {selectedSmokeList &&

                <div className={classes.container}>
                    <Grow in={checked}>
                        {/* <CssBaseline /> */}
                        {/* <Container maxWidth="xl">
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '120vh', width: '100%', overflow: 'hidden' }} > */}
                            <>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="center"
                                    className={classes.grid}
                                >
                                    <Grid item xs={24} sm={12} lg={12}>
                                        <Paper className={classes.paper2}>
                                            <Container>
                                                <Row >
                                                    <div className={classes.container2}>
                                                    <div className={classes.title}>{selectedSmokeList.title}</div>
                                                    <div className={classes.menuIcon}>
                                                        <Tooltip interactive >
                                                            <IconButton title='Options' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                                                                <MoreVertIcon style={{ display: 'align-right' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose}
                                                        >
                                                            <MenuItem onClick={handleDeleteSmokeList}>Delete Smoke List</MenuItem>
                                                            <MenuItem onClick={() => setEditSmokeList(true)}>Edit Smoke List</MenuItem>

                                                        </Menu>
                                                    </div>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className={classes.container2}>
                                                    <div className={classes.description}>{selectedSmokeList.description}</div>
                                                    </div>
                                                </Row>
                                            </Container>
                                            <br></br>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={24} md={20} className={classes.table}>
                                        <Entries smokeListPage={true} />
                                    </Grid>
                                </Grid>
                            {/* </Typography> */}
                            <Modal
                                size="lg"
                                show={editSmokeList}
                                onHide={() => setEditSmokeList(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-lg">
                                            Edit Entry
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ListForm smokeList={selectedSmokeList} setForm={setEditSmokeList} />
                                    </Modal.Body>
                                </>

                            </Modal>
                            </>
                        {/* </Container> */}
                    </Grow>
                </div>}
        </div>
    );
}

const mapStateToProps = (store) => ({
    selectedSmokeList: store.smokeLists.selectedSmokeList,
})

const mapDispatchToProps = (dispatch) => ({
    onSetEntriesForSmokeList: (data) => dispatch(setEntriesForSmokeList(data)),
    onSetSelectedStrainsEntries: (data) => dispatch(setSelectedStrainsEntries(data)),
    onDeleteSmokeList: (smokeListId) => deleteSmokeList(smokeListId, dispatch),
    onSetNoteBookDisplay: (payload) => dispatch(setNoteBookDisplay(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteBook)
