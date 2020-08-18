const initialState = {
    // selectedStrainsEntries: [],
    fetching: false,
    error: false,
    // selectedEntry: null,
    // snackBarSuccessDisplay: false,
    allVendors: []
}
 
const vendorsReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        // case 'SET_ENTRY_DISPLAY':
        //     return {
        //         ...state,
        //         selectedEntry: action.entry
        //     }
        // case 'SET_SELECTED_STRAINS_ENTRIES':
        //     return {
        //         ...state,
        //         selectedStrainsEntries: action.entries
        //     }
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

        // ----------FETCH VENDORS-------  *****************************

        case 'FETCH_VENDORS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_VENDORS_SUCCESS':

            return {
                ...state,
                fetching: false,
                allVendors: action.vendors
            }
        case 'FETCH_VENDORS_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------ADD VENDOR-------  *****************************

        case 'POST_VENDOR_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_VENDOR_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'POST_VENDOR_SUCCESS':

            return {
                ...state,
                fetching: false,
                allVendors: [...state.allVendors, action.vendor],
                // selectedStrain: action.strain
            }

        // ----------PATCH VENDOR-------  *****************************


        case 'PATCH_VENDOR_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_VENDOR_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'PATCH_VENDOR_SUCCESS':

            return {
                ...state,
                fetching: false,
                allVendors: [...[...state.allVendors.filter(vendor => vendor.id != action.vendor.id)], action.vendor]
                // [...state.allEntries, action.entry],
                // selectedStrain: action.strain
            }

        // ----------DELETE ENTRY-------  *****************************

        case 'DELETE_VENDOR_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_VENDOR_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'DELETE_VENDOR_SUCCESS':

            return {
                ...state,
                fetching: false,
                allVendors: state.allVendors.filter(vendor => vendor.id != action.vendorId),
                // gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            }


        default:
            return state
    }
}

export default vendorsReducer