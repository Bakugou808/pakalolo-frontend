const token = () => localStorage.getItem("token");


export const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token(),
    };
};


// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postTagRequest = () => {
    return {
        type: 'POST_TAG_REQUEST'
    }
}

export const postTagSuccess = (tag) => {
    return {
        type: 'POST_TAG_SUCCESS',
        tag: tag, 
    }
}

export const postTagFailure = (error) => {
    return {
        type: 'POST_TAG_FAILURE',
        error: error,
    }
}

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postTag = (data, dispatch) => {
    dispatch(postTagRequest())
    fetch(`http://localhost:3000/tags`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postTagFailure(data.error))
            } else {
                dispatch(postTagSuccess(data))
                // dispatch(openSnackBarEntryAdded())
            }
        })
}


// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchTagRequest = () => {
    return {
        type: 'PATCH_TAG_REQUEST'
    }
}

export const patchTagSuccess = (tag) => {
    return {
        type: 'PATCH_TAG_SUCCESS',
        tag: tag,
    }
}

export const patchTagFailure = (error) => {
    return {
        type: 'PATCH_TAG_FAILURE',
        error: error,
    }
}

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchTag = (data, tagId, dispatch) => {
    dispatch(patchTagRequest())
    fetch(`http://localhost:3000/tags/${tagId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(patchTagFailure(data.error))
            } else {
                dispatch(patchTagSuccess(data))
            }
        })
}

// ----------DELETE ENTRY ACTIONS-------  *****************************
// ----------DELETE ENTRY ACTIONS-------  *****************************

export const deleteTagRequest = () => {
    return {
        type: 'DELETE_TAG_REQUEST'
    }
}

export const deleteTagSuccess = (tagId) => {
    return {
        type: 'DELETE_TAG_SUCCESS',
        tagId: tagId,
    }
}

export const deleteTagFailure = (error) => {
    return {
        type: 'DELETE_TAG_FAILURE',
        error: error,
    }
}

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteTag = (tag, dispatch) => {
    dispatch(deleteTagRequest())
    console.log(tag)
    fetch(`http://localhost:3000/tags/${tag}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteTagFailure(data.error))
            } else {
                console.log('indelete success', data)
                
                dispatch(deleteTagSuccess(data))
            }
        }) 
}

// -------***** ALL TAGS GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL TAGS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchTagsRequest = () => {
    return {
        type: 'FETCH_TAGS_REQUEST'
    }
}

export const fetchTagsSuccess = (tags) => {
    return {
        type: 'FETCH_TAGS_SUCCESS',
        tags: tags,
    }
}

export const fetchTagsFailure = (error) => {
    return {
        type: 'FETCH_TAGS_FAILURE',
        error: error,
    }
}

export const fetchAllTags = (userId, dispatch) => {
    dispatch(fetchTagsRequest())
    fetch(`http://localhost:3000/tags/users_tags/${userId}`, {
        headers: headers()
    })
        .then(res=>res.json())
        .then(data => {
            
            if (data.error){
                dispatch(fetchTagsFailure(data.error))
            } else {
                console.log('infetch success', data)
                
                dispatch(fetchTagsSuccess(data))
            }
        }) 
}

// Fetch Strain Collection with Matching Tag

export const fetchStrainsWithTagRequest = () => {
    return {
        type: 'FETCH_STRAINS_WITH_TAG_REQUEST'
    }
}

export const fetchStrainsWithTagSuccess = (tags) => {
    return {
        type: 'FETCH_STRAINS_WITH_TAG_SUCCESS',
        tags: tags,
    }
}

export const fetchStrainsWithTagFailure = (error) => {
    return {
        type: 'FETCH_STRAINS_WITH_TAG_FAILURE',
        error: error,
    }
}

export const fetchAllStrainsWithTag = (title, dispatch, userId) => {
    dispatch(fetchStrainsWithTagRequest())
    fetch(`http://localhost:3000/tags/strains_with_tag/${title}/${userId}`, {
        headers: headers()
    })
        .then(res=>res.json())
        .then(data => {
            
            if (data.error){
                dispatch(fetchStrainsWithTagFailure(data.error))
            } else {
                console.log('infetch success', data)
                
                dispatch(fetchStrainsWithTagSuccess(data))
            }
        }) 
}