const token = () => localStorage.getItem("token");

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// -------***** POST Actions *****------------------*******************-------------

export const postLikeRequest = () => {
  return {
    type: "POST_LIKE_REQUEST",
  };
};

export const postLikeSuccess = (like) => {
  return {
    type: "POST_LIKE_SUCCESS",
    like: like,
  };
};

export const postLikeFailure = (error) => {
  return {
    type: "POST_LIKE_FAILURE",
    error: error,
  };
};

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postLike = (data, dispatch, type) => {
  dispatch(postLikeRequest());
  fetch(`http://localhost:3000/likes`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(postLikeFailure(data.error));
      } else {
        dispatch(postLikeSuccess(data));
        // dispatch(openSnackBarEntryAdded())
      }
    });
};

// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchLikeRequest = () => {
  return {
    type: "PATCH_LIKE_REQUEST",
  };
};

export const patchLikeSuccess = (like) => {
  return {
    type: "PATCH_LIKE_SUCCESS",
    like: like,
  };
};

export const patchLikeFailure = (error) => {
  return {
    type: "PATCH_LIKE_FAILURE",
    error: error,
  };
};

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchLike = (data, likeId, dispatch) => {
  dispatch(patchLikeRequest());
  fetch(`http://localhost:3000/likes/${likeId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(patchLikeFailure(data.error));
      } else {
        dispatch(patchLikeSuccess(data));
      }
    });
};

// ----------DELETE ENTRY ACTIONS-------  *****************************

export const deleteLikeRequest = () => {
  return {
    type: "DELETE_LIKE_REQUEST",
  };
};

export const deleteLikeSuccess = (likeId) => {
  return {
    type: "DELETE_LIKE_SUCCESS",
    likeId: likeId,
  };
};

export const deleteLikeFailure = (error) => {
  return {
    type: "DELETE_LIKE_FAILURE",
    error: error,
  };
};

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteLike = (data, dispatch) => {
  dispatch(deleteLikeRequest());

  fetch(`http://localhost:3000/delete_like`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteLikeFailure(data.error));
      } else {
        // dispatch(deleteLikeSuccess(data))
      }
    });
};

// -------***** ALL COMMENTS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchLikesRequest = () => {
  return {
    type: "FETCH_LIKES_REQUEST",
  };
};

export const fetchLikesSuccess = (likes) => {
  return {
    type: "FETCH_LIKES_SUCCESS",
    likes: likes,
  };
};

export const fetchLikesFailure = (error) => {
  return {
    type: "FETCH_LIKES_FAILURE",
    error: error,
  };
};
