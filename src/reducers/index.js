import { combineReducers } from 'redux';
import strainReducer from './strainReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    user: userReducer,
    authorized: authReducer,
    strains: strainReducer
   
});
 
export default rootReducer