import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TagComponent from "../Collection/TagComponent";

import Entries from "../Entries/Entries";
import ChemChart from "../ChemChart";
import Grid from "@material-ui/core/Grid";

// for Rows
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// for Tabs
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { strain, collection } = props;
  const [tags, setTags] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [newTag, setNewTag] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleForm = () => {
    handleClose();
    setNewTag(true);
    handleScroll();
  };

  const handleClose = () => {
    setTitle("");
    setAnchorEl(null);
  };

  const handleScroll = () => {
    document.querySelector("body").style = "";
    document.querySelector("body").classList.remove("modal-open");
  };

  const renderStrainTags = () => {
    return collection.tags.map((tag, index) => {
      return (
        <TagComponent
          key={index}
          tag={tag}
          handleForm={handleClose}
          setTags={setTags}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Cannabinoid Profile" {...a11yProps(1)} />
          <Tab label="Terpene Profile" {...a11yProps(2)} />
          <Tab label="Entries" {...a11yProps(3)} />
          {/* <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          {strain && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {`${strain.name}: Strain Details`}
                  {/* <Chip label={`${totalLikes} Likes`} clickable onClick={liked ? handleUnlike : handleLike} />
                                    <Tooltip title="Menu" aria-label="Menu" interactive >
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                                            <MoreVertIcon style={{ display: 'align-right' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleForm} >Add Tag</MenuItem>
                                    </Menu> */}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>{strain.description}</Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  Flavors: {strain.flavorList}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  Positive: {strain.effects.positive.join(", ")}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  Negative: {strain.effects.negative.join(", ")}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  Medical/Treats: {strain.effects.medical.join(", ")}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  Tags:{" "}
                  {collection.tags ? (
                    <div className="tags">{renderStrainTags()} </div>
                  ) : (
                    "No Tags"
                  )}
                </Paper>
              </Grid>
              {/* <Grid item xs={12} >
                                <Paper className={classes.paper2} onClick={() => setComments(!comments)}>

                                    {comments ? 'Hide Comments' : "View Comments"}

                                </Paper>
                                {comments &&

                                    <CommentComponent type='Strain' commentable_id={strain.id} />

                                }
                            </Grid> */}
            </Grid>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper className={classes.paper}>
          <ChemChart data={strain.cannabinoidList} cannabinoids={true} />
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper className={classes.paper}>
          <ChemChart data={strain.terpeneList} cannabinoids={false} />
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Entries tagEntries={collection.entries} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const renderTags = () => {
    let tags = row.tags.map((tag) => tag.title);

    tags = tags.slice(0, 2).join(" - ");
    return tags;
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.strain.name}
        </TableCell>
        <TableCell align="right">{row.strain.genus}</TableCell>
        <TableCell align="right">{row.strain.flavorList}</TableCell>
        <TableCell align="right">{renderTags()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Strain Details
              </Typography>
              <ScrollableTabsButtonAuto collection={row} strain={row.strain} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
