import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    points: 0
}

export const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers:{
        increment:(state, action) =>{
            state.points += action.payload; 
        },
        reset:(state) => {
            state.points = 0;
        }

    }
})

export const {increment, reset} = gameSlice.actions;