import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import { usersApi } from "../services/usersApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [usersApi.reducerPath], // save only usersApi
  blacklist: [postsApi.reducerPath], // not save postsApi
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(postsApi.middleware)
      .concat(usersApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
