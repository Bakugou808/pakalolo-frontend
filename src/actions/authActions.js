const token = () => localStorage.getItem("token");


export const headers = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token(),
    }; 
};

 
export const fetchCurrentUserRequest = () => {
    return {
        type: 'FETCH_CURRENT_USER_REQUEST'
    }
}

export const fetchCurrentUserSuccess = (user) => {
    return {
        type: 'FETCH_CURRENT_USER_SUCCESS',
        user: user,
    }
}

export const fetchCurrentUserFailure = (error) => {
    return {
        type: 'FETCH_CURRENT_USER_SUCCESS',
        error: error,
    }
}










export const fetchCurrentUser = (dispatch) => {
    dispatch(fetchCurrentUserRequest())
    fetch(`http://localhost:3000/current_user`, {
        headers: headers()
    }).then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(fetchCurrentUserFailure(data.error))
        } else {
            dispatch(fetchCurrentUserSuccess(data))
        }
    })
}