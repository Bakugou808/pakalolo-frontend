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
        'min-height': 'auto',
        'max-width': 'auto',
        
    },
    root: {
        display: 'block',   
        'margin-left': 'auto',
        'margin-right': 'auto',
    }

}));

 const PhotosComponent = (props) => {
    const { photos } = props
    const classes = useStyles();


    const renderCarouselItems = () => {
        return photos.map(photo => {
            return (
                <Carousel.Item>
                    <img
                        className={classes.img}
                        src={photo.getUrl()}
                        alt="Store Photo"
                    ></img>
                </Carousel.Item>)
        })
    }

    return (
        <div className={classes.root}>
            <Carousel interval={60000} className={classes.carousel} >
                {renderCarouselItems()}
            </Carousel>
        </div>
    )
}

export default PhotosComponent