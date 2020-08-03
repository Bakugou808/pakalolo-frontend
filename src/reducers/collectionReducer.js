const initialState = {
    totalCollection: [],
    fetching: false,
    error: false,
    selectedStrain: null,
}

const collectionReducer = (state=initialState, action) => {


    switch(action.type){

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

        case 'SET_STRAIN_DISPLAY':
            return {
                ...state,
                selectedStrain: action.strain
            }
        // case 'FETCH_STRAIN_SUCCESS':
            
        //     return {
        //         ...state,
        //         fetching: false, 
        //         selectedStrain: action.strain
        //     }    
        // case 'FETCH_STRAIN_FAILURE':
        
        //     return {
        //         ...state,
        //         fetching: false, 
        //         error: action.error
        //     } 



        default:
            return state
    }
}

export default collectionReducer