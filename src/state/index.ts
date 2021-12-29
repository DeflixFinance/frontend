import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import autofarmsReducer from "./autofarms"
import blockReducer from './block'
import multicall from './multicall/reducer'

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        autofarms: autofarmsReducer,
        multicall,
        block: blockReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store