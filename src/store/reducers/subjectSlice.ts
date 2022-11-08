import Color from "../../types/Color";
import Subject from "../../types/Subject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SubjectState {
    colors: Color[],
    subjects: Subject[],
    isLoading: boolean,
    searchingValue: string,
    randomColor: Color,
    isModalOpen: boolean,
    isDeleteMode: boolean,
    isSearchModalOpen: boolean
}

const initialState: SubjectState = {
    colors: [],
    subjects: [],
    isLoading: false,
    searchingValue: "",
    randomColor: {backgroundColor: "", fontColor: "", _id: ""},
    isModalOpen: false,
    isDeleteMode: false,
    isSearchModalOpen: false
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
        setSearchingValue: (state: SubjectState, action: PayloadAction<string>) => {
            state.searchingValue = action.payload;
        },
        setRandomColor: (state: SubjectState, action: PayloadAction<Color>) => {
            state.randomColor = action.payload;
        },
        setIsModalOpen: (state: SubjectState, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setIsDeleteMode: (state: SubjectState, action: PayloadAction<boolean>) => {
            state.isDeleteMode = action.payload;
        },
        setIsSearchModalOpen: (state: SubjectState, action: PayloadAction<boolean>) => {
            state.isSearchModalOpen = action.payload;
        }
    }
});

export default SubjectSlice;