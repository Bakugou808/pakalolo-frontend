const initialState = {
    selectedStrainsEntries: [],
    fetching: false,
    error: false,
    selectedEntry: null,
    snackBarSuccessDisplay: false,
}

const entriesReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        case 'SET_ENTRY_DISPLAY':
            return {
                ...state,
                selectedEntry: action.entry
            }
        case 'SET_SELECTED_STRAINS_ENTRIES':
            return {
                ...state,
                selectedStrainsEntries: action.entries
            }
        // case 'SET_STRAIN_DISPLAY':
        //     return {
        //         ...state,
        //         selectedStrainsEntries: action.strain.entries
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
        // case 'FETCH_COLLECTION_REQUEST':
        //     return {
        //         ...state,
        //         fetching: true
        //     }
        // case 'FETCH_COLLECTION_SUCCESS':

        //     return {
        //         ...state,
        //         fetching: false,
        //         totalCollection: action.collection
        //     }
        // case 'FETCH_COLLECTION_FAILURE':

        //     return {
        //         ...state,
        //         fetching: false,
        //         error: action.error
        //     }


        // case 'POST_STRAIN_TO_COLLECTION_REQUEST':
        //     return {
        //         ...state,
        //         fetching: true
        //     }
        // case 'POST_STRAIN_TO_COLLECTION_FAILURE':

        //     return {
        //         ...state,
        //         fetching: false,
        //         error: action.error
        //     }
        // case 'POST_STRAIN_TO_COLLECTION_SUCCESS':

        //     return {
        //         ...state,
        //         fetching: false,
        //         totalCollection: [...state.totalCollection, action.strain],
        //         selectedStrain: action.strain
        //     }

        default:
            return state
    }
}

export default entriesReducer