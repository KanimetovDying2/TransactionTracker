import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosAPi";
import type { ApiTransaction, ApiTransactions, Transaction, TransactionsState } from "../../types";

const initialState: TransactionsState = {
  items: [],
  isLoading: false,
  error: false,
};

export const fetchTransactions = createAsyncThunk<Transaction[], void>(
  "transactions/fetchAll",
  async () => {
    const response = await axiosApi.get<ApiTransactions | null>(
      "/transactions.json",
    );
    const transactions = response.data;
    if (!transactions) return [];

    return Object.keys(transactions).map((id) => ({
      id,
      ...transactions[id],
    }));
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (data: ApiTransaction) => {
    try {
      await axiosApi.post("/transactions.json", data);
    } catch (e) {
      throw e; 
    }
  },
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addTransaction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default transactionsSlice.reducer;
