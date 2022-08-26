import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',    
    'X-RapidAPI-Key': '7126922fd0msh9696b9be4c93f22p18fb4fjsnf313e43abb09',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = url => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;