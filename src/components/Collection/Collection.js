import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CollectionTable from './CollectionTable'
import StrainPage from './StrainPage'

import { setStrainDisplay } from '../../actions/collectionActions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const Collection = (props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
        <div className={classes.root}>
            <Grid 
                container 
                spacing={3} 
                direction="column"
                justify="space-between"
                alignItems="stretch"
            >
                <Grid item xs={12}>
                    <CollectionTable /> 
                </Grid>
                <Grid item xs={12}>
                    {props.selectedStrain && <StrainPage strain={props.selectedStrain} /> }
                </Grid>
            </Grid>
        </div>
        </Container>
    );
}

const mapStateToProps = (store) => {
    return {
        collection: store.collection.totalCollection,
        selectedStrain: store.collection.selectedStrain,
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSelectStrain: (strain) => setStrainDisplay(strain),
})

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Collection))
