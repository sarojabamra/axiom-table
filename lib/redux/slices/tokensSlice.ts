import type { Token } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokensState {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  lastUpdate: number;
}

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
  lastUpdate: Date.now(),
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.lastUpdate = Date.now();
    },
    updateToken: (state, action: PayloadAction<Partial<Token> & { id: string }>) => {
      const index = state.tokens.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tokens[index] = { ...state.tokens[index], ...action.payload };
        state.lastUpdate = Date.now();
      }
    },
    updateMultipleTokens: (state, action: PayloadAction<Array<Partial<Token> & { id: string }>>) => {
      action.payload.forEach((update) => {
        const index = state.tokens.findIndex((t) => t.id === update.id);
        if (index !== -1) {
          state.tokens[index] = { ...state.tokens[index], ...update };
        }
      });
      state.lastUpdate = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTokens, updateToken, updateMultipleTokens, setLoading, setError } = tokensSlice.actions;
export default tokensSlice.reducer;
