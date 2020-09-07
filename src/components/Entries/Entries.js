import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { headers } from '../../actions/entriesActions'
import Modal from 'react-bootstrap/Modal';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { setEntryDisplay, patchEntry, deleteEntry, fetchEntries, closeSnackBarEntryAdded } from '../../actions/entriesActions'
import { fetchCollection } from '../../actions/collectionActions'
import { postSmokeListEntry, deleteSmokeListEntry, setEntriesForSmokeList, fetchSmokeLists, setSmokeListDisplay } from '../../actions/smokeListActions'
import { postStrainToCollection, setStrainDisplay, closeSnackBarAddedToCollection } from '../../actions/collectionActions'

import EntryForm from './EntryForm'

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grow from '@material-ui/core/Grow';
import AddEntryToList from '../Lists/AddEntryToList'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpaIcon from '@material-ui/icons/Spa';





function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'checkbox', numeric: false, disablePadding: false, label: 'Select' },
    { id: 'collapse', numeric: false, disablePadding: false, label: 'Expand' },
    { id: 'strain', numeric: false, disablePadding: false, label: 'Strain' },
    { id: 'vendor', numeric: false, disablePadding: false, label: 'Vendor' },
    { id: 'rating', numeric: true, disablePadding: false, label: 'Rating (0-5)' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Last Modified' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setForm, handleDelete, handleEdit, entriesPage, smokeListPage, onFetchCollection, handleAddEntryToSmokeList, onSetEntriesForSmokeList, onFetchEntries, checkSelectedSmokeList } = props;

    const showForm = () => {
        setForm(true)
        smokeListPage && onFetchCollection(localStorage.userId)
        // onSetEntriesForSmokeList([])
        onFetchEntries(localStorage.userId)
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="span">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="span">
                        {smokeListPage ? 'Smoke List' : 'Entries'}
                    </Typography>
                )}

            {numSelected > 0 ? (
                numSelected > 1 ? (
                    <>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={handleDelete} />
                            </IconButton>
                        </Tooltip>
                        {(!smokeListPage) && <Tooltip title="Add To Smoke List">
                            <IconButton aria-label="addToSmokeList" >
                                <AddIcon onClick={checkSelectedSmokeList} />
                            </IconButton>
                        </Tooltip>}
                    </>
                ) : (
                        <>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon onClick={handleDelete} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit">
                                    <EditIcon onClick={handleEdit} />
                                </IconButton>
                            </Tooltip>
                            {!smokeListPage &&
                                <Tooltip title="Add To Smoke List">
                                    <IconButton aria-label="addToSmokeList">
                                        <AddIcon onClick={checkSelectedSmokeList} />
                                    </IconButton>
                                </Tooltip>}
                        </>
                    )

            ) : (
                    !entriesPage &&
                    <Tooltip title="Add Entry">
                        <IconButton aria-label="add entry"  >
                            <AddIcon onClick={showForm} />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>

    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    container: {
        // margin: '200 px',
        // padding: 60

    }
}));




function EntriesTable(props) {
    const classes = useStyles();
    const { onSetEntry, entriesForStrain, collection, onEditEntry, onDeleteEntry, entriesPage, onFetchEntries, smokeListPage, onFetchCollection, collectionEntries, selectedSmokeList, onPostSmokeListEntry, onSetEntriesForSmokeList, selectedEntriesForSmokeList, onDeleteSmokeListEntry, totalCollection, subEntryTable, allEntries, selectedEntry, snackBarEntrySuccessDisplay, onCloseSnackBar, allSmokeLists, onFetchSmokeLists, onSetSmokeListDisplay } = props
    const [open, setOpen] = React.useState({ 0: false });
    const [form, setForm] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [edit, setEdit] = React.useState(false)
    const [entries, setEntries] = React.useState([])
    const [grow, setGrow] = React.useState(true);
    const [rowCount, setRowCount] = React.useState(0)
    const [selectedStrain, setSelectedStrain] = React.useState('selectedStrain')
    const [selectedEntries, setSelectedEntries] = React.useState([])
    const [SLForm, setSLForm] = React.useState(false)
    const [selectedSL, setSelectedSL] = React.useState(null)

    useEffect(() => {
        const userId = localStorage.userId

        if (entriesPage) {
            onFetchEntries(userId)
        } else if (smokeListPage) {

            onSetEntriesForSmokeList(selectedSmokeList.entries)
            onFetchEntries(userId, smokeListPage)
        }
        setRowCount(handleRowCount())
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = entriesForStrain.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, index, row) => {
        setSelectedStrain(row)
        const selectedIndex = selected.indexOf(index);
        // const data = { entry_id: row.id, smoke_list_id: selectedSmokeList.id }
        // while on collections page, the smokelikst needs to be selected not in state.
        let newSelected = [];
        let newSelectedEntries = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        if (selectedEntries.includes(row)) {
            newSelectedEntries = newSelectedEntries.concat(selectedEntries.slice(0, selectedEntries.indexOf(row)), selectedEntries.slice(selectedEntries.indexOf(row) + 1))
            setSelectedEntries(newSelectedEntries)
        } else {
            setSelectedEntries([...selectedEntries, row])
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const setCollapse = (index) => {

        if (open[index]) {
            open[index] = false
            setOpen((prev) => ({ ...prev }))

        } else {
            open[index] = true
            setOpen((prev) => ({ ...prev }))

        }
    }

    const handleEdit = () => {
        setForm(true)
        setEdit(true)
    }

    const handleDelete = () => {
        console.log('in entry delete')
        if (smokeListPage) {
            selectedEntries.forEach((entry, index) => {
                let data = { smoke_list_id: selectedSmokeList.id, entry_id: entry.id }
                onDeleteSmokeListEntry(data)
            })
        } else {
            selectedEntries.forEach((entry, index) => {
                onDeleteEntry(entry.id)
            })
        }
        setSelected([])
    }

    const isSelected = (index) => selected.indexOf(index) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, entriesForStrain.length - page * rowsPerPage);

    const checkSelectedSmokeList = () => {
        // (selectedSmokeList || selectedSL) ? handleAddEntryToSmokeList() : (onFetchSmokeLists(localStorage.userId) && setSLForm(true))  
        if (selectedSmokeList || selectedSL){
            handleAddEntryToSmokeList()
        } else {
            onFetchSmokeLists(localStorage.userId)
            setSLForm(true)
        }
    }

    const handleScroll = () => {

        document.querySelector('body').style = ''
        document.querySelector('body').classList.remove('modal-open')
    }

    const handleSelectSL = (smokeList) => {
        setSelectedSL(smokeList)
        setSLForm(false)
        handleAddEntryToSmokeList(smokeList)
    }
    

    const handleAddEntryToSmokeList = (SL=null) => {
        
        if (selectedSmokeList) {collectionEntries.forEach((entry, index) => {
            selected.forEach((ind) => {
                if (index === ind) {
                    console.log(entry, 'inhandleentrytosmokelist')
                    let data = { entry_id: entry.id, smoke_list_id: selectedSmokeList.id }
                    onPostSmokeListEntry(data)
                }
            })
        })} else if (SL!=null){
            entriesForStrain.forEach((entry, index) => {
                selected.forEach((ind) => {
                    if (index === ind) {
                        console.log(entry, 'inhandleentrytosmokelist')
                        let data = { entry_id: entry.id, smoke_list_id: SL.id }
                        onPostSmokeListEntry(data, 'entries page')
                    }
                })
            })
        }
        setSelected([])
    }

    const handleRowCount = () => {
        if (entriesPage) {
            return allEntries.length
        } else if (smokeListPage) {
            return selectedEntriesForSmokeList.length
        } else if (subEntryTable) {
            return collectionEntries.length
        } else {
            return entriesForStrain.length
        }
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onCloseSnackBar();
    };

    const renderRows = (array) => {

        return stableSort(array, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <>
                        <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                        >
                            <TableCell padding="checkbox" >
                                <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={(event) => handleClick(event, index, row)}
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setCollapse(index)}>
                                    {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>

                            <TableCell align="left">{row.strain.name}</TableCell>

                            <TableCell align="left">{row.vendor.name}</TableCell>
                            <TableCell align="left">{row.rating}</TableCell>
                            <TableCell align="left">{new Date(row.updated_at).toDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {row.strain.name} by {row.vendor.name} - Review
                    </Typography>
                                        {row.review}
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </>)
            })
    }



    return (

        <div className={classes.root}>
            <Grow in={grow}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar handleAddEntryToSmokeList={handleAddEntryToSmokeList} entriesPage={entriesPage} onFetchCollection={onFetchCollection} smokeListPage={smokeListPage} numSelected={selected.length} handleDelete={handleDelete} handleEdit={handleEdit} setForm={setForm} onSetEntriesForSmokeList={onSetEntriesForSmokeList} onFetchEntries={onFetchEntries} checkSelectedSmokeList={checkSelectedSmokeList}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={handleRowCount()}
                            />
                            <TableBody>
                                {(selectedEntriesForSmokeList.length > 0 && !subEntryTable) ?

                                    renderRows(selectedEntriesForSmokeList)
                                    :
                                    (subEntryTable ?
                                        renderRows(collectionEntries)
                                        :
                                        (entriesPage ? allEntries &&
                                            renderRows(allEntries)
                                            :
                                            entriesForStrain &&
                                            renderRows(entriesForStrain)
                                        )
                                    )
                                }
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={handleRowCount()}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grow>
            {form &&
                <Modal
                    size="lg"
                    show={form}
                    onHide={() => setForm(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    {smokeListPage ?
                        (edit ?
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Edit Entry
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EntryForm setEdit={setEdit} closeForm={setForm} collection={collection} smokeListPage={smokeListPage} entry={selectedStrain} setSelected={setSelected} />
                                </Modal.Body>
                            </>
                            :
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Add Entry To Smoke List
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddEntryToList />
                                </Modal.Body>
                            </>)
                        :

                        (edit ?
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Edit Entry
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EntryForm setEdit={setEdit} closeForm={setForm} collection={collection} subEntryTable={subEntryTable} entry={selectedStrain} setSelected={setSelected} />
                                </Modal.Body>
                            </>
                            :
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        New Entry
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EntryForm setEdit={setEdit} closeForm={setForm} setSelected={setSelected} collection={collection} />
                                </Modal.Body>
                            </>)
                    }
                </Modal>
            }
            {subEntryTable && <Snackbar open={snackBarEntrySuccessDisplay} autoHideDuration={6000} onClose={handleCloseSB}>
                <Alert onClose={handleCloseSB} severity="success">
                    Your Entry was successfully added!
                </Alert>
            </Snackbar>}

            {SLForm &&
                <Modal
                    size="lg"
                    show={SLForm}
                    onHide={() => setSLForm(false)}
                    aria-labelledby="example-modal-sizes-title-lg"

                >
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Select SmokeList
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Paper className={classes.paper}>
                                <List>
                                    {allSmokeLists.map((smokeList, index) => (
                                        <ListItem button key={smokeList.id} onClick={()=>handleSelectSL(smokeList)}>
                                            <ListItemIcon><SpaIcon /></ListItemIcon>
                                            <ListItemText primary={smokeList.title} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Modal.Body>
                    </>
                </Modal>
            }
        </div >
    );
}


const mapStateToProps = (store) => ({
    selectedEntry: store.entries.selectedEntry,
    entriesForStrain: store.entries.selectedStrainsEntries,
    allEntries: store.entries.allEntries,
    selectedSmokeList: store.smokeLists.selectedSmokeList,
    selectedEntriesForSmokeList: store.smokeLists.selectedEntriesForSmokeList,
    totalCollection: store.collection.totalCollection,
    snackBarEntrySuccessDisplay: store.entries.snackBarSuccessDisplay,
    allSmokeLists: store.smokeLists.allSmokeLists,

})

const mapDispatchToProps = (dispatch) => ({
    onSetEntry: (entry) => dispatch(setEntryDisplay(entry)),
    onEditEntry: (entryData, entryId) => patchEntry(entryData, entryId, dispatch),
    onDeleteEntry: (entryId) => deleteEntry(entryId, dispatch),
    onFetchEntries: (userId, smokeListPage = false) => fetchEntries(userId, dispatch, smokeListPage),
    onFetchCollection: (userId) => fetchCollection(userId, dispatch),
    onPostSmokeListEntry: (data, page) => postSmokeListEntry(data, dispatch, page),
    onDeleteSmokeListEntry: (data) => deleteSmokeListEntry(data, dispatch),
    onSetEntriesForSmokeList: (entries) => dispatch(setEntriesForSmokeList(entries)),
    onCloseSnackBar: () => dispatch(closeSnackBarEntryAdded()),
    onFetchSmokeLists: (userId) => fetchSmokeLists(userId, dispatch),
    // onSetSmokeListDisplay: (smokeList) => dispatch(setSmokeListDisplay(smokeList)),
})


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(EntriesTable))