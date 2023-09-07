import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurger } from "../../types";

//@ts-ignore
// const burgerFromLocalStorage = JSON.parse(localStorage.getItem("burger"));
// console.log("burgerFromLocalStorage", burgerFromLocalStorage);


const myState: IBurger[] = []

export const burgerToCart = createSlice({
    name: "burgerInCart",
    initialState: myState,
    reducers: {
        /* Работающий вариант, когда нет ЛОкалСторейдж начало*/
        addBurgerToCart: (state, action: PayloadAction<IBurger>) => {
            return [...state, action.payload]
        },

        deleteBurgerFromCart: (state, action) => {
            return state = state.filter(item => item.id !== action.payload)
        }
    },

}
)

export const { addBurgerToCart, deleteBurgerFromCart } = burgerToCart.actions;

export default burgerToCart.reducer