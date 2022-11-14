import { createSlice } from '@reduxjs/toolkit'
import { getCurrentDate } from '../../screens/HomeScreen/TodoListScreen/components/Calendar/others/functions'

const TODAY_DATE = getCurrentDate()

// Define a type for the slice state
interface HomeScreenState {
  curSelectedDate: string,
  curSelectedMonth: string,
  isRenderTodoList: boolean,
  isShowModal: boolean,
  isOpenModal: boolean,
}

// Define the initial state using that type
const initialState: HomeScreenState = {
  curSelectedDate: TODAY_DATE, // year, month, day
  curSelectedMonth: TODAY_DATE, // year, month
  isRenderTodoList: false,
  isShowModal: false,
  isOpenModal: false,
}

export const actionTypes = {
  curSelectedDate: 'curSelectedDate', 
  curSelectedMonth: 'curSelectedMonth',
}

export const homeScreenSlice = createSlice({
  name: 'homeScreenState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: { payload :{key: string, value: any}}) => {
      switch (action.payload.key) {
        case 'curSelectedDate':  
          state.curSelectedDate = action.payload.value
        break
        case 'curSelectedMonth':  
          state.curSelectedMonth = action.payload.value
          state.curSelectedDate = action.payload.value + '-01' // day
        break
        case 'isRenderTodoList':  
          state.isRenderTodoList = action.payload.value
        break
        case 'isShowModal':  
          state.isShowModal = action.payload.value
        break
        case 'isOpenModal':  
          state.isOpenModal = action.payload.value
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