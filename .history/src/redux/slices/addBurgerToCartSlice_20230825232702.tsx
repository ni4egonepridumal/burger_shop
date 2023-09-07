import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurger } from "../../types";

//@ts-ignore
const burgerFromLokalStore = JSON.parse(localStorage.getItem("burger"));
const objBurger = {};
burgerFromLokalStore.forEach((element: IBurger) => {
    //@ts-ignore
    objBurger[element.id] = element;
});
console.log(objBurger)


const myState: IBurger[] = []

export const burgerToCart = createSlice({
    name: "burgerInCart",
    initialState: myState,
    reducers: {
        addBurgerToCart: (state, action: PayloadAction<IBurger>) => {
            const newState = [...state, action.payload]
            window.localStorage.setItem('burger', JSON.stringify(newState))
            return newState;
        },
        deleteBurgerFromCart: (state, action) => {
            console.log(burgerFromLokalStore)
            const stateAfterDelete = state.filter(item => item.id !== action.payload)
            const arr = burgerFromLokalStore.filter(item => item.id !== action.payload)
            console.log(arr)
            window.localStorage.setItem('burger', JSON.stringify(stateAfterDelete))
            return stateAfterDelete
        }
    }
})

export const { addBurgerToCart, deleteBurgerFromCart } = burgerToCart.actions;

export default burgerToCart.reducer