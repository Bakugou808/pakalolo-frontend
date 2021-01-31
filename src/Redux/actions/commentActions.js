const token = () => localStorage.getItem("token");

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// -------***** UI Actions *****------------------*******************-------------

// export const setCommentDisplay = (comment) => {
//     return {
//         type: 'SET_COMMENT_DISPLAY',
//         comment: comment
//     }
// }

// export const openSnackBarEntryAdded = () => {
//     return {
//         type: 'DISPLAY_SNACKBAR_ADD_SUCCESS_COMMENT',
//         payload: true
//     }
// }

// export const closeSnackBarEntryAdded = () => {
//     return {
//         type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_COMMENT',
//         payload: false
//     }
// }

export const setSelectedStrainsComments = (comments) => {
  return {
    type: "SET_SELECTED_STRAINS_COMMENTS",
    comments: comments,
  };
};

// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postCommentRequest = () => {
  return {
    type: "POST_COMMENT_REQUEST",
  };
};

export const postCommentSuccess = (comment) => {
  return {
    type: "POST_COMMENT_SUCCESS",
    comment: comment,
  };
};

export const postCommentFailure = (error) => {
  return {
    type: "POST_COMMENT_FAILURE",
    error: error,
  };
};

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postComment = (data, dispatch) => {
  dispatch(postCommentRequest());

  fetch(`https://pakalolo-api.herokuapp.com/comments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(postCommentFailure(data.error));
      } else {
        dispatch(postCommentSuccess(data));
        // dispatch(openSnackBarEntryAdded())
      }
    });
};

// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchCommentRequest = () => {
  return {
    type: "PATCH_COMMENT_REQUEST",
  };
};

export const patchCommentSuccess = (comment) => {
  return {
    type: "PATCH_COMMENT_SUCCESS",
    comment: comment,
  };
};

export const patchCommentFailure = (error) => {
  return {
    type: "PATCH_COMMENT_FAILURE",
    error: error,
  };
};

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchComment = (data, commentId, dispatch) => {
  dispatch(patchCommentRequest());
  fetch(`https://pakalolo-api.herokuapp.com/comments/${commentId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(patchCommentFailure(data.error));
      } else {
        dispatch(patchCommentSuccess(data));
        // dispatch(openSnackBarEntryAdded())
      }
    });
};

// ----------DELETE ENTRY ACTIONS-------  *****************************
// ----------DELETE ENTRY ACTIONS-------  *****************************

export const deleteCommentRequest = () => {
  return {
    type: "DELETE_COMMENT_REQUEST",
  };
};

export const deleteCommentSuccess = (commentId) => {
  return {
    type: "DELETE_COMMENT_SUCCESS",
    commentId: commentId,
  };
};

export const deleteCommentFailure = (error) => {
  return {
    type: "DELETE_COMMENT_FAILURE",
    error: error,
  };
};

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteComment = (commentId, dispatch) => {
  dispatch(deleteCommentRequest());

  fetch(`https://pakalolo-api.herokuapp.com/comments/${commentId}`, {
    method: "DELETE",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteCommentFailure(data.error));
      } else {
        dispatch(deleteCommentSuccess(data));
      }
    });
};

// -------***** ALL COMMENTS GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL COMMENTS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchCommentsRequest = () => {
  return {
    type: "FETCH_COMMENTS_REQUEST",
  };
};

export const fetchCommentsSuccess = (comments) => {
  return {
    type: "FETCH_COMMENTS_SUCCESS",
    comments: comments,
  };
};

export const fetchCommentsFailure = (error) => {
  return {
    type: "FETCH_COMMENTS_FAILURE",
    error: error,
  };
};

// -------***** GET ALL COMMENTS FETCH REQUEST FUNCTION *****------------------*******************-------------

export const fetchComments = (referenceId, type, dispatch) => {
  dispatch(fetchCommentsRequest());

  fetch(
    `https://pakalolo-api.herokuapp.com/all_comments/${type}/${referenceId}`,
    {
      headers: headers(),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(fetchCommentsFailure(data.error));
      } else {
        dispatch(fetchCommentsSuccess(data));
      }
    });
};
