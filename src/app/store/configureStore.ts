import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../pages/home/accountSlice";
import flipCardSlice from "../../cards/slices/flipCardSlice";
import multiCardSlice from "../../cards/slices/multiCardSlice";
import {gameSlice} from "../../cards/slices/gameSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        flipCard: flipCardSlice,
        multiCard: multiCardSlice,
        game: gameSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;