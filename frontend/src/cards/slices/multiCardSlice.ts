import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MultiCardModel } from "../../app/models/MultiCardModel";
import agent from "../../app/api/agent";

interface MultiCardState{
    multiCard: MultiCardModel | null
}

const initialState: MultiCardState = {
    multiCard: null
}

const multiCardSlice = createSlice({
    name: "multiCard",
    initialState: initialState,
    reducers:{}
})

export const fetchPublicCategories = createAsyncThunk<MultiCardModel>(
    'MultiCards/pblicCateg',
    async () => {
        try {
            return await agent.MultiCards.getPublicCategs();
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchCardsOfCateg = createAsyncThunk<MultiCardModel, {category: string}>(
    "MultiCards/privateCateg",
    async ({category}) => {
        try {
            return await agent.MultiCards.getCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchUserCategories = createAsyncThunk<MultiCardModel, {id: number}>(
    "MultiCards/privateCategs",
    async({id}) => {
        try {
            return await agent.MultiCards.getUserCategs(id);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchPublicCards = createAsyncThunk<MultiCardModel, {category: string}>(
    "MultiCards/public",
    async ({category}) => {
        try {
            return await agent.MultiCards.getPublicCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchCardsWithLimit = createAsyncThunk<MultiCardModel, {category: string, limit: number}>(
    "MultiCards",
    async({category, limit}) => {
        try {
           return await agent.MultiCards.getLimitedCards(category, limit) 
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchNumberOfCards = createAsyncThunk<MultiCardModel, {category: string}>(
    "MultiCards/count",
    async({category}) => {
        try {
            return await agent.MultiCards.getNumberOfCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchNumberOfPrivCards = createAsyncThunk<MultiCardModel, {category: string}>(
    "MultiCards/countPriv",
    async({category}) => {
        try {
            return await agent.MultiCards.getNumberOfPrivCards(category);
        } catch (error) {
            console.log(error);
        }
    }
)
export default multiCardSlice.reducer