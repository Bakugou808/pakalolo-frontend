import { fetchCollection } from '../actions/collectionActions'

const token = () => localStorage.getItem("token");



export const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token(),
    };
};

// -------***** UI Actions *****------------------*******************-------------

export const setEntryDisplay = (entry) => {
    return {
        type: 'SET_ENTRY_DISPLAY',
        entry: entry 
    }
}

export const openSnackBarEntryAdded = () => {
    return {
        type: 'DISPLAY_SNACKBAR_ADD_SUCCESS_ENTRY',
        payload: true
    }
}

export const closeSnackBarEntryAdded = () => {
    return {
        type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_ENTRY',
        payload: false
    }
}

export const setSelectedStrainsEntries = (entries) => {
    return {
        type: 'SET_SELECTED_STRAINS_ENTRIES',
        entries: entries
    }
}






// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postEntryRequest = () => {
    return {
        type: 'POST_ENTRY_REQUEST'
    }
}

export const postEntrySuccess = (entry) => {
    return {
        type: 'POST_ENTRY_SUCCESS',
        entry: entry, 
    }
}

export const postEntryFailure = (error) => {
    return {
        type: 'POST_ENTRY_FAILURE',
        error: error,
    }
}

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postEntry = (data, dispatch) => {
    dispatch(postEntryRequest())
    fetch(`http://localhost:3000/entries`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(postEntryFailure(data.error))
            } else {
                dispatch(postEntrySuccess(data))
                dispatch(openSnackBarEntryAdded())
                fetchCollection(localStorage.userId, dispatch)
            }
        })
}


// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchEntryRequest = () => {
    return {
        type: 'PATCH_ENTRY_REQUEST'
    }
}

export const patchEntrySuccess = (entry) => {
    return {
        type: 'PATCH_ENTRY_SUCCESS',
        entry: entry,
    }
}

export const patchEntryFailure = (error) => {
    return {
        type: 'PATCH_ENTRY_FAILURE',
        error: error,
    }
}

export const patchEntryInSmokeList = (entry) => {
    return {
        type: 'ADD_ENTRY_TO_SMOKELIST_PAGE',
        entry: entry,
    }
}

export const patchEntryInSubEntryTable = (entry) => {
    return {
        type: 'ADD_ENTRY_TO_SUB_ENTRY_TABLE_PATCH',
        entry: entry,
    }
}

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchEntry = (data, entryId, dispatch, type='') => {
    console.log(entryId, 'entry id')
    console.log(data, 'entry data')
    dispatch(patchEntryRequest())
    
    // fetch(`http://localhost:3000/entries/${entryId}`, {
    //     method: "PATCH",
    //     headers: headers(),
    //     body: JSON.stringify(data)

    // })
    
    fetch(`http://localhost:3000/entries/${entryId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(data)

    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(patchEntryFailure(data.error))
            } else {
                dispatch(patchEntrySuccess(data))
                dispatch(openSnackBarEntryAdded())
                if (type === 'smokeList'){
                    dispatch(patchEntryInSmokeList(data))
                    fetchCollection(localStorage.userId, dispatch)
                } else if (type === 'subEntryTable'){
                    dispatch(patchEntryInSubEntryTable(data))
                    dispatch(patchEntryInSmokeList(data))
                    fetchCollection(localStorage.userId, dispatch)
                }
            }
        })
}

// ----------DELETE ENTRY ACTIONS-------  *****************************
// ----------DELETE ENTRY ACTIONS-------  *****************************

export const deleteEntryRequest = () => {
    return {
        type: 'DELETE_ENTRY_REQUEST'
    }
}

export const deleteEntrySuccess = (entryId) => {
    return {
        type: 'DELETE_ENTRY_SUCCESS',
        entryId: entryId,
    }
}

export const deleteEntryFailure = (error) => {
    return {
        type: 'DELETE_ENTRY_FAILURE',
        error: error,
    }
}

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteEntry = (entryId, dispatch) => {
    dispatch(deleteEntryRequest())
    console.log(entryId)
    fetch(`http://localhost:3000/entries/${entryId}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteEntryFailure(data.error))
            } else {
                console.log('indelete success')
                dispatch(deleteEntrySuccess(data))
                fetchCollection(localStorage.userId, dispatch)

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

export const fetchEntriesSuccess = (entries) => {
    return {
        type: 'FETCH_ENTRIES_SUCCESS',
        entries: entries,
    }
}

export const fetchEntriesFailure = (error) => {
    return {
        type: 'FETCH_ENTRIES_FAILURE',
        error: error,
    }
}

export const setEntriesForSmokeList = (entries) => {
    return {
        type: 'SET_SELECTED_SMOKELISTS_ENTRIES',
        entries: entries
    }
}

// -------***** GET ALL ENTRIES FETCH REQUEST FUNCTION *****------------------*******************-------------

export const fetchEntries = (userId, dispatch, smokeListPage) => {
    dispatch(fetchEntriesRequest())
    fetch(`http://localhost:3000/users_entries/${userId}`, {
        headers: headers()
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch(fetchEntriesFailure(data.error))
            } else if (smokeListPage) {
                // dispatch(setEntriesForSmokeList(data))
            } else {
                dispatch(fetchEntriesSuccess(data))
            }
        })
}