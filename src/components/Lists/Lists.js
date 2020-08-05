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

import { useRef } from "react";
import useDimensions from "./use-dimensions";
import MenuToggle from "./MenuToggle";
import ListItems from "./ListItems";


import Notebook from './NoteBook'
import SideBar from './SideBar'

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
}));

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const Lists = () => {
    const classes = useStyles();
    const [openList, setOpenList] = React.useState(false);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
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
                    onClick={() => console.log('got clicked')}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                >

                    <Tooltip title="View Lists" aria-label="view lists" interactive>
                        <Fab color="primary" className={classes.fab}>
                            <ListAltIcon />
                        </Fab>
                    </Tooltip>
                    <motion.div className="background" variants={sidebar} />
                    <ListItems />
                    {/* <MenuToggle toggle={() => toggleOpen()} /> */}
                </motion.div>
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
                    >   <Grid></Grid>
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

