const initialState = {
    selectedEntriesForSmokeList: [],
    fetching: false,
    error: false,
    selectedSmokeList: null,
    snackBarSuccessDisplay: false,
    allSmokeLists: []
}

const smokeListReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        case 'SET_SMOKELIST_DISPLAY':
            return {
                ...state,
                selectedSmokeList: action.entry
            }
        case 'SET_SELECTED_STRAINS_SMOKELISTS':
            return {
                ...state,
                selectedEntriesForSmokeList: action.entries
            }
        // case 'SET_STRAIN_DISPLAY':
        //     return {
        //         ...state,
        //         selectedEntriesForSmokeList: action.strain.entries
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

        // ----------FETCH ENTRIES-------  *****************************

        case 'FETCH_SMOKELISTS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_SMOKELISTS_SUCCESS':
            const data0 = action.smokeLists 
            const sorted0 = data0.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            return {
                ...state,
                fetching: false,
                allSmokeLists: action.entries,
                selectedEntriesForSmokeList: [...sorted0]
            }
        case 'FETCH_SMOKELISTS_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------ADD ENTRY-------  *****************************

        case 'POST_SMOKELIST_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_SMOKELIST_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'POST_SMOKELIST_SUCCESS':
            const data1 = [...state.selectedEntriesForSmokeList, action.smokeList]
            const sorted1 = data1.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

            return {
                ...state,
                fetching: false,
                allSmokeLists: [...state.allSmokeLists, action.smokeList],
                selectedEntriesForSmokeList: [...sorted1]
                // selectedStrain: action.strain
            }

        // ----------PATCH ENTRY-------  *****************************


        case 'PATCH_SMOKELIST_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_SMOKELIST_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'PATCH_SMOKELIST_SUCCESS':
            const data = [...[...state.selectedEntriesForSmokeList.filter(entry => entry.id != action.entry.id)], action.entry]
            
            const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            
            return {
                ...state,
                fetching: false,
                allSmokeLists: [...[...state.allSmokeLists.filter(entry => entry.id != action.entry.id)], action.entry],
                selectedEntriesForSmokeList: [...sorted]
                // [...state.allSmokeLists, action.entry],
                // selectedStrain: action.strain
            }

        // ----------DELETE ENTRY-------  *****************************

        case 'DELETE_SMOKELIST_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_SMOKELIST_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'DELETE_SMOKELIST_SUCCESS':

            return {
                ...state,
                fetching: false,
                allSmokeLists: state.allSmokeLists.filter(entry => entry.id != action.entryId),
                // gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            }


        default:
            return state
    }
}

export default smokeListReducer