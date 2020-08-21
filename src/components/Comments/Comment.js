import React from 'react'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const Comment = ({comment}) => {
    return (
        <Paper >
            {/* add grid to format username, comment, then likes and add comment */}
            <Chip label={comment.user.username} />
            {comment.comment.rating}
            {comment.comment.comment}
        </Paper>
    )
}



export default Comment
