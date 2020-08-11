import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import StrainCard from '../StrainCard'
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
// import Container from '@material-ui/core/Container'


import { setEntryDisplay } from '../../actions/entriesActions'


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            cursor: 'pointer'
        },
    },
    search: {
        margin: '2 in',
        display: 'inline'
    },
    divRoot: {
        flexGrow: 1
    }
});




function Row(props) {
    const { row, onSetEntry, setShowTable } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const handleClick = (row) => {
        // onSetEntry(row)
        // setShowTable(false)
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root} onClick={() => handleClick(row)}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell aling="left" component="th" scope="row">
                    {row.vendor.name}
                </TableCell>
                <TableCell align="left">{row.rating}/5</TableCell>
                <TableCell align="left">{new Date(row.created_at).toDateString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Review
                            </Typography>
                            {row.review}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export const EntriesTable = (props) => {
    const { onSetEntry, entriesForStrain } = props
    const [query, setQuery] = useState('')
    const [columnToQuery, setColumnToQuery] = useState('name')
    const [showTable, setShowTable] = useState(true)
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const [displayed, setDisplay] = useState([])
    const classes = useRowStyles();

    useEffect(() => {
        setDisplay(entriesForStrain)
    })

    const GreenSwitch = withStyles({
        switchBase: {
            color: green[300],
            '&$checked': {
                color: green[500],
            },
            '&$checked + $track': {
                backgroundColor: green[500],
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const handleChange = (event) => {
        setShowTable(!showTable);
    };

    const handleSearch = (e) => {
        setShowTable(true)
        setQuery(e.target.value)
    }

    const renderEntries = () => {
        let x
        if (query) {
            x = displayed.filter(strain => strain[columnToQuery].toLowerCase().includes(query.toLowerCase()))
        } else {
            x = displayed
        }

        return x.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <Row key={row.name} row={row} onSetEntry={onSetEntry} setShowTable={setShowTable} />
        ))
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        // <Container maxWidth="md">
        <div>
            <Grid
                container
                spacing={3}
                direction="column"
                justify="space-between"
                alignItems="stretch"
            >
                <Grid item xs={6} sm={3}>

                </Grid>
                <Grid item xs={12}>
                    <div className={classes.search}>


                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.table}>
                        {showTable &&
                            <TableContainer component={Paper}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={displayed.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell /> */}
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left">Vendor</TableCell>
                                            <TableCell align="left">Rating</TableCell>
                                            <TableCell align="left">Created</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {displayed && renderEntries()}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                </Grid>

            </Grid>
        </div>
        // </Container>


    );
}
const mapStateToProps = (store) => ({
    selectedEntry: store.entries.selectedEntry,
    entriesForStrain: store.entries.selectedStrainsEntries
})

const mapDispatchToProps = (dispatch) => ({
    onSetEntry: (entry) => dispatch(setEntryDisplay(entry)),
})


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(EntriesTable))
