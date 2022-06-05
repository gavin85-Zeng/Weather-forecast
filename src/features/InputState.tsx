import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const usrKeySlice = createSlice({
    name: "apiKey",
    initialState: {
        text: "",
    },
    reducers: {
        setApiKey: (state, action) => {
            state.text = action.payload;
        }
    },
})

export const selectApiKey = (state: RootState) => state.usrKey.text;
export const { setApiKey } = usrKeySlice.actions;
export default usrKeySlice.reducer;