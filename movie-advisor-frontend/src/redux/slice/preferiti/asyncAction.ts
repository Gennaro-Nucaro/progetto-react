import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItemPreferiti } from './interface';
import axios from 'axios';
import { server } from "@utils/costants"





export const getPreferiti = createAsyncThunk(
    "preferiti/getPreferiti",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.get(`${server}/preferiti`, {
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

export const addItemPreferiti = createAsyncThunk(
    "preferiti/addItemPreferiti",
    async (item: IItemPreferiti, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/preferiti`, { ...item }, {
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



export const deleteItemPreferiti = createAsyncThunk(
    "preferiti/deleteItemPreferiti",
    async (id: string, thunkAPI) => {
        try {
            const res = await axios.delete(`${server}/preferiti/${id}`, {
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






