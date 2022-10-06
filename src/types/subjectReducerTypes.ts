import Color from "./Color";
import Subject from "./Subject";

export interface SubjectState {
    colors: Color[],
    subjects: Subject[],
    isLoading: boolean,
    isSearching: boolean,
}

export enum SubjectActionTypes {
    SET_COLORS = "SET_COLORS",
    SET_SUBJECTS = "SET_SUBJECTS",
    SET_IS_SEARCHING = "SET_IS_SEARCHING",
    SET_IS_LOADING = "SET_IS_LOADING"
}

export interface setColoursAction {
    type: SubjectActionTypes.SET_COLORS,
    payload: Color[]
}

export interface setSubjectsAction {
    type: SubjectActionTypes.SET_SUBJECTS,
    payload: Subject[]
}

export interface setIsSearchingAction {
    type: SubjectActionTypes.SET_IS_SEARCHING,
    payload: boolean
}

export interface setIsLoadingAction {
    type: SubjectActionTypes.SET_IS_LOADING,
    payload: boolean
}

export type SubjectAction = setColoursAction | setSubjectsAction | setIsSearchingAction | setIsLoadingAction