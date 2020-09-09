const initialState = {
    totalCollection: [],
    fetching: false,
    error: false,
    selectedStrain: null,
    snackBarSuccessDisplay: false,
    reRender: false
}

const collectionReducer = (state = initialState, action) => {


    switch (action.type) {

        // ----------****** UI ACTIONS ******-----------

        case 'SET_STRAIN_DISPLAY':
            let strain = state.totalCollection.filter(collection => collection.strain.id === action.strain.id)

            return {
                ...state,
                selectedStrain: strain[0]
            }

        case 'DISPLAY_SNACKBAR_ADD_SUCCESS':
            return {
                ...state,
                snackBarSuccessDisplay: action.payload
            }
        case 'CLOSE_DISPLAY_SNACKBAR_ADD_SUCCESS':
            return {
                ...state,
                snackBarSuccessDisplay: action.payload
            }
        case 'POST_ENTRY_SUCCESS':
            let target = state.totalCollection.filter(collection => collection.id === action.entry.collection.id)[0]
            let container = target
            let data = [...target.entries, action.entry]
            const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            target.entries = sorted
            // const newCollection = [...[...state.totalCollection.filter(collection => collection.id != target.id)], target]
            let idx = state.totalCollection.indexOf(container)
            const newCollection = state.totalCollection
            newCollection[idx].entries = sorted 
            // const newCollection = state.totalCollection[idx].entries = sorted 
            
            return {
                ...state,
                totalCollection: newCollection,
                reRender: true
            }
        case 'ADD_ENTRY_TO_SUB_ENTRY_TABLE_PATCH':
            let target1 = state.totalCollection.filter(collection => collection.id === action.entry.collection.id)[0]
            let container1 = target1
            let data1 = [...target1.entries.filter(entry => entry.id != action.entry.id), action.entry]
            const sorted1 = data1.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            target1.entries = sorted1
            let idx1 = state.totalCollection.indexOf(container1)

            const newCollection1 = state.totalCollection 
            newCollection1[idx1].entries = sorted1
            
            
            return {
                ...state,
                totalCollection: newCollection1,
                reRender: true

            }

 
        case 'POST_TAG_SUCCESS':
            let targetPostTag = state.selectedStrain
            
            let dataPostTag = [...targetPostTag.tags, action.tag]
            const sortedPostTag = dataPostTag.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            targetPostTag.tags = sortedPostTag
            const newCollectionTagPost = [...[...state.totalCollection.filter(collection => collection.id != targetPostTag.id)], targetPostTag]
            
            
            return {
                ...state,
                totalCollection: newCollectionTagPost
            }

        case 'DELETE_TAG_SUCCESS':
            let target2 = state.selectedStrain
            
            let tagData = [...target2.tags.filter(tag => tag.id != action.tagId)]
            const sortedTags = tagData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            target2.tags = sortedTags
            const newCollectionTAGS = [...[...state.totalCollection.filter(collection => collection.id != target2.id)], target2]
            
            
            return {
                ...state,
                totalCollection: newCollectionTAGS
            }


        // ----------****** ASYNC ACTIONS ******-----------
        case 'FETCH_COLLECTION_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_COLLECTION_SUCCESS':

            return {
                ...state,
                fetching: false,
                totalCollection: action.collection
            }
        case 'FETCH_COLLECTION_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }


        case 'POST_STRAIN_TO_COLLECTION_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_STRAIN_TO_COLLECTION_FAILURE':

            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'POST_STRAIN_TO_COLLECTION_SUCCESS':

            return {
                ...state,
                fetching: false,
                // totalCollection: [...state.totalCollection, action.strain],
                // selectedStrain: action.strain
            }

        default:
            return state
    }
}

export default collectionReducer