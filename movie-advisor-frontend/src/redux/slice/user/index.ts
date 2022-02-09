import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IStateUser, IResRegister, IResLogin, IResLoginError, IResCheck, IResDelete } from './interface';
import { registerUser, loginUser, checkUser, deleteUser } from './asyncAction';


const initialState: IStateUser = {
    username: "",
    email: "",
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearStateUser: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

            return state;
        }
        , clearUser: (state) => {
            state.username = "";
            state.email = "";
        }
    },
    extraReducers: (builder) => {
        //REGISTER USER 
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            const { msg, success } = payload as IResRegister;
            state.loading = false;
            state.isSuccess = success;
            state.message = msg;

        })
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            const { msg } = payload as IResRegister;
            state.loading = false;
            state.isSuccess = false;
            state.message = msg ?? "error server";
        })
        // LOGIN USER 
        builder.addCase(loginUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            const { success, username, email, msg } = payload as IResLogin;
            state.loading = false;
            state.email = email;
            state.isSuccess = success;
            state.username = username;
            state.message = msg;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            const { msg } = action.payload as IResLoginError;

            state.loading = false;
            state.isSuccess = false;
            state.message = msg ?? "error server";

        })
        //CHECK USER
        builder.addCase(checkUser.fulfilled, (state, { payload }) => {
            const { username, email } = payload as IResCheck;
            state.email = email;
            state.username = username;
        })
        //DELETE USER
        builder.addCase(deleteUser.pending, (state, { payload }) => {
            state.loading = true;
        })

        builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
            const { success, msg } = payload as IResDelete;
            state.loading = false;
            state.isSuccess = success;
            state.message = msg;
        })

        builder.addCase(deleteUser.rejected, (state, { payload }) => {
            const { msg } = payload as IResDelete;
            state.loading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = msg;
        })
    }
});

export const { clearStateUser, clearUser } = userSlice.actions;

export const userState = (state: RootState) => state.user;
export const usermameSelector = (state: RootState) => state.user.username;

export default userSlice.reducer;

