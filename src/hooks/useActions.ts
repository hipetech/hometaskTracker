import {bindActionCreators} from "redux";
import SubjectSlice from "../store/reducers/subjectSlice";
import {useAppDispatch} from "./useAppDispatch";

const actions = {
    ...SubjectSlice.actions
};

export const useActions = (): any => {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch);
};

