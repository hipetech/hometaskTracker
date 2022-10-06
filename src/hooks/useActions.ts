import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as subjectActions from "../store/actions/subjectActions";

const actions = {
    ...subjectActions
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

