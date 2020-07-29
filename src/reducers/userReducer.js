const initialState = {
    data: [],
    fetching: false,
    error: false
}

const userReducer = (state=initialState, action) => {
    let idx 
    let data 
    

    switch(action.type){

        case 'FETCH_USER_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                fetching: false, 
                data: action.user,
                error: false 
            }   
        case 'FETCH_USER_FAILURE':
            return {
                ...state,
                fetching: false, 
                error: action.error 
            }  
        case 'FETCH_CURRENT_USER_SUCCESS':
            return {
                ...state,
                fetching: false, 
                data: action.user
            } 
        case 'SIGN_OUT_USER':
            // doesn't work in case
            // localStorage.removeItem("token");
            // localStorage.removeItem("userId");
            return {
                ...state,
                data: [],
                error: false
            }
        case 'SIGN_UP_USER_SUCCESS':
            return {
                ...state, 
                fetching: false,
                data: action.user
            }
        case 'SIGN_UP_USER_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'SIGN_UP_USER_FAILURE':
            return {
                ...state,
                fetching: false, 
                error: action.error
            }   
        default:
            return state
    }
}

export default userReducer