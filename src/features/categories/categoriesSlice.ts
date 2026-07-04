import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosAPi";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

export interface ApiCategory {
  name: string;
  type: "income" | "expense";
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}

interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  isDeleting: boolean;
  error: boolean;
}

const initialState: CategoriesState = {
  items: [],
  isLoading: false,
  isDeleting: false,
  error: false,
};

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchAll",
  async () => {
    const response = await axiosApi.get<ApiCategories | null>(
      "/categories.json",
    );
    const categories = response.data;
    if (!categories) return [];

    return Object.keys(categories).map((id) => ({
      id,
      ...categories[id],
    }));
  },
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (data: { name: string; type: "income" | "expense" }) => {
    await axiosApi.post("/categories.json", data);
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string) => {
    await axiosApi.delete(`/categories/${id}.json`);
    return id;
  },
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }: { id: string; data: ApiCategory }) => {
    await axiosApi.put(`/categories/${id}.json`, data);
    return { id, ...data };
  },
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCategory.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleting = false;
        state.error = true;
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default categoriesSlice.reducer;
