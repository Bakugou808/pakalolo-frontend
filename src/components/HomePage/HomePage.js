import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { AuthHOC } from '../HOCs/AuthHOC'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { fetchAllTags, fetchAllStrainsWithTag } from '../../actions/tagActions'
import Chip from '@material-ui/core/Chip';
import EcoIcon from '@material-ui/icons/Eco';
import StrainTable from '../MainPage/StrainTable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function HomePage(props) {
  const { onFetchTags, tags, onFetchAllStrainsWithTag, matchedStrains } = props 
  const classes = useStyles();

  useEffect(()=> {
    onFetchTags(localStorage.userId)
  }, [])

  const renderTags = ()=> {
    return tags.map(tagTitle => {
      return (<>
        <Chip
        icon={<EcoIcon />}
        label={tagTitle}
        clickable
        color="primary"
        onClick={()=>handleTagClick(tagTitle)}
        variant="outlined"
      />
      </>)
    })
  }

  const handleTagClick = (title)=> {
    
    onFetchAllStrainsWithTag(title, localStorage.userId)
  }

  return (
    <Container maxWidth='lg' >
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{props.user && `Welcome to Pakalolo ${props.user.username}!`}  What are we smoking today?</Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}> {tags && renderTags()}</Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}>
          {matchedStrains && <StrainTable collection={matchedStrains}/>}
        </Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}></Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}></Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}></Paper>
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