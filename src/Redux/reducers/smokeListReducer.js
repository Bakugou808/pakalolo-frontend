const initialState = {
    selectedEntriesForSmokeList: [],
    fetching: false,
    error: false,
    selectedSmokeList: null,
    snackBarSuccessDisplay: false,
    allSmokeLists: [],
    showSmokeList: false
}

const smokeListReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------
        case 'SHOW_SMOKELIST_ON_PAGE':
            return {
                ...state,
                showSmokeList: action.payload
            }

        case 'SET_SMOKELIST_DISPLAY':
            return {
                ...state,
                selectedSmokeList: action.smokeList,
            }
        case 'SET_SELECTED_SMOKELISTS_ENTRIES':
            return {
                ...state,
                selectedEntriesForSmokeList: action.entries
            }
        case 'SET_SELECTED_SMOKELIST':
            return {
                ...state,
                selectedSmokeList: action.smokeList
            }
        case 'POST_SMOKELISTENTRY_SUCCESS':

            // const dataSLE = [...state.selectedEntriesForSmokeList, action.smokeListEntry]
            // const sortedSLE = dataSLE.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            // const SSL = state.selectedSmokeList
            // SSL.entries = sortedSLE
            if (state.selectedSmokeList) {
                const dataSLE = [...state.selectedEntriesForSmokeList, action.smokeListEntry]
                const sortedSLE = dataSLE.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                const SSL = state.selectedSmokeList
                SSL.entries = sortedSLE
                return {
                    ...state,
                    selectedEntriesForSmokeList: [...state.selectedEntriesForSmokeList, action.smokeListEntry],
                    selectedSmokeList: SSL
                }
            } 
            // else if(action.page === 'entries page' || action.page === 'collection'){
            //     return {
            //         ...state,
            //         selectedEntriesForSmokeList: [...state.selectedEntriesForSmokeList, action.smokeListEntry],
            //     }
            // }
        case 'POST_SMOKELISTENTRY_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_SMOKELISTENTRY_FAILURE':
            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // DELETE SMOKE LIST ENTRY 
        case 'DELETE_SMOKELISTENTRY_SUCCESS':
            // const newDataSLE = state.selectedSmokeList.entries.filter(entry => entry.id != action.entryId)
            // const newSortedSLE = newDataSLE.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            // const newSSL = state.selectedSmokeList 
            // newSSL.entries = newSortedSLE 
            // state.allSmokeLists.filter(smokeList => smokeList.id != action.smokeListId),
            if (state.selectedSmokeList){
                const newDataSLE = state.selectedSmokeList.entries.filter(entry => entry.id != action.entryId)
                const newSortedSLE = newDataSLE.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                const newSSL = state.selectedSmokeList 
                newSSL.entries = newSortedSLE 
                return {
                    ...state,
                    selectedEntriesForSmokeList: [...newSortedSLE],
                    selectedSmokeList: newSSL
                }
            } 
           
        case 'DELETE_SMOKELISTENTRY_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_SMOKELISTENTRY_FAILURE':
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        // case 'SET_STRAIN_DISPLAY':
        //     return {
        //         ...state,
        //         selectedEntriesForSmokeList: action.strain.smokeLists
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

        // ----------FETCH SMOKELISTS-------  *****************************

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
                allSmokeLists: action.smokeLists,
                // selectedEntriesForSmokeList: [...sorted0]
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
            // const data1 = [...state.selectedEntriesForSmokeList, action.smokeList]
            // const sorted1 = data1.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

            return {
                ...state,
                fetching: false,
                allSmokeLists: [...state.allSmokeLists, action.smokeList],
                selectedSmokeList: action.smokeList,
                showSmokeList: true
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
            const data = action.smokeList.entries

            const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

            return {
                ...state,
                fetching: false,
                allSmokeLists: [...[...state.allSmokeLists.filter(smokeList => smokeList.id != action.smokeList.id)], action.smokeList],
                selectedEntriesForSmokeList: [...sorted],
                selectedSmokeList: action.smokeList, 
                showSmokeList: true
                // [...state.allSmokeLists, action.smokeList],
                // selectedStrain: action.strain
            }

        case 'ADD_ENTRY_TO_SMOKELIST_PAGE':
            let add = false
            
            state.selectedEntriesForSmokeList.forEach(entry => entry.id === action.entry.id && (add = true))
            
            if (add){
                
                const dataa = [...[...state.selectedEntriesForSmokeList.filter(entry => entry.id != action.entry.id)], action.entry]

                const sortedd = dataa.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

                return {
                    ...state,
                    fetching: false,
                    selectedEntriesForSmokeList: [...sortedd]
                }
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
                allSmokeLists: state.allSmokeLists.filter(smokeList => smokeList.id != action.smokeListId.id),
                selectedSmokeList: [],
                selectedEntriesForSmokeList: []
                // gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            }


        default:
            return state
    }
}

export default smokeListReducer