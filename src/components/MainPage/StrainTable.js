import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
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
                {/* <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Strain Data
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
    if(query){
        x = displayed.filter(strain => strain[columnToQuery].includes(query))
    } 
    return x.map((row) => (
        <Row key={row.name} row={row} />
    ))
}

function CollapsibleTable(props) {
    const { strains } = props
    const [ query, setQuery ] = useState('')
    const [ columnToQuery, setColumnToQuery ] = useState('name')
    const [ displayed, setDisplay ] = useState([])

    useEffect(()=> {
        setDisplay(strains)
    })

    return (
        <div>
            <TextField 
                hintText="Query"
                floatingLabelText="Query"
                value={query}
                onChange={e => setQuery(e.target.value)}
                floatingLabelFixed
            />
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
                    {query ? renderStrains(strains, query, columnToQuery, setDisplay) :
                    displayed && displayed.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
  );
}
const mapStateToProps = (store) => {
    return {
        strains: store.strains.allStrains
    }
}
export default connect(mapStateToProps)(CollapsibleTable)