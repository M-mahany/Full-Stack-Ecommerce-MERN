import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    isFetching: false,
  },
  reducers: {
    counterDefault: (state) => {
      state.isFetching = true
    },
    counterDelete: (state, action) => {
      state.value -= action.payload
      state.isFetching = true
    },
    counterValid: (state, action) => {
      state.value = action.payload
      state.isFetching = true
    },
    counterInc: (state, action) => {
      state.value += action.payload
      state.isFetching = true
    },
    counterAdd: (state) => {
      state.value += 1
      state.isFetching = true
    },
    counterRemove: (state) => {
      state.value -= 1
      state.isFetching = true
    },
    cartSuccess: (state) => {
      state.isFetching = false
    },
  },
})
export const {
  counterInc,
  counterAdd,
  counterRemove,
  cartSuccess,
  counterValid,
  counterDelete,
  counterDefault,
} = counterSlice.actions
export default counterSlice.reducer
