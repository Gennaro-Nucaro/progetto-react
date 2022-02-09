import axios from "axios"


/*MOVIE DATABASE API */

export const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export const apiKey = "c631cc5ccf13d469531d6cfdc2539644"
export const language = "&language=it-IT"
export const region = "&region=IT"
export const baseUrlSfondo = "https://image.tmdb.org/t/p/w1280/";
export const baseUrlSfondoW780 = "https://image.tmdb.org/t/p/w780/";
export const baseUrlPoster = "https://image.tmdb.org/t/p/w342/";
export const baseUrlPosterW154 = "https://image.tmdb.org/t/p/w154/";
export const baseUrlPosterW92 = "https://image.tmdb.org/t/p/w92/";

/*SERVER*/
export const server = "http://localhost:3100/api"
/*
"backdrop_sizes": [
    "w300",
    "w780",
    "w1280",
    "original"
],
    "logo_sizes": [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
    ],
        "poster_sizes": [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
        ],
            "profile_sizes": [
                "w45",
                "w185",
                "h632",
                "original"
            ],
                "still_sizes": [
                    "w92",
                    "w185",
                    "w300",
                    "original"
                ]

                */