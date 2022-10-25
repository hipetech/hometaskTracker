import Subject from "../../types/Subject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TaskState {
    subject: Subject
}

const initialState: TaskState = {
    subject: {_id: "", name: "", tasks: [], colors: {_id: "", backgroundColor: "", fontColor: ""}, teachers: []}
};

const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setSubject: (state: TaskState, action: PayloadAction<Subject>) => {
            state.subject = action.payload;
        }
    }
});

export default TaskSlice;

