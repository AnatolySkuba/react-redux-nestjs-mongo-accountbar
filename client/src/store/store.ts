import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import { companiesApi } from "./companies/companiesApi";
import { companiesSlice } from "./companies/companiesSlice";

const companiesPersistConfig = {
    key: "companies",
    storage,
};

const companiesReducer = persistReducer(companiesPersistConfig, companiesSlice.reducer);

export const store = configureStore({
    reducer: {
        [companiesApi.reducerPath]: companiesApi.reducer,
        companies: companiesReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        companiesApi.middleware,
    ],
});

export const persistor = persistStore(store);
