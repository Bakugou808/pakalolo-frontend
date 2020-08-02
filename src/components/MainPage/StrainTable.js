import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { connect } from "react-redux";
import StrainCard from '../StrainCard'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

// add pagination within the menu to only display the first 20-30 strains

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
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
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.genus.toUpperCase()}</TableCell>
                <TableCell align="right">{row.flavorList}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                {`${row.name}: Strain Details`}
                            </Typography>
                            <StrainCard strain={row} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const renderStrains = (displayed, query, columnToQuery, setDisplay) => {
    let x
    if (query) {
        x = displayed.filter(strain => strain[columnToQuery].toLowerCase().includes(query.toLowerCase()))
    }

    return x.map((row) => (
        <Row key={row.name} row={row} />
    ))
}

function CollapsibleTable(props) {
    const { strains } = props
    const [query, setQuery] = useState('')
    const [columnToQuery, setColumnToQuery] = useState('name')
    const [showTable, setShowTable] = useState(false)

    const [displayed, setDisplay] = useState([])
    const classes = useRowStyles();

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

    useEffect(() => {
        setDisplay(strains)
    })

    return (
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
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={columnToQuery}
                            onChange={(event, index, value) => setColumnToQuery(event.target.value)}
                        >
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="genus">Type</MenuItem>
                            <MenuItem value="flavorList">Flavor</MenuItem>

                        </Select>
                        <TextField
                            hintText="Query"
                            floatingLabelText="Query"
                            value={query}
                            onChange={handleSearch}
                            floatingLabelFixed
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<GreenSwitch checked={showTable} onChange={handleChange} name="table" />}
                                label="Hide/Show Table"
                            />
                        </FormGroup>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.table}>
                        {showTable &&
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Strain</TableCell>
                                            <TableCell align="right">Type</TableCell>
                                            <TableCell align="right">Flavors</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {query ? renderStrains(strains, query, columnToQuery, setDisplay, setShowTable) :
                                            displayed && displayed.map((row) => (
                                                <Row key={row.name} row={row} />
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                </Grid>

            </Grid>

        </div>
    );
}
const mapStateToProps = (store) => {
    return {
        strains: store.strains.allStrains
    }
}
export default connect(mapStateToProps)(CollapsibleTable)