const initialState = {
    data: false,
    // fetching: false,
}

const authReducer = (state=initialState, action) => {
    let idx 
    let data 
    

    switch(action.type){

        case 'FETCH_CURRENT_USER_REQUEST':
            console.log("in user request case")
            return { 
                ...state,
                fetching: true
            }
        case 'FETCH_CURRENT_USER_SUCCESS':
            console.log("in user success case", action)
            return {
                ...state,
                // fetching: false, 
                data: true
            }   
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                data: true
            }
        case 'SIGN_UP_USER_SUCCESS':
            return {
                ...state,
                data: true
            }
        case 'SIGN_OUT_USER':
            // localStorage.removeItem("token");
            return {
                // ...state,
                data: false
            }
        default:
            return state
    }
}

export default authReducer