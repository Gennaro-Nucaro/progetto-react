import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItemBanList } from './interface';
import axios from 'axios';
import { server } from "@utils/costants"


export const getBanlist = createAsyncThunk(
    "banlist/getBanlist",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.get(`${server}/banlist`, {
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

export const addItemBanlist = createAsyncThunk(
    "banlist/addItemItemBanlist",
    async (item: IItemBanList, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/banlist`, { ...item }, {
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



export const deleteItemBanlist = createAsyncThunk(
    "banlist/deleteItemBanlist",
    async (id: string, thunkAPI) => {
        try {
            const res = await axios.delete(`${server}/banlist/${id}`, {
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






