const initialState = {
    fetching: false,
    error: false,
    allLikes: [],
    selectedStrainsLikes: [],
}

const likesReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        case 'SET_LIKE_DISPLAY':
            return {
                ...state,
                selectedLike: action.like
            }
        case 'SET_SELECTED_STRAINS_LIKES':
            return {
                ...state,
                selectedStrainsLikes: action.likes
            }
        // case 'SET_STRAIN_DISPLAY':
        //     return {
        //         ...state,
        //         selectedStrainsLikes: action.strain.likes
        //     }

        // case 'DISPLAY_SNACKBAR_ADD_SUCCESS':
        //     return {
        //         ...state,
        //         snackBarSuccessDisplay: action.payload
        //     }
        // case 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS':
        //     return {
        //         ...state,
        //         snackBarSuccessDisplay: action.payload
        //     }

        // ----------****** ASYNC ACTIONS ******-----------

        // ----------FETCH COMMENTS-------  *****************************

        case 'FETCH_LIKES_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_LIKES_SUCCESS':
            const data0 = action.likes 
            const sorted0 = data0.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            return {
                ...state,
                fetching: false,
                allLikes: action.likes,
                selectedStrainsLikes: [...sorted0]
            }
        case 'FETCH_LIKES_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------ADD ENTRY-------  *****************************

        case 'POST_LIKE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_LIKE_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'POST_LIKE_SUCCESS':
            const data1 = [...state.selectedStrainsLikes, action.like]
            const sorted1 = data1.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            return {
                ...state,
                fetching: false,
                allLikes: [...state.allLikes, action.like],
                selectedStrainsLikes: [...sorted1]
                // selectedStrain: action.strain
            }

        // ----------PATCH ENTRY-------  *****************************


        case 'PATCH_LIKE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_LIKE_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'PATCH_LIKE_SUCCESS':
            const data = [...[...state.selectedStrainsLikes.filter(like => like.id != action.like.id)], action.like]
            
            const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            
            return {
                ...state,
                fetching: false,
                allLikes: [...[...state.allLikes.filter(like => like.id != action.like.id)], action.like],
                selectedStrainsLikes: [...sorted]
                // [...state.allLikes, action.like],
                // selectedStrain: action.strain
            }

        // ----------DELETE ENTRY-------  *****************************

        case 'DELETE_LIKE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_LIKE_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'DELETE_LIKE_SUCCESS':

            return {
                ...state,
                fetching: false,
                allLikes: state.allLikes.filter(like => like.id != action.likeId.id),
                selectedStrainsLikes: state.selectedStrainsLikes.filter(like => like.id != action.likeId.id)
                // gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            }


        default:
            return state
    }
}

export default likesReducer