import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurger } from "../../types";


const myState: IBurger[] = []

export const aboutBurger = createSlice({
    name: "aboutBurger",
    initialState: myState,
    reducers: {
        moreAboutBurger: (state: IBurger[], action: PayloadAction<IBurger>): IBurger[] => {
            state = [action.payload];
            return state
        },
    },
});

export const { moreAboutBurger } = aboutBurger.actions;

export default aboutBurger.reducer;

