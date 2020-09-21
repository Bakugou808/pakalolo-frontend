import React, { Component, useState, useEffect } from 'react'
import { fetchCollection } from '../../actions/collectionActions'

import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CollectionTable from './CollectionTable'
import StrainPage from './StrainPage'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    root2: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const Collection = (props) => {
    const {onFetchCollection} = props
    const classes = useStyles();

    useEffect(() => {
        // onFetchCollection(localStorage.userId)   
    })

    return (
        <>
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
                            <CollectionTable history={props.history} />
                        </Grid>
                        <Grid item xs={12}>
                            {props.selectedStrain && <StrainPage strain={props.selectedStrain} page='collection'/>}
                        </Grid>
                    </Grid>
                </div>
            </Container>
                
        </>
    );
}

const mapStateToProps = (store) => {
    return {
        collection: store.collection.totalCollection,
        selectedStrain: store.collection.selectedStrain, 
        

    }
}

const mapDispatchToProps = (dispatch) => ({
    onFetchCollection: (userId) => fetchCollection(userId, dispatch)
})

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Collection))
