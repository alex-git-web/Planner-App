import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './slices/appState'
import homeScreenReducer from './slices/homeScreenState'

export const store = configureStore({
  reducer: {
    appConfigure: appStateReducer,
    homeScreen: homeScreenReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch