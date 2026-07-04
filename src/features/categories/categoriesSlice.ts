import { createSlice } from "@reduxjs/toolkit";

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

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
