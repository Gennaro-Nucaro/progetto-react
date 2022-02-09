import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IStatsStore, IResPut, IResGetStats } from './interface';
import { getStats, deleteItemStats, addItemStats } from './asyncAction';



const initialState: IStatsStore = {
    //list
    filmList: [],
    genereList: [],
    anniList: [],
    attoriList: [],
    directorsList: [],
    //action
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};


export const statisticheSlime = createSlice({
    name: 'statistiche',
    initialState,
    reducers: {
        clearStateStats: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

            return state;
        }
    },
    extraReducers: (builder) => {
        //GET STATS
        builder.addCase(getStats.pending, (state) => {
            state.loading = true;
        })
    
        builder.addCase(getStats.fulfilled, (state, { payload }) => {
            const { res, success } = payload as IResGetStats;
            state.loading = false;
            state.isSuccess = success;
            state.filmList = res.filmList;
            state.attoriList = res.attoriList;
            state.genereList = res.genereList;
            state.directorsList = res.directorsList;
            state.anniList = res.anniList;
        });

        builder.addCase(getStats.rejected, (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = true;
        })
        //ADD ITEM
        builder.addCase(addItemStats.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addItemStats.fulfilled, (state) => {
            state.loading = false;
        })

        // DELETE ITEM 
        builder.addCase(deleteItemStats.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteItemStats.fulfilled, (state, { payload }) => {
            const { success } = payload as IResPut;
            state.loading = false;
            state.isSuccess = success;
        })
        builder.addCase(deleteItemStats.rejected, (state) => {
            state.loading = false;
            state.isError = true
            state.isError = true;
        })
    }
});

export const { clearStateStats } = statisticheSlime.actions;

export const statisticheSelector = (state: RootState) => state.statistiche;

export default statisticheSlime.reducer;

