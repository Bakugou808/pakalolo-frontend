import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CommentComponent from './CommentComponent'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    },
    root2: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Comment = ({ comment }) => {

    const classes = useStyles();
    console.log(comment)
    // debugger
    return (
        <Paper className={classes.paper} elevation={2}>
            <Container>
                <Row>
                    <Col md={3}>
                        {comment.user && <Chip label={comment.user.username} />}
                        
                        {/* <Row> */}
                        <br/>
                        <Chip label={`Strain Rating: ${comment.rating}`} />
                        {/* </Row> */}
                    </Col>
                    <Col>
                        <Row>"{comment.comment}"</Row>
                    </Col>
                </Row>
                <Row>
                    {/* <CommentComponent renderedComments={comment.comments} type='Comment' commentable_id={comment.id}/>  */}
                </Row>
            </Container>
        </Paper>
    )
}



export default Comment
