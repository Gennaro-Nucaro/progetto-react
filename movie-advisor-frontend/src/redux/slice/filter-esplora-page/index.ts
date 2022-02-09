import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getGeneri, getProvider } from './asyncAction';
import { IStateFilter, IGenere, IProvider } from './interface';



const initialState: IStateFilter = {
    filterCategory: 'generi',
    generi: [],
    provider: [],
    setting: {
        sortBy: "popularity.desc",
        releaseDateGTE: new Date().getFullYear() - 100,
        releaseDateLTE: new Date().getFullYear()
    },
    filterForQuery: {
        sortBy: "popularity.desc",
        provider: "",
        with_genres: "",
        releaseDateGTE: new Date().getFullYear() - 100,
        releaseDateLTE: new Date().getFullYear(),
    },
    // usare questo state solo se si vericano errori importanti
    errorState: {
        error: false,
        msg: ""
    }
};

export const filterEsplorapageSlice = createSlice({
    name: 'FilterEsploraPage',
    initialState,
    reducers: {
        //select category - header filter
        selectCategory: (state, action: PayloadAction<string>) => {
            state.filterCategory = action.payload;
        },
        //handler generi
        handleGeneriClicked: (state, action: PayloadAction<IGenere>) => {
            state.generi =
                [...state.generi.map(ele => {
                    if (ele.id === action.payload.id) {
                        return { id: ele.id, name: ele.name, clicked: !ele.clicked }
                    } else {
                        return ele
                    }
                })]
            //add id genere for the query
            state.filterForQuery.with_genres = state.generi.filter(ele => ele.clicked === true)
                .map(ele => ele.id).toString();
        },
        //handler provider
        handleProviderClicked: (state, action: PayloadAction<IProvider>) => {
            state.provider =
                [...state.provider.map((ele: IProvider) => {
                    if (ele.provider_id === action.payload.provider_id) {
                        return { ...ele, clicked: !ele.clicked }
                    } else {
                        return ele
                    }
                })]
            //add id provider for the query
            state.filterForQuery.provider = state.provider.filter(ele => ele.clicked === true)
                .map(ele => ele.provider_id).toString();
        },
        //setting filter  - order by  popularity , vote , date,  ecc...
        settingOrderBy: (state, action: PayloadAction<string>) => {
            state.setting.sortBy = action.payload;
            state.filterForQuery.sortBy = action.payload;
        },
        settingReleaseDate: (state, action: PayloadAction<{ name: string, value: string | number }>) => {
            if (action.payload.name === "releaseDateGTE") {
                state.setting.releaseDateGTE = +action.payload.value
                state.filterForQuery.releaseDateGTE = +action.payload.value
            }

            if (action.payload.name === "releaseDateLTE") {
                state.setting.releaseDateLTE = +action.payload.value
                state.filterForQuery.releaseDateLTE = +action.payload.value
            }
        },
        // ERROR ACTION
        handleError: (state, action: PayloadAction<{ error: boolean, msg?: string }>) => {
            state.errorState.error = action.payload.error;
            state.errorState.msg = action.payload.msg;
        }

    },

    extraReducers: (builder) => {
        //GET GENERI
        builder.addCase(getGeneri.rejected, (state, action) => {
            state.errorState.error = true;
            state.errorState.msg = action.error.message
        })
        builder.addCase(getGeneri.fulfilled, (state, action) => {
            if (action.payload.length === 0) {
                state.errorState.error = true
            }
            state.generi = action.payload;
        })
        //GET PROVIDER
        builder.addCase(getProvider.rejected, (state, action) => {
            state.errorState.error = true
            state.errorState.msg = action.error.message
        })

        builder.addCase(getProvider.fulfilled, (state, action) => {
            if (action.payload.length === 0) {
                state.errorState.error = true
            }
            state.provider = action.payload
        })

    }
});

export const { handleProviderClicked, handleGeneriClicked, selectCategory, settingOrderBy, settingReleaseDate, handleError } = filterEsplorapageSlice.actions;

export const filterEsploraPageSelector = (state: RootState) => state.filterEsploraPage

export default filterEsplorapageSlice.reducer;

