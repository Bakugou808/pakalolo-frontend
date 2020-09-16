import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { fetchAllTags, fetchAllStrainsWithTag } from '../../actions/tagActions'
import Chip from '@material-ui/core/Chip';
import EcoIcon from '@material-ui/icons/Eco';
import MatchedStrainsTable from './MatchedStrainsTable'
import CarouselComponent from './CarouselComponent'
import MapContainer from '../googleMaps/MapContainer'
import MapAutoComplete from '../googleMaps/MapAutoComplete'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto'
  },
}));


function HomePage(props) {
  const { onFetchTags, tags, onFetchAllStrainsWithTag, matchedStrains, isGeolocationAvailable, isGeolocationEnabled, coords } = props
  const classes = useStyles();
  const [showTable, setShowTable] = React.useState(false)

  // google maps api things
  const [location, setLocation] = React.useState(null)
  // default set to NYC
  const [defaultLocation, setDefaultLocation] = React.useState({ lat: 40.7128, lng: -74.0060 })


  useEffect(() => {
    onFetchTags(localStorage.userId)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
      console.log(position, 'setting location');
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    }
  }, [])

  const renderTags = () => {
    return tags.map(tagTitle => {
      return (<>
        <Chip
          icon={<EcoIcon />}
          label={tagTitle}
          clickable
          color="primary"
          onClick={() => handleTagClick(tagTitle)}
          variant="outlined"
        />
      </>)
    })
  }

  const handleTableOpen = () => {
    setShowTable(true)
  }

  const handleTableClose = () => {
    setShowTable(false)
  }


  const handleTagClick = (title) => {
    onFetchAllStrainsWithTag(title, localStorage.userId)
    handleTableOpen()
  }

  return (
    <Container maxWidth='lg' >
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{props.user && `Welcome to Pakalolo ${props.user.username}!`}  What are we smoking today?</Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              <div>Tags</div>
              {tags && renderTags()}</Paper>
          </Grid>
          {showTable && <Grid item xs={12} >
            <Paper className={classes.paper}>
              {(matchedStrains && showTable) && <MatchedStrainsTable handleTableClose={handleTableClose} collection={matchedStrains} />}
            </Paper>
          </Grid>}
          <Grid item xs={12} >
            <Paper className={classes.paper} >
              <div>
                <div>Articles</div>
                <CarouselComponent />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}> <div>Store Locator </div>{location && <MapContainer location={location} defaultLocation={defaultLocation} />}</Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}>


            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </div >
    </Container>
  );
}

{/* <div>
{ props.user && `Welcome to Pakalolo ${props.user.username}!`}
<br>
</br>
add top strains, click to see by tag. add recent smoke lists. add favorite vendors. add a suggestion. add articles. 
</div> */}

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
    onFetchTags: (userId) => fetchAllTags(userId, dispatch),
    onFetchAllStrainsWithTag: (tagTitle, userId) => fetchAllStrainsWithTag(tagTitle, dispatch, userId),

    // the above is for api/async calls 
    // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
  }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(HomePage))