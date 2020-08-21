const token = () => localStorage.getItem("token");


export const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token(),
    };
};

// -------***** UI Actions *****------------------*******************-------------

export const setSmokeListDisplay = (smokeList) => {
    return {
        type: 'SET_SMOKELIST_DISPLAY',
        smokeList: smokeList
    }
}

export const openSnackBarSmokeListAdded = () => {
    return {
        type: 'DISPLAY_SNACKBAR_ADD_SUCCESS_SMOKELIST',
        payload: true
    }
}

export const closeSnackBarSmokeListAdded = () => {
    return {
        type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_SMOKELIST',
        payload: false
    }
}

export const setSelectedStrainsEntries = (smokeLists) => {
    return {
        type: 'SET_SELECTED_STRAINS_ENTRIES',
        smokeLists: smokeLists
    }
}






// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postSmokeListRequest = () => {
    return {
        type: 'POST_SMOKELIST_REQUEST'
    }
}

export const postSmokeListSuccess = (smokeList) => {
    return {
        type: 'POST_SMOKELIST_SUCCESS',
        smokeList: smokeList, 
    }
}

export const postSmokeListFailure = (error) => {
    return {
        type: 'POST_SMOKELIST_FAILURE',
        error: error,
    }
}

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postSmokeList = (data, dispatch) => {
    dispatch(postSmokeListRequest())
    fetch(`http://localhost:3000/smoke_lists`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postSmokeListFailure(data.error))
            } else {
                dispatch(postSmokeListSuccess(data))
                // dispatch(openSnackBarSmokeListAdded())
            }
        })
}


// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchSmokeListRequest = () => {
    return {
        type: 'PATCH_SMOKELIST_REQUEST'
    }
}

export const patchSmokeListSuccess = (smokeList) => {
    return {
        type: 'PATCH_SMOKELIST_SUCCESS',
        smokeList: smokeList,
    }
}

export const patchSmokeListFailure = (error) => {
    return {
        type: 'PATCH_SMOKELIST_FAILURE',
        error: error,
    }
}

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchSmokeList = (data, smokeListId, dispatch) => {
    dispatch(patchSmokeListRequest())
    fetch(`http://localhost:3000/smokeLists/${smokeListId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(patchSmokeListFailure(data.error))
            } else {
                dispatch(patchSmokeListSuccess(data))
                dispatch(openSnackBarSmokeListAdded())
            }
        })
}

// ----------DELETE SMOKELIST ACTIONS-------  *****************************
// ----------DELETE SMOKELIST ACTIONS-------  *****************************

export const deleteSmokeListRequest = () => {
    return {
        type: 'DELETE_SMOKELIST_REQUEST'
    }
}

export const deleteSmokeListSuccess = (smokeListId) => {
    return {
        type: 'DELETE_SMOKELIST_SUCCESS',
        smokeListId: smokeListId,
    }
}

export const deleteSmokeListFailure = (error) => {
    return {
        type: 'DELETE_SMOKELIST_FAILURE',
        error: error,
    }
}

// --------DELETE SMOKELIST FETCH FUNCTION---------  ********************************

export const deleteSmokeList = (smokeListId, dispatch) => {
    dispatch(deleteSmokeListRequest())
    console.log(smokeListId)
    fetch(`http://localhost:3000/smokeLists/${smokeListId}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteSmokeListFailure(data.error))
            } else {
                console.log('indelete success')
                dispatch(deleteSmokeListSuccess(data))
            }
        }) 
}

// -------***** ALL ENTRIES GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL ENTRIES GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchEntriesRequest = () => {
    return {
        type: 'FETCH_ENTRIES_REQUEST'
    }
}

export const fetchEntriesSuccess = (smokeLists) => {
    return {
        type: 'FETCH_ENTRIES_SUCCESS',
        smokeLists: smokeLists,
    }
}

export const fetchEntriesFailure = (error) => {
    return {
        type: 'FETCH_ENTRIES_FAILURE',
        error: error,
    }
}

// -------***** GET ALL ENTRIES FETCH REQUEST FUNCTION *****------------------*******************-------------

export const fetchEntries = (userId, dispatch) => {
    dispatch(fetchEntriesRequest())
    fetch(`http://localhost:3000/users_smokeLists/${userId}`, {
        headers: headers()
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchEntriesFailure(data.error))
            } else {
                console.log(data)
                dispatch(fetchEntriesSuccess(data))
            }
        })
}