import { createStore, applyMiddleware, combineReducers } from "redux"
import { thunk } from "redux-thunk"
import userReducer from "./reducers/fetchUser"
import { sidebarReducer } from "./reducers/sidebarReducer"

const rootReducers = combineReducers({ userReducer, sidebarReducer })

export const store = createStore(rootReducers, applyMiddleware(thunk))