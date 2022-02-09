import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IResultStore, } from './interface';


const initialState: IResultStore = {
    result: [],
    loading: false,
    isSuccess: false,
    isError: false,
    message: "",

};


export const resultEsploraPageSlime = createSlice({
    name: 'result',
    initialState,
    reducers: {
        clearStateResEsploraPage: (state) => {
            state.loading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            return state;
        },
        accumulatorResult: (state, action: PayloadAction<any>) => {
            state.loading = true;

            let arr = [...state.result, ...action.payload];

            arr = arr.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            );

            state.result = arr
        },
        clearResult: (state) => {
            state.result = []
        },
        stopLoading: (state) => {
            state.loading = false
        }
    }
});

export const { clearStateResEsploraPage, clearResult, accumulatorResult, stopLoading } = resultEsploraPageSlime.actions;

export const resultSelector = (state: RootState) => state.resultEsploraPage;
export const test = (state: RootState) => state.banlist.banlist;

export default resultEsploraPageSlime.reducer;

