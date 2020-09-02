const token = () => localStorage.getItem("token");


export const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token(),
    };
};

// -------***** UI Actions *****------------------*******************-------------

// export const setLikeDisplay = (like) => {
//     return {
//         type: 'SET_LIKE_DISPLAY',
//         like: like
//     }
// }

// export const openSnackBarEntryAdded = () => {
//     return {
//         type: 'DISPLAY_SNACKBAR_ADD_SUCCESS_LIKE',
//         payload: true
//     }
// }

// export const closeSnackBarEntryAdded = () => {
//     return {
//         type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_LIKE',
//         payload: false
//     }
// }

// export const setSelectedStrainsEntries = (likes) => {
//     return {
//         type: 'SET_SELECTED_STRAINS_LIKES',
//         likes: likes
//     }
// }






// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postLikeRequest = () => {
    return {
        type: 'POST_LIKE_REQUEST'
    }
}

export const postLikeSuccess = (like) => {
    return {
        type: 'POST_LIKE_SUCCESS',
        like: like, 
    }
}

export const postLikeFailure = (error) => {
    return {
        type: 'POST_LIKE_FAILURE',
        error: error,
    }
}

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postLike = (data, dispatch) => {
    dispatch(postLikeRequest())
    fetch(`http://localhost:3000/likes`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postLikeFailure(data.error))
            } else {
                dispatch(postLikeSuccess(data))
                // dispatch(openSnackBarEntryAdded())
            }
        })
}


// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchLikeRequest = () => {
    return {
        type: 'PATCH_LIKE_REQUEST'
    }
}

export const patchLikeSuccess = (like) => {
    return {
        type: 'PATCH_LIKE_SUCCESS',
        like: like,
    }
}

export const patchLikeFailure = (error) => {
    return {
        type: 'PATCH_LIKE_FAILURE',
        error: error,
    }
}

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchLike = (data, likeId, dispatch) => {
    dispatch(patchLikeRequest())
    fetch(`http://localhost:3000/likes/${likeId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(patchLikeFailure(data.error))
            } else {
                dispatch(patchLikeSuccess(data))
                dispatch(openSnackBarEntryAdded())
            }
        })
}

// ----------DELETE ENTRY ACTIONS-------  *****************************
// ----------DELETE ENTRY ACTIONS-------  *****************************

export const deleteLikeRequest = () => {
    return {
        type: 'DELETE_LIKE_REQUEST'
    }
}

export const deleteLikeSuccess = (likeId) => {
    return {
        type: 'DELETE_LIKE_SUCCESS',
        likeId: likeId,
    }
}

export const deleteLikeFailure = (error) => {
    return {
        type: 'DELETE_LIKE_FAILURE',
        error: error,
    }
}

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteLike = (likeId, dispatch) => {
    dispatch(deleteLikeRequest())
    console.log(likeId)
    fetch(`http://localhost:3000/likes/${likeId}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteLikeFailure(data.error))
            } else {
                console.log('indelete success')
                dispatch(deleteLikeSuccess(data))
            }
        }) 
}

// -------***** ALL COMMENTS GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL COMMENTS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchLikesRequest = () => {
    return {
        type: 'FETCH_LIKES_REQUEST'
    }
}

export const fetchLikesSuccess = (likes) => {
    return {
        type: 'FETCH_LIKES_SUCCESS',
        likes: likes,
    }
}

export const fetchLikesFailure = (error) => {
    return {
        type: 'FETCH_LIKES_FAILURE',
        error: error,
    }
}

// -------***** GET ALL COMMENTS FETCH REQUEST FUNCTION *****------------------*******************-------------

// export const fetchLikes = (referenceId, dispatch) => {
//     dispatch(fetchLikesRequest())
//     fetch(`http://localhost:3000/users_likes/${userId}`, {
//         headers: headers()
//     }).then(res => res.json())
//         .then(data => {
//             if (data.error) {
//                 dispatch(fetchLikesFailure(data.error))
//             } else {
//                 console.log(data)
//                 dispatch(fetchLikesSuccess(data))
//             }
//         })
// }