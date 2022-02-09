import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResLogin, IUser } from './interface';
import axios from 'axios';
import { server } from "@utils/costants"
import moment from "moment";





export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (user: IUser, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/users/register`, { ...user })
            if (res.status === 201 && res.statusText === "Created") {
                return res.data
            } else {
                return thunkAPI.rejectWithValue(res.data)
            }

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (user: IUser, thunkAPI) => {
        try {
            const res = await axios.post(`${server}/users/login`, { ...user });
            if (res.status === 200 && res.statusText === "OK") {
                const { token, expiresIn } = res.data as IResLogin;
                const expires = moment().add(Number.parseInt(expiresIn), "days");
                localStorage.setItem("token", token);
                localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
                return res.data
            } else {
                return thunkAPI.rejectWithValue(res.data)
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const checkUser = createAsyncThunk(
    "users/check",
    async () => {
        try {
            const res = await axios.get(`${server}/users/check`, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            });
            return res.data
        } catch (error: any) {
            return error.response.data
        }
    })



export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.delete(`${server}/users`, {
                headers: { Authorization: localStorage.getItem("token") ?? "null" },
            });
            if (res.status === 200 && res.statusText === "OK") {
                return res.data
            } else {
                return thunkAPI.rejectWithValue(res.data)
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


