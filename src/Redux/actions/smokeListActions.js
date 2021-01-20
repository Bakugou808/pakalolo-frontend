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
    type: "SET_SMOKELIST_DISPLAY",
    smokeList: smokeList,
  };
};

export const openSnackBarSmokeListAdded = () => {
  return {
    type: "DISPLAY_SNACKBAR_ADD_SUCCESS_SMOKELIST",
    payload: true,
  };
};

export const closeSnackBarSmokeListAdded = () => {
  return {
    type: "CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_SMOKELIST",
    payload: false,
  };
};

export const setSelectedStrainsSmokeLists = (smokeLists) => {
  return {
    type: "SET_SELECTED_STRAINS_SMOKELISTS",
    smokeLists: smokeLists,
  };
};

export const setEntriesForSmokeList = (entries) => {
  return {
    type: "SET_SELECTED_SMOKELISTS_ENTRIES",
    entries: entries,
  };
};

export const setSelectedSmokeList = (smokeList) => {
  return {
    type: "SET_SELECTED_SMOKELIST",
    smokeList: smokeList,
  };
};

export const setNoteBookDisplay = (payload) => {
  return {
    type: "SHOW_SMOKELIST_ON_PAGE",
    payload: payload,
  };
};

// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postSmokeListRequest = () => {
  return {
    type: "POST_SMOKELIST_REQUEST",
  };
};

export const postSmokeListSuccess = (smokeList) => {
  return {
    type: "POST_SMOKELIST_SUCCESS",
    smokeList: smokeList,
  };
};

export const postSmokeListFailure = (error) => {
  return {
    type: "POST_SMOKELIST_FAILURE",
    error: error,
  };
};

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postSmokeList = (data, dispatch) => {
  dispatch(postSmokeListRequest());
  fetch(`https://pakalolo-api.herokuapp.com/smoke_lists`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(postSmokeListFailure(data.error));
      } else {
        dispatch(postSmokeListSuccess(data));
        // dispatch(openSnackBarSmokeListAdded())
      }
    });
};

// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchSmokeListRequest = () => {
  return {
    type: "PATCH_SMOKELIST_REQUEST",
  };
};

export const patchSmokeListSuccess = (smokeList) => {
  return {
    type: "PATCH_SMOKELIST_SUCCESS",
    smokeList: smokeList,
  };
};

export const patchSmokeListFailure = (error) => {
  return {
    type: "PATCH_SMOKELIST_FAILURE",
    error: error,
  };
};

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchSmokeList = (data, smokeListId, dispatch) => {
  dispatch(patchSmokeListRequest());
  fetch(`https://pakalolo-api.herokuapp.com/smoke_lists/${smokeListId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(patchSmokeListFailure(data.error));
      } else {
        dispatch(patchSmokeListSuccess(data));
        dispatch(openSnackBarSmokeListAdded());
      }
    });
};

// ----------DELETE SMOKELIST ACTIONS-------  *****************************
// ----------DELETE SMOKELIST ACTIONS-------  *****************************

export const deleteSmokeListRequest = () => {
  return {
    type: "DELETE_SMOKELIST_REQUEST",
  };
};

export const deleteSmokeListSuccess = (smokeListId) => {
  return {
    type: "DELETE_SMOKELIST_SUCCESS",
    smokeListId: smokeListId,
  };
};

export const deleteSmokeListFailure = (error) => {
  return {
    type: "DELETE_SMOKELIST_FAILURE",
    error: error,
  };
};

// --------DELETE SMOKELIST FETCH FUNCTION---------  ********************************

export const deleteSmokeList = (smokeListId, dispatch) => {
  dispatch(deleteSmokeListRequest());
  console.log(smokeListId);
  fetch(`https://pakalolo-api.herokuapp.com/smoke_lists/${smokeListId}`, {
    method: "DELETE",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteSmokeListFailure(data.error));
      } else {
        console.log("indelete success");
        dispatch(deleteSmokeListSuccess(data));
        dispatch(setNoteBookDisplay(false));
      }
    });
};

// -------***** ALL SMOKELISTS GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL SMOKELISTS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchSmokeListsRequest = () => {
  return {
    type: "FETCH_SMOKELISTS_REQUEST",
  };
};

export const fetchSmokeListsSuccess = (smokeLists) => {
  return {
    type: "FETCH_SMOKELISTS_SUCCESS",
    smokeLists: smokeLists,
  };
};

export const fetchSmokeListsFailure = (error) => {
  return {
    type: "FETCH_SMOKELISTS_FAILURE",
    error: error,
  };
};

// -------***** GET ALL SMOKELISTS FETCH REQUEST FUNCTION *****------------------*******************-------------

export const fetchSmokeLists = (userId, dispatch) => {
  dispatch(fetchSmokeListsRequest());
  fetch(`https://pakalolo-api.herokuapp.com/users_smokeLists/${userId}`, {
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(fetchSmokeListsFailure(data.error));
      } else {
        console.log(data);
        dispatch(fetchSmokeListsSuccess(data));
      }
    });
};

// -------***** POST SmokeListEntry Actions *****------------------*******************-------------
// -------***** POST SmokeListEntry Actions *****------------------*******************-------------

export const postSmokeListEntryRequest = () => {
  return {
    type: "POST_SMOKELISTENTRY_REQUEST",
  };
};

export const postSmokeListEntrySuccess = (smokeListEntry, page) => {
  return {
    type: "POST_SMOKELISTENTRY_SUCCESS",
    smokeListEntry: smokeListEntry,
    page: page,
  };
};

export const postSmokeListEntryFailure = (error) => {
  return {
    type: "POST_SMOKELISTENTRY_FAILURE",
    error: error,
  };
};

// -------***** POST SmokeListEntry FETCH REQUEST *****------------------*******************-------------

export const postSmokeListEntry = (data, dispatch, page = null) => {
  dispatch(postSmokeListEntryRequest());
  fetch(`https://pakalolo-api.herokuapp.com/smoke_lists/new_entry`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(postSmokeListEntryFailure(data.error));
      } else {
        dispatch(postSmokeListEntrySuccess(data, page));
        // fetchSmokeLists(localStorage.userId, dispatch)
        // dispatch(openSnackBarSmokeListEntryAdded())
      }
    });
};
// ----------DELETE SMOKELISTENTRY ACTIONS-------  *****************************
// ----------DELETE SMOKELISTENTRY ACTIONS-------  *****************************

export const deleteSmokeListEntryRequest = () => {
  return {
    type: "DELETE_SMOKELISTENTRY_REQUEST",
  };
};

export const deleteSmokeListEntrySuccess = (entryId) => {
  return {
    type: "DELETE_SMOKELISTENTRY_SUCCESS",
    entryId: entryId,
  };
};

export const deleteSmokeListEntryFailure = (error) => {
  return {
    type: "DELETE_SMOKELISTENTRY_FAILURE",
    error: error,
  };
};

// --------DELETE SMOKELISTENTRY FETCH FUNCTION---------  ********************************

export const deleteSmokeListEntry = (entryData, dispatch) => {
  dispatch(deleteSmokeListEntryRequest());
  console.log(entryData);
  fetch(`https://pakalolo-api.herokuapp.com/smoke_lists_entry/delete`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(entryData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteSmokeListEntryFailure(data.error));
      } else {
        console.log("indelete success");
        dispatch(deleteSmokeListEntrySuccess(data));
      }
    });
};
