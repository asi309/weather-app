import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://www.metaweather.com/api';
// const corsUrl = 'https://the-ultimate-api-challenge.herokuapp.com';
const corsUrl = 'https://cors-anywhere.herokuapp.com'; 

// const createRequest = (url) => (`${corsUrl}/${baseUrl}/${url}`);

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${corsUrl}/${baseUrl}`,
  }),
  endpoints: (builder) => ({
    searchLocationName: builder.query({
      query: (locString) => `/location/search/?query=${locString}`,
    }),
    searchLocationLatLong: builder.query({
      query: ({ lat, long }) => `/location/search/?lattlong=${lat},${long}`,
    }),
    getWeather: builder.query({
      query: (woeId) => `/location/${woeId}`,
    }),
    getWeatherOnDate: builder.query({
      query: (woeId, date) => `/location/${woeId}/${date}`,
    }),
  }),
});

export const {
  useSearchLocationNameQuery,
  useSearchLocationLatLongQuery,
  useGetWeatherQuery,
  useGetWeatherOnDateQuery,
} = weatherApi;
