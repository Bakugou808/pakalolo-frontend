const token = () => localStorage.getItem("token");


export const headers = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token(),
    }; 
};

// -------***** UI Actions *****------------------*******************-------------

export const setStrainDisplay = (strain) => {
    return {
        type: 'SET_STRAIN_DISPLAY',
        strain: strain
    }
}

export const openSnackBarAddedToCollection = () => {
    return {
        type: 'DISPLAY_SNACKBAR_ADD_SUCCESS',
        payload: true
    }
}

export const closeSnackBarAddedToCollection = () => {
    return {
        type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS',
        payload: false
    }
}







// -------***** POST Actions *****------------------*******************-------------
 
export const postStrainToCollectionRequest = () => {
    return {
        type: 'POST_STRAIN_TO_COLLECTION_REQUEST'
    }
}

export const postStrainToCollectionSuccess = (strain) => {
    return {
        type: 'POST_STRAIN_TO_COLLECTION_SUCCESS',
        strain: strain,
    }
}

export const postStrainToCollectionFailure = (error) => {
    return {
        type: 'POST_STRAIN_TO_COLLECTION_FAILURE',
        error: error,
    }
}

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postStrainToCollection = (data, dispatch) => {
    dispatch(postStrainToCollectionRequest())
    fetch(`http://localhost:3000/collections`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(postStrainToCollectionFailure(data.error))
        } else {
            dispatch(postStrainToCollectionSuccess(data))
            dispatch(openSnackBarAddedToCollection())
        }
    }) 
}


// -------***** ALL COLLECTIONS GET REQUEST Actions *****------------------*******************-------------
 
export const fetchCollectionRequest = () => {
    return {
        type: 'FETCH_COLLECTION_REQUEST'
    }
}

export const fetchCollectionSuccess = (data) => {
    return {
        type: 'FETCH_COLLECTION_SUCCESS',
        collection: data,
    }
}

export const fetchCollectionFailure = (error) => {
    return {
        type: 'FETCH_COLLECTION_FAILURE',
        error: error,
    }
}

// -------***** GET ALL STRAINS IN COLLECTION FETCH REQUEST *****------------------*******************-------------

export const fetchCollection = (userId, dispatch) => {
    dispatch(fetchCollectionRequest())
    fetch(`http://localhost:3000/users_collection/${userId}`, {
        headers: headers()
    }).then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(fetchCollectionFailure(data.error))
        } else {
            dispatch(fetchCollectionSuccess(data))
        }
    }) 
}