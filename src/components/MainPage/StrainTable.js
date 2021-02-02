import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
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
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Entries from "../Entries/Entries";
import {
  postStrainToCollection,
  setStrainDisplay,
  closeSnackBarAddedToCollection,
} from "../../Redux/actions/collectionActions";
import { setSelectedStrainsEntries } from "../../Redux/actions/entriesActions";
import { truncateSync } from "fs";

// add pagination within the menu to only display the first 20-30 strains

function Row(props) {
  const {
    row,
    addStrain,
    onPostStrainToCollection,
    user,
    auth,
    collection,
    onSetSelectedStrainsEntries,
    subEntryTable,
    setAddedStrain,
    setChangeClass,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const options = ["Add to Collection", "Add to Strain List"];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpen(!open);
    // setChangeClass(true);
    // console.log("clicked open");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddStrainToCollection = () => {
    setAddedStrain(row);
    handleClose();
    let data = { strain_id: row.id, user_id: parseInt(localStorage.userId) };
    onPostStrainToCollection(data);
  };

  const handleAddStrainToStrainList = () => {
    handleClose();
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {collection ? row.strain.name : row.name}
        </TableCell>
        <TableCell align="right">
          {collection
            ? row.strain.genus.toUpperCase()
            : row.genus.toUpperCase()}
        </TableCell>
        <TableCell className={classes.flavorList} align="right">
          {collection ? row.strain.flavorList : row.flavorList}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="entryTableCont">
              <Typography variant="h6" gutterBottom component="span">
                <div>
                  {collection ? (
                    <div className="entryTitle">{row.strain.name}: Entries</div>
                  ) : (
                    <div className="entryTitle">{row.name}: Strain Details</div>
                  )}

                  {user && auth && !subEntryTable && (
                    <>
                      <Tooltip title="Add" aria-label="Add" interactive>
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon style={{ display: "align-right" }} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleAddStrainToCollection}>
                          Add To Collection
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </div>
              </Typography>
              {collection ? (
                <Entries
                  collectionEntries={row.entries}
                  collection={row}
                  subEntryTable={subEntryTable}
                />
              ) : (
                <StrainCard strain={row} />
              )}
              {/* <StrainCard strain={row} /> */}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable(props) {
  const {
    strains,
    onPostStrainToCollection,
    user,
    auth,
    onCloseSnackBarAddedToCollection,
    snackBarCollSuccessDisplay,
    selectedStrain,
    collection,
    onSetSelectedStrainsEntries,
    subEntryTable,
  } = props;
  const [query, setQuery] = useState("");
  const [columnToQuery, setColumnToQuery] = useState("name");
  const [showTable, setShowTable] = useState(true);
  const [addedStrain, setAddedStrain] = useState("");
  const [displayed, setDisplay] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [changeClass, setChangeClass] = useState(false);

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

  const renderStrains = () => {
    let x;
    if (query) {
      subEntryTable
        ? (x = displayed.filter((collection) =>
            collection.strain[columnToQuery]
              .toLowerCase()
              .includes(query.toLowerCase())
          ))
        : (x = displayed.filter((strain) =>
            strain[columnToQuery].toLowerCase().includes(query.toLowerCase())
          ));
    } else {
      x = displayed;
    }

    return x
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <Row
          key={row.name}
          row={row}
          setShowTable={setShowTable}
          setAddedStrain={setAddedStrain}
          collection={collection}
          onSetSelectedStrainsEntries={onSetSelectedStrainsEntries}
          onPostStrainToCollection={onPostStrainToCollection}
          user={user}
          auth={auth}
          subEntryTable={subEntryTable}
          setChangeClass={setChangeClass}
        />
      ));
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (event) => {
    setShowTable(!showTable);
  };

  const handleSearch = (e) => {
    setShowTable(true);
    setQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onCloseSnackBarAddedToCollection();
  };

  useEffect(() => {
    collection ? setDisplay(collection) : setDisplay(strains);
  }, [collection, strains]);

  return (
    <div className="homeContainer">
      <Grid
        className={classes.grid2}
        container
        spacing={3}
        direction="column"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
          <div className={classes.search}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={columnToQuery}
              onChange={(event, index, value) =>
                setColumnToQuery(event.target.value)
              }
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="genus">Type</MenuItem>
              <MenuItem value="flavorList">Flavor</MenuItem>
            </Select>
            <TextField
              // hintText="Query"
              // floatingLabelText="Query"
              value={query}
              onChange={handleSearch}
              floatingLabelFixed
            />
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
                      <TableCell />
                      <TableCell>Strain</TableCell>
                      <TableCell className={classes.typeCol} align="right">
                        Type
                      </TableCell>
                      <TableCell className={classes.flavorCol} align="right">
                        Flavors
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{displayed && renderStrains()}</TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={snackBarCollSuccessDisplay}
        autoHideDuration={6000}
        setAddedStrain={setAddedStrain}
        onClose={handleCloseSB}
      >
        <Alert onClose={handleCloseSB} severity="success">
          {addedStrain.name} was successfully added to your Collection
        </Alert>
      </Snackbar>
    </div>
  );
}
const mapStateToProps = (store) => {
  return {
    strains: store.strains.allStrains,
    user: store.user.data,
    auth: store.authorized.data,
    snackBarCollSuccessDisplay: store.collection.snackBarSuccessDisplay,
    selectedStrain: store.collection.selectedStrain,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostStrainToCollection: (data) => postStrainToCollection(data, dispatch),
  onCloseSnackBarAddedToCollection: () =>
    dispatch(closeSnackBarAddedToCollection()),
  onSetSelectedStrainsEntries: (entries) => dispatch(setSelectedStrainsEntries),
});
export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  search: {
    margin: "2 in",
    display: "inline",
  },
  divRoot: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(2),
    // width: '15px',
    // height: '15px'
  },
  grid1: {
    width: "100%",
  },
  grid2: {
    width: "inherit",
  },
  flavorList: {
    paddingRight: "30px",
  },
  flavorCol: {
    paddingRight: "75px",
  },
  typeCol: {
    paddingRight: "34px",
  },
}));
