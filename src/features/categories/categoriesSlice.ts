import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosAPi";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

interface CategoriesState {
  items: Category[];
}

const initialState: CategoriesState = {
  items: [],
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await axiosApi.get("/categories.json");
    if (!response.data) return [];
    return Object.keys(response.data).map((id) => ({
      id,
      ...response.data[id],
    }));
  },
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
