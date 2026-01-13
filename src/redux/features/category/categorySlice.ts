import { TCategory } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    homeActiveCategoryId: number | null;
    categories: TCategory[]
}

const initialState: IInitialState = {
    homeActiveCategoryId: null,
    categories: []
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setHomeActiveCategoryId: (state, action: PayloadAction<number | null>) => {
            state.homeActiveCategoryId = action.payload;
        },
        setCategories: (state, action: PayloadAction<TCategory[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state, action: PayloadAction<TCategory>) => {
            state.categories.push(action.payload);
        }
    },
});

export const { setHomeActiveCategoryId, setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
