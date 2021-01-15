const initialState = {
    fetching: false,
    error: false,
    allTags: [],
    selectedStrainsTags: [],
    matchingStrains: []
}

const tagsReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        case 'SET_TAG_DISPLAY':
            return {
                ...state,
                selectedTag: action.tag
            }
        case 'SET_SELECTED_STRAINS_TAGS':
            return {
                ...state,
                selectedStrainsTags: action.tags
            }

        // ----------****** ASYNC ACTIONS ******-----------


        // ----------FETCH STRAINS WITH TAG-------  *****************************

        case 'FETCH_STRAINS_WITH_TAG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_STRAINS_WITH_TAG_SUCCESS':
            const data0 = action.tags 
            const sorted0 = data0.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            return {
                ...state,
                fetching: false,
                matchingStrains: [...sorted0]
            }
        case 'FETCH_STRAINS_WITH_TAG_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------FETCH TAGS-------  *****************************

        case 'FETCH_TAGS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_TAGS_SUCCESS':
            const data00 = action.tags 
            const sorted00 = data00.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            return {
                ...state,
                fetching: false,
                allTags: action.tags,
                selectedStrainsTags: [...sorted00]
            }
        case 'FETCH_TAGS_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }

        // ----------ADD TAG-------  *****************************

        case 'POST_TAG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_TAG_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        // case 'POST_TAG_SUCCESS':
        //     const data1 = [...state.selectedStrainsTags, action.tag]
        //     const sorted1 = data1.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        //     return {
        //         ...state,
        //         fetching: false,
        //         allTags: [...state.allTags, action.tag],
        //         selectedStrainsTags: [...sorted1]
        //         // selectedStrain: action.strain
        //     }

        // ----------PATCH TAG-------  *****************************


        case 'PATCH_TAG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_TAG_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'PATCH_TAG_SUCCESS':
            const data = [...[...state.selectedStrainsTags.filter(tag => tag.id != action.tag.id)], action.tag]
            
            const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            
            return {
                ...state,
                fetching: false,
                allTags: [...[...state.allTags.filter(tag => tag.id != action.tag.id)], action.tag],
                selectedStrainsTags: [...sorted]
                // [...state.allTags, action.tag],
                // selectedStrain: action.strain
            }

        // ----------DELETE TAG-------  *****************************

        case 'DELETE_TAG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_TAG_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        // case 'DELETE_TAG_SUCCESS':

        //     return {
        //         ...state,
        //         fetching: false,
        //         allTags: state.allTags.filter(tag => tag.id != action.tagId.id),
        //         selectedStrainsTags: state.selectedStrainsTags.filter(tag => tag.id != action.tagId.id)
        //     }


        default:
            return state
    }
}

export default tagsReducer