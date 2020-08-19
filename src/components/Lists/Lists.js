import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { motion, useCycle } from "framer-motion"
import ListAltIcon from '@material-ui/icons/ListAlt';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';


import ListItems from './ListItems'
import Notebook from './NoteBook'
// import SideBar from './SideBar'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpaIcon from '@material-ui/icons/Spa';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    leftDiv: {
        float: 'left',
        width: '180px',
    },
    innerDiv: {
        position: 'fixed',
        top: '400px',
        left: '15px'
    },
    fab: {
        margin: theme.spacing(2),
    },
    list: {
        width: '250',
    },
    fullList: {
        width: 'auto',
    },
}));



export const Lists = (props) => {
    const classes = useStyles();
    const [openList, setOpenList] = React.useState(false);
    const [showForm, setShowForm] = React.useState(false);

    const [drawer, setDrawer] = React.useState({
        left: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawer({ ...drawer, [anchor]: open });
    };
    const redirect = (path) => {
        console.log(path)
        props.history.push(`/${path}`)
    }


    const strainLists = (anchor) => (
        
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                <ListItem button key={'add-list'}>
                    <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
                    <ListItemText primary={'Add Strain List'} onClick={()=>showForm(true)}/>
                </ListItem>
            </List>
            <Divider />
            <List>
                {[['Search', <SpaIcon />, ''], ['Home', <SpaIcon />, 'home'], ['Collection', <SpaIcon />, 'collection'], ['Strain Lists', <SpaIcon />, 'lists'], ['Entries', <SpaIcon />, 'entries'], ['Vendors', <SpaIcon />, 'vendors']].map((arr, index) => (
                    <ListItem button key={index} onClick={() => redirect(arr[2])}>
                        <ListItemIcon>{arr[1]}</ListItemIcon>
                        <ListItemText primary={arr[0]} />
                    </ListItem>
                ))}
            </List>
        </div>
    )


    return (
        <>
            <div className={classes.leftDiv}>
                <motion.div
                    className={classes.innerDiv}
                    whileHover={{
                        scale: [1, 2, 2, 2, 2],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                    }}
                    onClick={toggleDrawer('left', true)}
                    onKeyDown={toggleDrawer('left', true)}
                >

                    <Tooltip title="View Lists" aria-label="view lists" interactive>
                        <Fab color="primary" className={classes.fab}>
                            <ListAltIcon />
                        </Fab>
                    </Tooltip>
                </motion.div>
                <Drawer anchor={'left'} open={drawer['left']} onClose={toggleDrawer('left', false)}>
                    {strainLists('left')}
                </Drawer>
            </div>
            <Container maxWidth="md">
                <div className={classes.root}>
                    {/* <Grid container spacing={1} direction="row" justify="center" alignItems="center" >
                    <Grid item xs>
                        Side menu/list
                    </Grid> */}
                    {/* <Grid item xs={10} > */}
                    <Grid
                        container
                        spacing={3}
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                    >   
                        <Grid></Grid>
                        <Grid>
                            {/* <SideBar /> */}
                        </Grid>
                        <Grid item xs={12}>
                            Animation carousel?
                            </Grid>
                        <Grid item xs={12}>
                            <Notebook />
                        </Grid>
                        <Grid>

                        </Grid>
                    </Grid>
                    {/* </Grid> */}
                    {/* </Grid> */}
                </div>
            </Container>
        </>
    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Lists))

