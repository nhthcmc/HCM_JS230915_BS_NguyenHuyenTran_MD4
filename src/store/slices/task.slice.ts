import { createSlice } from "@reduxjs/toolkit";

enum Status {
    "completed" = "completed",
    "uncompleted" = "uncompleted"
}
export type Task = {
    id: number;
    name: string;
    status: Status;
}
interface InitState {
    task: Task[] | null,
}
let initialState: InitState = {
    task: [],
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.task = action.payload;
        },
        create: (state, action) => {
            state.task.push(action.payload);
        },
        update: (state, action) => {
            state.task = state.task.map((item) => {
                if (item.id == action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            })
        },
        delete: (state, action) => {
            state.task = state.task.filter((item) => item.id != action.payload);
        },
    }
})

export const taskReducer = taskSlice.reducer;
export const taskAction = taskSlice.actions;