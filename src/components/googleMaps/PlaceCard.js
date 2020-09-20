import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { ReviewsComponent } from './ReviewsComponent';
import Link from '@material-ui/core/Link';
import PhotosComponent from './PhotosComponent'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 'auto',
  },
  reviews:{
    display: 'block',
    'margin-left':'auto',
    'margin-right': 'auto',
  },
  image: {
    width: 328,
    height: 328,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

// TODO: info is bad naming.
const PlaceCard = (({ storeInfo, key }) => {
  const classes = useStyles()
  const { address, distanceText, name, openNow, rating, timeText, photos, reviews, business_status, formatted_phone_number, user_ratings_total, website, googleUrl, weekday_hours } = storeInfo;

  const handleRedirect = (url) => {
    console.log(url)
    window.open(url)
  }


  return (
    <div key={key} className={classes.root}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={5} >
            <Grid item>
              <div className={classes.image}>
                <img className={classes.img} alt="complex" src={photos[0].getUrl()} />
              </div>
              {/* <PhotosComponent photos={photos} /> */}
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  {/* <Typography gutterBottom variant="h4">
                    {name}
                  </Typography> */}
                  <Typography variant="body2" gutterBottom>
                    <div>
                      <ul><h3>{name}</h3></ul>
                      <ul>{address}</ul>
                      <ul>{formatted_phone_number}</ul>
                      <ul>
                        <Typography className={classes.link}>
                          <Link href='#' onClick={() => handleRedirect(website)} variant="body2"  color='inherit'>
                            Visit Store Website
                          </Link>
                        </Typography>
                        {/* <div onClick={() => handleRedirect(website)}>Visit Store Website</div> */}
                      </ul>
                      <ul>Distance: {distanceText} Travel Time: {timeText}</ul>
                      <ul>{openNow ? 'Open Now' : 'Closed'}</ul>
                      <ul>
                        {/* <div onClick={() => handleRedirect(googleUrl)}>Get Directions</div> */}
                        <Typography className={classes.link}>
                          <Link href='#' onClick={() => handleRedirect(googleUrl)} variant="body2" color='inherit'>
                            Get Directions
                          </Link>
                        </Typography>
                      </ul>
                      <ul>Rating: {rating}/5
                        <Typography variant="body2" color="textSecondary">
                          {user_ratings_total} Votes
                        </Typography>
                      </ul>

                    </div>
                  </Typography>
                </Grid>
                
                {/* <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                </Typography>
                </Grid> */}
              </Grid>
              {/* <Grid item>
                <Typography variant="subtitle1">$19.00</Typography>
              </Grid> */}
            </Grid>
            <Grid item className={classes.reviews}>
            <Typography variant="body2" color="textSecondary">
                    <div >
                      Reviews
                      <br/>
                          <ReviewsComponent reviews={reviews} />
                    </div>                  
            </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
});

export default PlaceCard;