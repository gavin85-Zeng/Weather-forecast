import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const tabSlice = createSlice({
    name: "tab",
    initialState: {
        value: 0,
        isSearch: false // after search auto change tab
    },
    reducers: {
        setTabValue: (state, action) => {
            state.value = action.payload;
        },
        setSearchFlag: (state, action) => {
            state.isSearch = action.payload;
        }
    },
})

export const selectTabValue = (state: RootState) => state.tab.value;
export const selectSearchFlag = (state: RootState) => state.tab.isSearch;
export const { setTabValue, setSearchFlag } = tabSlice.actions;
export default tabSlice.reducer;