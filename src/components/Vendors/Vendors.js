import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import VendorsTable from './VendorsTable'
import MaterialTableDemo from './MaterialTableDemo'

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



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
    
}));

export const Vendors = (props) => {
    const classes = useStyles()
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
                            <VendorsTable history={props.history} />
                            {/* <MaterialTableDemo /> */}
                        </Grid>
                        {/* <Grid item xs={12}>
                            {props.selectedStrain && <StrainPage strain={props.selectedStrain} />}
                        </Grid> */}
                    </Grid>
                </div>
            </Container>

        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Vendors))
