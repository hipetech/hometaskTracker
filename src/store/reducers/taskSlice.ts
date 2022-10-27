import Subject from "../../types/Subject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TaskState {
    subject: Subject,
    isFormOpen: boolean
}

const initialState: TaskState = {
    subject: {_id: "", name: "", tasks: [], colors: {_id: "", backgroundColor: "", fontColor: ""}, teachers: []},
    isFormOpen: false
};

const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setSubject: (state: TaskState, action: PayloadAction<Subject>) => {
            state.subject = action.payload;
        },
        setIsFormOpen: (state: TaskState, action: PayloadAction<boolean>) => {
            state.isFormOpen = action.payload;
        }
    }
});

export default TaskSlice;

