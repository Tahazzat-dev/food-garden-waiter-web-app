import { Lang } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocaleState {
    locale: Lang;
}

const initialState: LocaleState = {
    locale: "en",
};

const localeSlice = createSlice({
    name: "locale",
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<Lang>) => {
            state.locale = action.payload;
        },
    },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
