import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AppState {
  isSplashScreen: boolean
  isHideSplashScreen: boolean
  isMainAppPartLoaded: boolean,
}

// Define the initial state using that type
const initialState: AppState = {
  isSplashScreen: true, // !
  isHideSplashScreen: false, // !
  isMainAppPartLoaded: false,
}

export const appStateSlice = createSlice({
  name: 'appState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.isSplashScreen = action.payload
    },
    setIsHideSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.isHideSplashScreen = action.payload
    },
    setIsMainAppPartLoaded: (state, action: PayloadAction<boolean>) => {
      state.isMainAppPartLoaded = action.payload
    },
  },
})

export const { 
  setIsSplashScreen, 
  setIsHideSplashScreen, 
  setIsMainAppPartLoaded,
} = appStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appState.isSplashScreen

export default appStateSlice.reducer