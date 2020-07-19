import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    user: userReducer,
    authorized: authReducer,
   
});
 
export default rootReducer