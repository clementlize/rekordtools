import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "./RootReducer";
import rootSaga from "./RootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
export { store };
