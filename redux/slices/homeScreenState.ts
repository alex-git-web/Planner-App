import { createSlice } from '@reduxjs/toolkit'
import { getCurrentDate } from '../../components/HomeScreen/TodoListScreen/components/Calendar/others/functions'

const TODAY_DATE = getCurrentDate()

// Define a type for the slice state
interface HomeScreenState {
  selectCalendarDate: string
}

// Define the initial state using that type
const initialState: HomeScreenState = {
  selectCalendarDate: TODAY_DATE
}

export const actionTypes = {
  selectCalendarDate: 'selectCalendarDate'
}

export const homeScreenSlice = createSlice({
  name: 'homeScreenState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: { payload :{key: string, value: string}}) => {
      switch (action.payload.key) {
        case 'selectCalendarDate':  
          state.selectCalendarDate = action.payload.value
        break
      }
    },
  },
})

export const { 
  setData, 
} = homeScreenSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appState.isSplashScreen

export default homeScreenSlice.reducer