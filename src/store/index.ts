import {configureStore} from "@reduxjs/toolkit";
import SubjectSlice from "./reducers/subjectSlice";
import TaskSlice from "./reducers/taskSlice";


const store = configureStore({
    reducer: {
        subject: SubjectSlice.reducer,
        task: TaskSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;