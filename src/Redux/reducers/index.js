import { combineReducers } from "redux";
import strainReducer from "./strainReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import collectionReducer from "./collectionReducer";
import entriesReducer from "./entriesReducer";
import vendorsReducer from "./vendorsReducer";
import smokeListReducer from "./smokeListReducer";
import commentsReducer from "./commentsReducer";
import likesReducer from "./likesReducer";
import tagsReducer from "./tagReducer";
import tourReducer from "./tourReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  strains: strainReducer,
  collection: collectionReducer,
  entries: entriesReducer,
  vendors: vendorsReducer,
  smokeLists: smokeListReducer,
  comments: commentsReducer,
  likes: likesReducer,
  tags: tagsReducer,
  tour: tourReducer,
});

export default rootReducer;
