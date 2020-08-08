import { combineReducers } from 'redux';
import strainReducer from './strainReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import collectionReducer from './collectionReducer'
import entriesReducer from './entriesReducer'

const rootReducer = combineReducers({
    user: userReducer,
    authorized: authReducer,
    strains: strainReducer,
    collection: collectionReducer,
    entries: entriesReducer,
});
 
export default rootReducer