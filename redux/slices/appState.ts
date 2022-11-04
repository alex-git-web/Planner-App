import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface AppState {
    isSplashScreen: boolean
}

// Define the initial state using that type
const initialState: AppState = {
    isSplashScreen: false,
}

export const appStateSlice = createSlice({
  name: 'appState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.isSplashScreen = action.payload
    },
  },
})

export const { setIsSplashScreen, } = appStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appState.isSplashScreen

export default appStateSlice.reducer