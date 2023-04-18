import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FlipCardModel } from "../../app/models/FlipCardModel"
import agent from "../../app/api/agent"

interface FlipCardState{
    flipCard: FlipCardModel | null
}

const initialState: FlipCardState = {
    flipCard: null
}

const flipCardSlice = createSlice({
    name: 'flipCard',
    initialState: initialState,
    reducers:{
    }
})

export const fetchPublicCategories = createAsyncThunk<FlipCardModel>(
    'FlipCards/publicCateg',
    async () => {
        try {
            return await agent.FlipCards.getPublicCategs();
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchCardsOfCateg = createAsyncThunk<FlipCardModel, {category: string}>(
    "FlipCards/privateCateg",
    async ({category}) => {
        try {
            return await agent.FlipCards.getCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchPublicCards = createAsyncThunk<FlipCardModel, {category: string}>(
    "FlipCards/public",
    async ({category}) => {
        try {
            return await agent.FlipCards.getPublicCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchPrivateCards = createAsyncThunk<FlipCardModel, {category: string}>(
    "FlipCards/private",
    async ({category}) => {
        try {
            return await agent.FlipCards.getPrivateCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)
export const fetchUserCategories = createAsyncThunk<FlipCardModel, {id: number}>(
    "FlipCards/privateCategs",
    async({id}) => {
        try {
            return await agent.FlipCards.getUserCategs(id);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchNumberOfCards = createAsyncThunk<FlipCardModel, {category: string}>(
    "FlipCards/count",
    async({category}) => {
        try {
            return await agent.FlipCards.getNumberOfCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchNumberOfPrivCards = createAsyncThunk<FlipCardModel, {category: string}>(
    "FlipCards/countPriv",
    async({category}) => {
        try {
            return await agent.FlipCards.getNumberOfPrivCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export default flipCardSlice.reducer
