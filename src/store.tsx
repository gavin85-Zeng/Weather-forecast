import { configureStore } from '@reduxjs/toolkit';
import usrKeyReducer from './features/InputState'
import forcastReducer from './features/ForecastSlice'
import tabReducer from './features/TabSlice'

export const store = configureStore({
    reducer: {
        usrKey: usrKeyReducer,
        forecast: forcastReducer,
        tab: tabReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch