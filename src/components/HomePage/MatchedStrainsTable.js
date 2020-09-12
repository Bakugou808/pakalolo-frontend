import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    closeIcon: {
        cursor: 'pointer',
        right: 'auto'
    }
});


function MatchedStrainsTable(props) {
    const classes = useRowStyles
    const { matchedStrains, handleTableClose } = props

    return (
        <>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleTableClose()}>
            <HighlightOffIcon  />
            </IconButton>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Strain</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Flavors</TableCell>
                            <TableCell align="right">Tags</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matchedStrains.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}



const mapStateToProps = (store) => {
    return {
        user: store.user.data,
        error: store.user.error,
        tags: store.tags.allTags,
        matchedStrains: store.tags.matchingStrains,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MatchedStrainsTable)