import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResGetStats, payloadAddItemStats } from './interface';
import axios from 'axios';
import { server } from "@utils/costants"





export const getStats = createAsyncThunk(
    "statistiche/getStats",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.get<IResGetStats>(`${server}/statistiche`, {
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

export const addItemStats = createAsyncThunk(
    "statistiche/addItemItemStats",
    async (item: payloadAddItemStats, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/statistiche`, { ...item }, {
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


export const deleteItemStats = createAsyncThunk(
    "statistiche/deleteItemStats",
    async (item: payloadAddItemStats, thunkAPI) => {
        try {
            const res = await axios.put(`${server}/statistiche`,  { ...item }, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            })
            if (res.status === 200 && res.statusText === "OK") {
                return item
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)






