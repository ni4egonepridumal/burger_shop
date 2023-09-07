import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurger } from "../../types";

const myState: IBurger[] = []

export const burgerToCart = createSlice({
    name: "burgerInCart",
    initialState: myState,
    reducers: {
        addBurgerToCart: (state, action: PayloadAction<IBurger>) => {
            const getBurgerFromLocalStorage = JSON.parse(localStorage.getItem("burger"))
            if (getBurgerFromLocalStorage) {
                const addedBurgerFromLocalStorage = [...getBurgerFromLocalStorage, action.payload]
                state = addedBurgerFromLocalStorage
                localStorage.setItem("burger", JSON.stringify(addedBurgerFromLocalStorage))
                return state
            }
            else {
                const setBurgerFromLocalStore = [...state, action.payload]
                localStorage.setItem("burger", JSON.stringify(setBurgerFromLocalStore))
                return setBurgerFromLocalStore;
            }
        },

        deleteBurgerFromCart: (state, action) => {
            const getBurgerFromLocalStorage = JSON.parse(localStorage.getItem("burger"));
            if (getBurgerFromLocalStorage) {
                const filterBurger = getBurgerFromLocalStorage.filter((item: IBurger) => item.id !== action.payload)
                state = filterBurger
                localStorage.setItem("burger", JSON.stringify(filterBurger))
                return state
            } else {
                return state = state.filter(item => item.id !== action.payload)
            }

        },
        /* пробую */
        setCountBurger: (state, action: PayloadAction<number>) => {
            const getBurgerFromLocalStorage = JSON.parse(localStorage.getItem("burger"));
            if (getBurgerFromLocalStorage) {
                const countBurger = getBurgerFromLocalStorage.map((item: IBurger) => item.id === action.payload ? item.count + 1 : item.count)
                state = countBurger
                localStorage.setItem("burger", JSON.stringify(countBurger))
                console.log("сработала часть из локалстоража")
                return state
            } else {
                console.log("сработала часть из стейта")
                return state = state.map(item => item.id === action.payload ? item.count++ : item.count)
            }
        }
    },
}
)

export const { addBurgerToCart, deleteBurgerFromCart, setCountBurger } = burgerToCart.actions;

export default burgerToCart.reducer