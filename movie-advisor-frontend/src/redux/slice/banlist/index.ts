import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IResGetWatchlist, IBanlistStore, IItemBanList } from './interface';
import { getBanlist, deleteItemBanlist, addItemBanlist } from './asyncAction';


const initialState: IBanlistStore = {
    banlist: [],
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};


export const banlistSlime = createSlice({
    name: 'banlist',
    initialState,
    reducers: {
        clearStateBanlist: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

            return state;
        }
    },
    extraReducers: (builder) => {
        //GET BANLIST
        builder.addCase(getBanlist.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getBanlist.fulfilled, (state, { payload }) => {
            const { res, success } = payload as IResGetWatchlist;
            state.loading = false;
            state.isSuccess = success;
            state.banlist = res.items;          
        })

        builder.addCase(getBanlist.rejected, (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = true
        })
        // DELETE ITEM 
        builder.addCase(deleteItemBanlist.fulfilled, (state, { payload }) => {
            state.banlist = state.banlist.filter((ele) => ele.idFilm !== payload)
        })
        builder.addCase(deleteItemBanlist.rejected, (state) => {
            state.loading = false;
            state.isError = true
        })

        // ADD ITEM 
        builder.addCase(addItemBanlist.fulfilled, (state, { payload }) => {
            const item = payload as IItemBanList;
            state.loading = false;
            state.banlist = [...state.banlist, item]
        })
        builder.addCase(addItemBanlist.rejected, (state) => {
            state.loading = false;
            state.isError = true
        })

    }
});

export const { clearStateBanlist } = banlistSlime.actions;

export const banlistSelector = (state: RootState) => state.banlist;

export default banlistSlime.reducer;

