import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./slices/tokensSlice";

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["tokens/setTokens", "tokens/updateToken", "tokens/updateMultipleTokens"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
