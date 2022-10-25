import {bindActionCreators} from "redux";
import SubjectSlice from "../store/reducers/subjectSlice";
import {useAppDispatch} from "./useAppDispatch";
import TaskSlice from "../store/reducers/taskSlice";

const actions = {
    ...SubjectSlice.actions,
    ...TaskSlice.actions
};

export const useActions = (): any => {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch);
};

