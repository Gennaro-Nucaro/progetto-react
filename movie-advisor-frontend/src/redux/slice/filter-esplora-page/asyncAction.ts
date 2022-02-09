import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetGeneri, IGetProvider, IProvider } from './interface';
import axios from 'axios';
import { apiKey } from "@utils/costants"



export const getGeneri = createAsyncThunk(
    'moviedbApi/getGeneri',
    async () => {
        const { data }: IGetGeneri = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=it-IT`
        );
        return data.genres.map((ele: { id: number; name: string; }) => {
            return { id: ele.id, name: ele.name, clicked: false }
        }
        )
    }
)


// provider banlist => Servizi streaming che danno zero o pochi risultati 

const banlist = [9, 444, 559, 551, 546, 569, 641, 475, 521, 190,534 , 350, 100]

export const getProvider = createAsyncThunk(
    'moviedbApi/getProvider',
    async () => {
        const { data }: IGetProvider = await axios.get(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=it-IT&watch_region=IT`
        );
        return data.results.filter((ele: IProvider) => !banlist.includes(ele.provider_id)).map((ele: IProvider) => {
            return { ...ele, clicked: false }
        }
        )
    }
)