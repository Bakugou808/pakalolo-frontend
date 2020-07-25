import { combineReducers } from 'redux';
import strainReducer from './strainReducer'

const rootReducer = combineReducers({
    // user: userReducer,
    // authorized: authReducer,
    strains: strainReducer
   
});
 
export default rootReducer