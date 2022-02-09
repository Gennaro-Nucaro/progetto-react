import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItemWatchList } from './interface';
import axios from 'axios';
import { server } from "@utils/costants"

export const getWatchlist = createAsyncThunk(
    "watchlist/getWatchlist",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.get(`${server}/watchlist`, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            })
            if (res.status === 200 && res.statusText === "OK") {
                return res.data
            } else {
                thunkAPI.rejectWithValue(res.data)
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const addItemWatchlist = createAsyncThunk(
    "watchlist/addItemItemWatchlist",
    async (item: IItemWatchList, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/watchlist`, { ...item }, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            })
            if (res.status === 200 && res.statusText === "OK") {
                return item
            }
            return item
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



export const deleteItemWatchlist = createAsyncThunk(
    "watchlist/deleteItemWatchlist",
    async (id: string, thunkAPI) => {
        try {
            const res = await axios.delete(`${server}/watchlist/${id}`, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            })
            if (res.status === 200 && res.statusText === "OK") {
                return id
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)






