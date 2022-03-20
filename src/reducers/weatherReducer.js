import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = 'https://www.metaweather.com/api/';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    searchLocation: builder.query({
      query: (locString) => `/location/search/?query=${locString}`,
    }),
  }),
});
