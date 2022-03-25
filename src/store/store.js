import { configureStore } from '@reduxjs/toolkit';

import { weatherApi, locationReducer } from '../reducers';

const store = configureStore({
  reducer: {
    location: locationReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
