import { combineReducers } from 'redux';
import strainReducer from './strainReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import collectionReducer from './collectionReducer'
import entriesReducer from './entriesReducer'
import vendorsReducer from './vendorsReducer'
import smokeListReducer from './smokeListReducer'

const rootReducer = combineReducers({
    user: userReducer,
    authorized: authReducer,
    strains: strainReducer,
    collection: collectionReducer,
    entries: entriesReducer,
    vendors: vendorsReducer,
    smokeLists: smokeListReducer,
});
 
export default rootReducer