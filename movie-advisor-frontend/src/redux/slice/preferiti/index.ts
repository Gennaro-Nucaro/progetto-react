import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IPreferitiStore, IResGetPreferiti, IItemPreferiti } from './interface';
import { getPreferiti, deleteItemPreferiti, addItemPreferiti } from './asyncAction';


const initialState: IPreferitiStore = {
    preferiti: [],
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};

export const preferitiSlime = createSlice({
    name: 'preferiti',
    initialState,
    reducers: {
        clearStatePrefetiti: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

            return state;
        }
    },
    extraReducers: (builder) => {
        //GET PREFERITI
        builder.addCase(getPreferiti.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getPreferiti.fulfilled, (state, { payload }) => {
            const { res, success } = payload as IResGetPreferiti;
            state.loading = false;
            state.isSuccess = success;
            state.preferiti = res.items;
        })

        builder.addCase(getPreferiti.rejected, (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = true;
        })
        // DELETE ITEM 
        builder.addCase(deleteItemPreferiti.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.preferiti = state.preferiti.filter((ele) => ele.idFilm !== payload)
        })
        builder.addCase(deleteItemPreferiti.rejected, (state) => {
            state.loading = false;
            state.isError = true
        })
        //ADD ITEM 
        builder.addCase(addItemPreferiti.pending, (state, { payload }) => {
            state.loading = true;
        })
        builder.addCase(addItemPreferiti.fulfilled, (state, { payload }) => {
            const item = payload as IItemPreferiti;
            state.loading = false;
            state.preferiti = [...state.preferiti, item]
        })

        builder.addCase(addItemPreferiti.rejected, (state, { payload }) => {
            state.loading = false;
            state.isError = true
        })

    }
});

export const { clearStatePrefetiti } = preferitiSlime.actions;

export const preferitiSelector = (state: RootState) => state.preferiti;

export default preferitiSlime.reducer;

