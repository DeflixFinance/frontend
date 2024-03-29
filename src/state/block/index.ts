import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlockState } from '../types'

const initialState: BlockState = { currentBlock: 0 }

export const blockSlice = createSlice({
  name: 'Block',
  initialState,
  reducers: {
    setBlock: (state, action: PayloadAction<number>) => {      
      state.currentBlock = action.payload
    },
  },
})

// Actions
export const { setBlock } = blockSlice.actions

export default blockSlice.reducer
