import {configureStore} from "@reduxjs/toolkit";
import SubjectSlice from "./reducers/subjectSlice";


const store = configureStore({
    reducer: {
        subject: SubjectSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;