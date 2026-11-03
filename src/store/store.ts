import { configureStore } from "@reduxjs/toolkit";
import ApiInstance from "../api/api";
import authReducer from "./slices/auth.slice"

const store = configureStore({
  reducer: {
    [ApiInstance.reducerPath]: ApiInstance.reducer,
    auth: authReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiInstance.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store