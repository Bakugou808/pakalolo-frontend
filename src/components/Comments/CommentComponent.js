import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import AddCommentIcon from '@material-ui/icons/AddComment';
import TextField from '@material-ui/core/TextField';


export const CommentComponent = (props) => {

    const [leaveComment, setLeaveComment] = useState(false)
    const [comment, setComment] = useState('')
    const { renderedComments } = props

    const renderComments = () => {
        console.log(renderedComments)

        return renderedComments.map(comment => <Comment comment={comment} />)
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            handleSubmit()
            setLeaveComment(false)
        } else {
            setComment(e.target.value)
            console.log(comment)
        }
    }

    const handleSubmit = () => {
        console.log('submitting comment')
        setLeaveComment(false)
    }
    

    return (
        <Paper>
            {renderedComments && renderComments()}
            <Paper>
                {leaveComment ?  
                <>
                    <TextField
                        id="outlined-textarea"
                        // label="Comment"
                        placeholder="..."
                        multiline
                        variant="outlined"
                        onChange={handleChange}
                    /> 
                    <Chip label='Leave Comment' onClick={handleSubmit} />
                </>
                :
                <Chip label='Add Comment' icon={AddCommentIcon} color='green' variant='outlined' clickable onClick={() => setLeaveComment(!leaveComment)} >
                </Chip>}
            </Paper>
        </Paper>
    )
}

const mapStateToProps = (store) => ({

})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent)
