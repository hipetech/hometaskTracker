import {combineReducers} from "redux";
import subjectReducer from "./subjectReducer";

const rootReducer = combineReducers({
    subject: subjectReducer
});

export default rootReducer;