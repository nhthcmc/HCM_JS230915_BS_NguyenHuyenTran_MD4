import { createSlice } from "@reduxjs/toolkit";

export type task = {
    id: number;
    name: string;
    status: boolean;

}
interface InitState {
    data: task | null,
}
let initialState: InitState = {
    data: null,
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        create: (state, action) => {
            state.data.push(action.payload);
        },
        update: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id == action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            })
        },
        delete: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload);
        },
    }
})

export const taskReducer = taskSlice.reducer;
export const taskAction = taskSlice.actions;