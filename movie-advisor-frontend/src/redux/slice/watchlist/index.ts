import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IResGetWatchlist, IWatchListStore, IItemWatchList } from './interface';
import { getWatchlist, deleteItemWatchlist, addItemWatchlist } from './asyncAction';


const initialState: IWatchListStore = {
    watchlist: [],
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};
export const watchListSlime = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        clearStateWatchlist: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

            return state;
        }
    },
    extraReducers: (builder) => {
        //GET WATCHLIST
        builder.addCase(getWatchlist.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getWatchlist.fulfilled, (state, { payload }) => {
            const { res, success } = payload as IResGetWatchlist;
            state.loading = false;
            state.isSuccess = success;
            state.watchlist = res.items;
        })

        builder.addCase(getWatchlist.rejected, (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        })
        // DELETE ITEM 
        builder.addCase(deleteItemWatchlist.fulfilled, (state, { payload }) => {
            state.watchlist = state.watchlist.filter((ele) => ele.idFilm !== payload)
        })
        builder.addCase(deleteItemWatchlist.rejected, (state) => {
            state.loading = false;
            state.isError = true
        })
        //ADD ITEM 
        builder.addCase(addItemWatchlist.fulfilled, (state, { payload }) => {
            const item = payload as IItemWatchList;
            state.loading = false;
            state.watchlist = [...state.watchlist, item]

        })

        builder.addCase(addItemWatchlist.rejected, (state, { payload }) => {
            state.loading = false;
            state.isError = true
        })

    }
});

export const { clearStateWatchlist } = watchListSlime.actions;

export const watchlistSelector = (state: RootState) => state.watchlist;

export default watchListSlime.reducer;

