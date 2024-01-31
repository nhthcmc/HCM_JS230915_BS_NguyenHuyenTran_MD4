import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./slices/task.slice";

const RootReducer = combineReducers({
    taskStore: taskReducer
})
export type Store = ReturnType<typeof RootReducer>
export const store = configureStore({
    reducer: RootReducer
})