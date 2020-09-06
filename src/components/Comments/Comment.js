import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CommentComponent from './CommentComponent'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { postLike, deleteLike } from '../../actions/likeActions'



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
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: theme.spacing(50),
        margin: theme.spacing(1)
    },
}));

const Comment = ({ comment, onPostLike, onDeleteLike }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [liked, setLiked] = React.useState(false)
    const [totalLikes, setTotalLikes] = React.useState(0)

    useEffect(()=> {
        comment.likes.forEach(like => like.user_id == localStorage.userId && setLiked(true))
        setTotalLikes(comment.likes.length)
    }, [])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleReply = () => {
        setOpen(!open)
        handleClose()
    }

    const handleUpVote = () => {
        let data = {likeable_type: "Comment", likeable_id: comment.id, user_id: localStorage.userId}

        onPostLike(data)
        setLiked(true)
        setTotalLikes((prev) => prev +1)
    }

    const handleDownVote = () =>{
        let data = {likeable_type: "Comment", likeable_id: comment.id, user_id: localStorage.userId}

        onDeleteLike(data) 
        setLiked(false)
        setTotalLikes((prev) => prev -1)
    }
    
    const renderSubComments = (comments) => {
        return comments.map(comment => {
            
         return   <>
                <Paper className={classes.paper2}>
                    <Col md={3}>
                        <Chip label={comment.username} />
                        <br />
                        {(comment.rating != null) && <Chip label={`Strain Rating: ${comment.rating === null ? 'Not Rated' : comment.rating}`} />}
                    </Col>
                    <Col>
                        <Row>"{comment.comment}"</Row>
                    </Col>
                </Paper>
            </>
        })
    }

    return (
    
        <Paper className={classes.paper} elevation={2}>
            <Container>
                <Row>
                    <Col md={3}>
                        <Chip label={comment.username} />
                        <br />
                        <Chip label={`Strain Rating: ${comment.rating}`} />
                    </Col>
                    <Col>
                        <Row>"{comment.comment}"</Row>
                    </Col>
                    <Col>
                        <>
                            {/* <Tooltip title="Menu" aria-label="Menu" interactive >
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
                                <MenuItem onClick={handleReply}>Reply To Comment</MenuItem>
                                <MenuItem onClick={handleUpVote}>UpVote This Comment</MenuItem>
                            </Menu> */}
               
                               <Chip label={`${totalLikes} UpVotes`} clickable onClick={ liked ? handleDownVote : handleUpVote}/>
                              <Chip label={`${comment.comments.length} Replies`} clickable onClick={handleReply}/>
                            
                        </>
                    </Col>
                </Row>
                <Row>

                    {open &&
                    
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                {renderSubComments(comment.comments)}

                                <CommentComponent type='Comment' commentable_id={comment.id} />
                            </Box>
                        </Collapse>}
                </Row>
            </Container>
        </Paper>
    )
}



const mapStateToProps = (store) => ({
})

const mapDispatchToProps = (dispatch) => ({
    onPostLike: (data) => postLike(data, dispatch), 
    onDeleteLike: (data) => deleteLike(data, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)