import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import AppReducer from "../app/redux/AppReducer";

const rootReducer = combineReducers({
    app: AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;