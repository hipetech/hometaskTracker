import {
    setColoursAction,
    setIsLoadingAction,
    setSubjectsAction,
    SubjectActionTypes
} from "../../types/subjectReducerTypes";
import Color from "../../types/Color";
import Subject from "../../types/Subject";

export const setColors = (colors: Color[]): setColoursAction => {
    return {
        type: SubjectActionTypes.SET_COLORS,
        payload: colors
    };
};

export const setSubjects = (subjects: Subject[]): setSubjectsAction => {
    return  {
        type: SubjectActionTypes.SET_SUBJECTS,
        payload: subjects
    };
};

export const setIsLoading = (isLoading: boolean): setIsLoadingAction => {
    return {
        type: SubjectActionTypes.SET_IS_LOADING,
        payload: isLoading
    };
};

