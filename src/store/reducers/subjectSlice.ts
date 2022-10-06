import Color from "../../types/Color";
import Subject from "../../types/Subject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SubjectState {
    colors: Color[],
    subjects: Subject[],
    isLoading: boolean,
    isSearching: boolean,
}

const initialState: SubjectState = {
    colors: [],
    subjects: [],
    isLoading: false,
    isSearching: false
};

const SubjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setColors: (state: SubjectState, action: PayloadAction<Color[]>) => {
            state.colors = action.payload;
        },
        setSubjects: (state: SubjectState, action: PayloadAction<Subject[]>) => {
            state.subjects = action.payload;
        },
        setIsLoading: (state: SubjectState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsSearching: (state: SubjectState, action: PayloadAction<boolean>) => {
            state.isSearching = action.payload;
        }
    }
});

export default SubjectSlice;