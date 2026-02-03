import { TCategory } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    homeActiveCategoryIndex: number | null;
    categories: TCategory[]
}

const initialState: IInitialState = {
    homeActiveCategoryIndex: null,
    categories: []
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setHomeActiveCategoryIndex: (state, action: PayloadAction<number | null>) => {
            state.homeActiveCategoryIndex = action.payload;
        },
        setCategories: (state, action: PayloadAction<TCategory[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state, action: PayloadAction<TCategory>) => {
            state.categories.push(action.payload);
        }
    },
});

export const { setHomeActiveCategoryIndex, setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
