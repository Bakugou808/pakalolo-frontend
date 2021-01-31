import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHOC } from "../HOCs/AuthHOC";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  fetchAllTags,
  fetchAllStrainsWithTag,
} from "../../Redux/actions/tagActions";
import { Button, Chip } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import MatchedStrainsTable from "./MatchedStrainsTable";
import CarouselComponent from "./CarouselComponent";
import MapContainer from "../googleMaps/MapContainer";
import MapAutoComplete from "../googleMaps/MapAutoComplete";
import MapContainerWPlaces from "../googleMaps/MapContainerWPlaces";
// * ReactTour Imports
import Tour from "reactour";
// * action Imports
import {
  endTour,
  activateTour,
  deactivateTour,
} from "../../Redux/actions/tourActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",
    marginBottom: "70px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "auto",
  },
}));

function HomePage(props) {
  const {
    onFetchTags,
    tags,
    onFetchAllStrainsWithTag,
    matchedStrains,
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    tagError,
    tourOn,
    onEndTour,
    onActivateTour,
    onDeactivateTour,
  } = props;

  const classes = useStyles();
  const [showTable, setShowTable] = React.useState(false);
  // *tour state
  const [takeTour, setTakeTour] = useState(true);

  // google maps api things
  const [location, setLocation] = React.useState(null);
  // default set to NYC
  const [defaultLocation, setDefaultLocation] = React.useState({
    lat: 40.7128,
    lng: -74.006,
  });

  useEffect(() => {
    onFetchTags(localStorage.userId);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  }, []);

  const renderTags = () => {
    return tags.map((tagTitle) => {
      return (
        <>
          <Chip
            icon={<EcoIcon />}
            label={tagTitle}
            clickable
            color="primary"
            onClick={() => handleTagClick(tagTitle)}
            variant="outlined"
          />
        </>
      );
    });
  };

  const handleTableOpen = () => {
    setShowTable(true);
  };

  const handleTableClose = () => {
    setShowTable(false);
  };

  const handleTagClick = (title) => {
    onFetchAllStrainsWithTag(title, localStorage.userId);
    handleTableOpen();
  };

  const openTour = () => {
    onActivateTour("home1");
  };

  return (
    <Container maxWidth="lg">
      {takeTour && (
        <div className="tourNotification">
          <div>Take a Tour?</div>
          <Button onClick={openTour}>Yes</Button>
          <Button onClick={() => setTakeTour(false)}>No Thanks</Button>
        </div>
      )}
      <Tour
        onRequestClose={() => onEndTour()}
        steps={HOME_STEPS}
        isOpen={tourOn}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {props.user && `Welcome to Paka-lolo ${props.user.username}!`}{" "}
              What are we smoking today?
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper stepID="h1" className={classes.paper}>
              <div className="tagTitle">Tags</div>
              {tags ? renderTags() : tagError}
            </Paper>
          </Grid>
          {showTable && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {matchedStrains && showTable && (
                  <MatchedStrainsTable
                    handleTableClose={handleTableClose}
                    collection={matchedStrains}
                  />
                )}
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div stepID="h2">
                <div className="tagTitle">Articles</div>
                <CarouselComponent />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/* <div>Store Locator </div> */}
              <div id="map">
                {location && (
                  <MapContainerWPlaces
                    location={location}
                    defaultLocation={defaultLocation}
                  />
                )}
              </div>
            </Paper>
          </Grid>
          {/* <Grid item xs={12} >
            <Paper className={classes.paper}>


            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}></Paper>
          </Grid> */}
        </Grid>
      </div>
    </Container>
  );
}

{
  /* <div>
{ props.user && `Welcome to Pakalolo ${props.user.username}!`}
<br>
</br>
add top strains, click to see by tag. add recent smoke lists. add favorite vendors. add a suggestion. add articles. 
</div> */
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
    error: store.user.error,
    tags: store.tags.allTags,
    tagError: store.tags.error,
    matchedStrains: store.tags.matchingStrains,
    tourOn: store.tour.home1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTags: (userId) => fetchAllTags(userId, dispatch),
    onFetchAllStrainsWithTag: (tagTitle, userId) =>
      fetchAllStrainsWithTag(tagTitle, dispatch, userId),
    onEndTour: () => dispatch(endTour()),
    onActivateTour: (tourId) => dispatch(activateTour(tourId)),
    onDeactivateTour: (tourId) => dispatch(deactivateTour(tourId)),
    // the above is for api/async calls
    // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
  };
};

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(HomePage));

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
