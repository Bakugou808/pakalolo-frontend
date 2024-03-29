import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { fetchComments } from "../../Redux/actions/commentActions";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { connect } from "react-redux";
import StrainCard from "../StrainCard";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import { setStrainDisplay } from "../../Redux/actions/collectionActions";
import { setSelectedStrainsEntries } from "../../Redux/actions/entriesActions";
// * action Imports
import {
  endTour,
  activateTour,
  deactivateTour,
} from "../../Redux/actions/tourActions";

// add pagination within the menu to only display the first 20-30 strains

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
      cursor: "pointer",
    },
  },
  row: {
    margin: "2 in",
    width: "100%",
    textAlign: "center",
  },
  block: {
    // width: '100%',
    display: "inline",
    margin: "2 in",
  },
  divRoot: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function Row(props) {
  const {
    row,
    onSetStrain,
    setShowTable,
    onSetSelectedStrainsEntries,
    onFetchComments,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const handleClick = (row) => {
    onSetStrain(row.strain);
    onSetSelectedStrainsEntries(row.entries);
    onFetchComments(row.strain.id, "Strain");
    setShowTable(false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => handleClick(row)}>
        <TableCell component="th" scope="row.strain">
          {row.strain.name}
        </TableCell>
        <TableCell align="right">{row.strain.genus.toUpperCase()}</TableCell>
        <TableCell align="right">{row.strain.flavorList}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollectionTable(props) {
  const {
    collection,
    onSetStrain,
    onSetSelectedStrainsEntries,
    onFetchComments,
    tourOn,
    onEndTour,
    onActivateTour,
    onDeactivateTour,
  } = props;
  const [query, setQuery] = useState("");
  const [columnToQuery, setColumnToQuery] = useState("name");
  const [showTable, setShowTable] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  // *tour state
  const [takeTour, setTakeTour] = useState(true);

  const [displayed, setDisplay] = useState([]);
  const classes = useRowStyles();

  const GreenSwitch = withStyles({
    switchBase: {
      color: green[300],
      "&$checked": {
        color: green[500],
      },
      "&$checked + $track": {
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
    setShowTable(true);
    setQuery(e.target.value);
  };

  const renderStrains = () => {
    let x;
    if (query) {
      x = displayed.filter((object) =>
        object.strain[columnToQuery].toLowerCase().includes(query.toLowerCase())
      );
    } else {
      x = displayed;
    }

    return x
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <Row
          key={row.id}
          row={row}
          onSetStrain={onSetStrain}
          onFetchComments={onFetchComments}
          onSetSelectedStrainsEntries={onSetSelectedStrainsEntries}
          setShowTable={setShowTable}
        />
      ));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setDisplay(collection);
  }, [collection]);

  const redirect = (path) => {
    props.history.push(`/${path}`);
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={12}>
          <div tourId="c1" className={classes.block}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={columnToQuery}
              onChange={(event, index, value) =>
                setColumnToQuery(event.target.value)
              }
              // className={classes.block}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="genus">Type</MenuItem>
              <MenuItem value="flavorList">Flavor</MenuItem>
            </Select>
            <TextField
              value={query}
              onChange={handleSearch}
              floatinglabelfixed="true"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <GreenSwitch
                    checked={showTable}
                    onChange={handleChange}
                    name="table"
                  />
                }
                label="Hide/Show Table"
              />
            </FormGroup>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.table}>
            {showTable && (
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
                      <TableCell align="left">Strain</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Flavors</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayed && renderStrains()}</TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (store) => ({
  collection: store.collection.totalCollection,
  tourOn: store.tour.collection1,
});

const mapDispatchToProps = (dispatch) => ({
  onSetStrain: (strain) => dispatch(setStrainDisplay(strain)),
  onSetSelectedStrainsEntries: (entries) =>
    dispatch(setSelectedStrainsEntries(entries)),
  onFetchComments: (strainId, type) => fetchComments(strainId, type, dispatch),
  onEndTour: () => dispatch(endTour()),
  onActivateTour: (tourId) => dispatch(activateTour(tourId)),
  onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionTable);

const accentColor = "#ff5722";

const HOME_STEPS = [
  {
    selector: '[stepId = "h1"]',
    content: () => (
      <div>
        This sections holds your tags. As you add strains to your Collection,
        you can add tags. Once they're added they will appear in this section.
        Click on the tag and it will open a table with all the matching strains.
      </div>
    ),
    position: "right",
  },
  {
    selector: '[stepId = "h2"]',
    content: () => (
      <div>
        This section has some useful articles to get you familiar with some of
        the different aspects of cannabis.
      </div>
    ),
    position: "right",
  },
];
