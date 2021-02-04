import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { postComment, deleteComment } from "../../Redux/actions/commentActions";
import Chip from "@material-ui/core/Chip";
import AddCommentIcon from "@material-ui/icons/AddComment";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const CommentBar = (props) => {
  const [leaveComment, setLeaveComment] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const {
    type,
    commentable_id,
    onPostComment,
    setComments,
    setSubComments,
    comments,
  } = props;

  const handleChange = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit();
      setLeaveComment(false);
    } else {
      e.target.id === "comment"
        ? setComment(e.target.value)
        : setRating(e.target.value);
    }
  };

  const handleSubmit = () => {
    let data = {
      user_id: localStorage.userId,
      username: localStorage.userName,
      commentable_type: type,
      commentable_id: commentable_id,
      rating: rating,
      comment: comment,
      likes: [],
      comments: [],
    };

    onPostComment(data);
    setLeaveComment(false);
    type === "Strain"
      ? comments
        ? setComments((prev) => [...prev, data])
        : setComments([data])
      : setSubComments((prev) => [...prev, data]);
  };

  return (
    <div>
      <Paper>
        {leaveComment ? (
          <>
            <TextField
              id="rating"
              // label="Comment"
              key="rating"
              placeholder="Rating (Optional)"
              multiline
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="comment"
              // label="Comment"
              key="comment"
              placeholder="Comment..."
              multiline
              variant="outlined"
              onChange={handleChange}
            />

            <Chip label="Leave Comment" onClick={handleSubmit} />
            <Chip
              label="Cancel"
              color="primary"
              variant="outlined"
              clickable
              onClick={() => setLeaveComment(false)}
            ></Chip>
          </>
        ) : (
          <>
            <Chip
              label="Add Comment"
              color="primary"
              variant="outlined"
              clickable
              onClick={() => setLeaveComment(true)}
            ></Chip>
          </>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onPostComment: (commentData) => postComment(commentData, dispatch),
  onDeleteComment: (commentId) => deleteComment(commentId, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);
