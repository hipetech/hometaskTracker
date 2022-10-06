import {bindActionCreators} from "redux";
import SubjectSlice from "../store/reducers/subjectSlice";
import {useAppDispatch} from "./useAppDispatch";

const actions = {
    ...SubjectSlice.actions
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch);
};

