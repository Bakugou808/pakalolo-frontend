const initialState = {
    selectedStrainsEntries: [],
    fetching: false,
    error: false,
    selectedEntry: null,
    snackBarSuccessDisplay: false,
    allEntries: [],
    tableRowCount: 0,
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

        // ----------FETCH ENTRIES-------  *****************************

        case 'FETCH_ENTRIES_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_ENTRIES_SUCCESS':
            const data0 = action.entries 
            const sorted0 = data0.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            return {
                ...state,
                fetching: false,
                allEntries: action.entries,
                // selectedStrainsEntries: [...sorted0]
            }
        case 'FETCH_ENTRIES_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------ADD ENTRY-------  *****************************

        case 'POST_ENTRY_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_ENTRY_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'POST_ENTRY_SUCCESS':
            const data1 = [...state.selectedStrainsEntries, action.entry]
            const sorted1 = data1.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

            return {
                ...state,
                fetching: false,
                allEntries: [...state.allEntries, action.entry],
                selectedStrainsEntries: [...sorted1]
                // selectedStrain: action.strain
            }

        // ----------PATCH ENTRY-------  *****************************


        case 'PATCH_ENTRY_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_ENTRY_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'PATCH_ENTRY_SUCCESS':
            const data = [...[...state.selectedStrainsEntries.filter(entry => entry.id != action.entry.id)], action.entry]
            
            const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            const AllEntriesData = [...[...state.allEntries.filter(entry => entry.id != action.entry.id)], action.entry]
            
            const sortedAE = AllEntriesData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            
            return {
                ...state,
                fetching: false,
                allEntries: [...sortedAE],
                selectedStrainsEntries: [...sorted]
                // [...state.allEntries, action.entry],
                // selectedStrain: action.strain
            }

        // ----------DELETE ENTRY-------  *****************************

        case 'DELETE_ENTRY_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_ENTRY_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'DELETE_ENTRY_SUCCESS':

            return {
                ...state,
                fetching: false,
                allEntries: state.allEntries.filter(entry => entry.id != action.entryId.id),
                selectedStrainsEntries: state.selectedStrainsEntries.filter(entry => entry.id != action.entryId.id)
                // gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            }


        default:
            return state
    }
}

export default entriesReducer