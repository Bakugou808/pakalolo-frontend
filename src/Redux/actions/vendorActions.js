const token = () => localStorage.getItem("token");

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// -------***** UI Actions *****------------------*******************-------------

// export const setEntryDisplay = (entry) => {
//     return {
//         type: 'SET_VENDOR_DISPLAY',
//         entry: entry
//     }
// }

// export const openSnackBarEntryAdded = () => {
//     return {
//         type: 'DISPLAY_SNACKBAR_ADD_SUCCESS_ENTRY',
//         payload: true
//     }
// }

// export const closeSnackBarEntryAdded = () => {
//     return {
//         type: 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS_ENTRY',
//         payload: false
//     }
// }

// export const setSelectedStrainsEntries = (entries) => {
//     return {
//         type: 'SET_SELECTED_STRAINS_ENTRIES',
//         entries: entries
//     }
// }

// -------***** POST Actions *****------------------*******************-------------
// -------***** POST Actions *****------------------*******************-------------

export const postVendorRequest = () => {
  return {
    type: "POST_VENDOR_REQUEST",
  };
};

export const postVendorSuccess = (vendor) => {
  return {
    type: "POST_VENDOR_SUCCESS",
    vendor: vendor,
  };
};

export const postVendorFailure = (error) => {
  return {
    type: "POST_VENDOR_FAILURE",
    error: error,
  };
};

// -------***** POST FETCH REQUEST *****------------------*******************-------------

export const postVendor = (data, dispatch) => {
  dispatch(postVendorRequest());
  fetch(`https://pakalolo-api.herokuapp.com/vendors`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(postVendorFailure(data.error));
      } else {
        dispatch(postVendorSuccess(data));
        // dispatch(openSnackBarVendorAdded())
      }
    });
};

// -------***** PATCH Actions *****------------------*******************-------------
// -------***** PATCH Actions *****------------------*******************-------------

export const patchVendorRequest = () => {
  return {
    type: "PATCH_VENDOR_REQUEST",
  };
};

export const patchVendorSuccess = (vendor) => {
  return {
    type: "PATCH_VENDOR_SUCCESS",
    vendor: vendor,
  };
};

export const patchVendorFailure = (error) => {
  return {
    type: "PATCH_VENDOR_FAILURE",
    error: error,
  };
};

// -------***** PATCH FETCH REQUEST *****------------------*******************-------------

export const patchVendor = (data, vendorId, dispatch) => {
  dispatch(patchVendorRequest());
  fetch(`https://pakalolo-api.herokuapp.com/vendors/${vendorId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(patchVendorFailure(data.error));
      } else {
        dispatch(patchVendorSuccess(data));
        // dispatch(openSnackBarEntryAdded())
      }
    });
};

// ----------DELETE VENDOR ACTIONS-------  *****************************
// ----------DELETE VENDOR ACTIONS-------  *****************************

export const deleteVendorRequest = () => {
  return {
    type: "DELETE_VENDOR_REQUEST",
  };
};

export const deleteVendorSuccess = (vendorId) => {
  return {
    type: "DELETE_VENDOR_SUCCESS",
    vendorId: vendorId,
  };
};

export const deleteVendorFailure = (error) => {
  return {
    type: "DELETE_VENDOR_FAILURE",
    error: error,
  };
};

// --------DELETE ENTRY FETCH FUNCTION---------  ********************************

export const deleteVendor = (vendorId, dispatch) => {
  dispatch(deleteVendorRequest());

  fetch(`https://pakalolo-api.herokuapp.com/vendors/${vendorId}`, {
    method: "DELETE",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteVendorFailure(data.error));
      } else {
        dispatch(deleteVendorSuccess(data));
      }
    });
};

// -------***** ALL VENDORS GET REQUEST ACTIONS *****------------------*******************-------------
// -------***** ALL VENDORS GET REQUEST ACTIONS *****------------------*******************-------------

export const fetchVendorsRequest = () => {
  return {
    type: "FETCH_VENDORS_REQUEST",
  };
};

export const fetchVendorsSuccess = (vendors) => {
  return {
    type: "FETCH_VENDORS_SUCCESS",
    vendors: vendors,
  };
};

export const fetchVendorsFailure = (error) => {
  return {
    type: "FETCH_VENDORS_FAILURE",
    error: error,
  };
};

// -------***** GET ALL ENTRIES FETCH REQUEST FUNCTION *****------------------*******************-------------

export const fetchVendors = (userId, dispatch) => {
  dispatch(fetchVendorsRequest());
  fetch(`https://pakalolo-api.herokuapp.com/users_vendors/${userId}`, {
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(fetchVendorsFailure(data.error));
      } else {
        dispatch(fetchVendorsSuccess(data));
      }
    });
};
