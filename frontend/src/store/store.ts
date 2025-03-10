const {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} = require("redux-persist");
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slices/LoginSlice";

//OUR REDUX STORE FOR MANANGIN STATES GLOBALY
const reducers = combineReducers({
  login: persistReducer(
    {
      key: "login",
      storage,
    },
    LoginSlice.reducer
  ),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
