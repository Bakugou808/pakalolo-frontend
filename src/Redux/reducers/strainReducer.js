
const initialState = {
    allStrains: [],
    fetching: false,
    error: false,
    selectedStrain: [],
}

const strainReducer = (state=initialState, action) => {


    switch(action.type){

        case 'FETCH_STRAINS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_STRAINS_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                allStrains: action.strains
            }    
        case 'FETCH_STRAINS_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 

        case 'FETCH_STRAIN_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_STRAIN_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                selectedStrain: action.strain
            }    
        case 'FETCH_STRAIN_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 



        default:
            return state
    }
}

export default strainReducer