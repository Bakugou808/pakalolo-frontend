import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    carousel: {
        'min-height': '20rem',
        'max-width': '50rem',
        
    },
    root: {
        display: 'block',   
        'margin-left': 'auto',
        'margin-right': 'auto',
    },
    paper:{
        'min-width': '40rem',
        'border-radius':' 25px',
        border: '2px solid #73AD21',
        padding:' 20px',
    },

}));

export const ReviewsComponent = (props) => {
    const { reviews } = props
    const classes = useStyles();


    const renderCarouselItems = () => {
        return reviews.map(review => {
            return (
                <Carousel.Item>
                    <Paper className={classes.paper}>
                        <p>{review.text}</p>
                        <div>Rating: {review.rating}</div>
                        <div>{review.author_name}</div>
                        <Typography variant="body2" color="textSecondary">
                            {review.relative_time_description}
                        </Typography>
                    </Paper>
                </Carousel.Item>)
        })
    }

    return (
        <div className={classes.root}>
            <Carousel interval={8000} className={classes.carousel} >
                {renderCarouselItems()}
            </Carousel>
        </div>
    )
}
