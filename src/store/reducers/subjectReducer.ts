import {SubjectAction, SubjectActionTypes, SubjectState} from "../../types/subjectReducerTypes";

const initialState: SubjectState = {
    colors: [],
    subjects: [],
    isLoading: false,
    isSearching: false
};

const subjectReducer  = (state: SubjectState = initialState, action: SubjectAction): SubjectState => {
    switch (action.type) {
        case SubjectActionTypes.SET_COLORS:
            return {...state, colors: action.payload};
        case SubjectActionTypes.SET_SUBJECTS:
            return {...state, subjects: action.payload};
        case SubjectActionTypes.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        case SubjectActionTypes.SET_IS_SEARCHING:
            return {...state, isSearching: action.payload};
        default: return state;
    }
};

export default subjectReducer;