import {TypedUseSelectorHook, useSelector} from "react-redux";
import rootReducer from "../store/reducers";

export const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;