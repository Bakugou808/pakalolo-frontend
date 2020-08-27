import React from 'react'
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

const Comment = ({ comment }) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

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
    const renderSubComments = (comments) => {
        return comments.map(comment => {
            
         return   <>
                <Paper className={classes.paper2}>
                    <Col md={3}>
                        <Chip label={comment.username} />
                        <br />
                        <Chip label={`Strain Rating: ${comment.rating}`} />
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
                            <Tooltip title="Menu" aria-label="Menu" interactive >
                                {/* <Fab color="primary" className={classes.fab}> */}
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                                    <MoreVertIcon style={{ display: 'align-right' }} />
                                </IconButton>
                                {/* </Fab> */}
                            </Tooltip>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleReply}>Reply To Comment</MenuItem>
                                <MenuItem onClick={() => console.log('i liked this comment')}>UpVote This Comment</MenuItem>
                            </Menu>
                            {comment.likes.length > 0 && <Chip label={`${comment.likes.length} Votes`} />}
                            {comment.comments.length > 0 && <Chip label={`${comment.comments.length} Replies`} clickable onClick={handleReply}/>
                            }
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



export default Comment
