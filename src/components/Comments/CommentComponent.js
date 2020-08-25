import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import CommentBar from './CommentBar'
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import AddCommentIcon from '@material-ui/icons/AddComment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));

export const CommentComponent = (props) => {

    // const [leaveComment, setLeaveComment] = useState(false)
    // const [comment, setComment] = useState('')
    const { strainComments, type, commentable_id, renderedComments } = props

    const renderComments = () => {
        console.log(strainComments)
        if (renderedComments) {
            return renderedComments.map(comment => 
            <Grid item xs>
                <Typography><Comment comment={comment} /></Typography>
            </Grid>)
        } else {
            return strainComments.map(comment => <Comment comment={comment} />)
        }
        
    }


    const classes = useStyles();


    return (
        <Paper>
            {strainComments && renderComments()}
            {renderedComments &&
                <Grid container wrap='nowrap' spacing={2} >
                    {renderComments()}
                </Grid>
            }
            <CommentBar type={type} commentable_id={commentable_id}/>
        </Paper>
    )
}

const mapStateToProps = (store) => ({
    strainComments: store.comments.selectedStrainsComments
})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent)
