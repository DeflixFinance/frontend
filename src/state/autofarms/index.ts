import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import autoFarmsConfig from 'config/constants/autofarms'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { SerializedAutoFarm, SerializedAutoFarmsState } from '../types'

const noAccountFarmConfig = autoFarmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: { wag: '0', deflix: '0' }
  },
}))

const initialState: SerializedAutoFarmsState = {
  data: noAccountFarmConfig,
  userDataLoaded: false
}

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<SerializedAutoFarm[]>(
  'farms/fetchAutoFarmsPublicDataAsync',
  async () => {
    const farms = await fetchFarms(autoFarmsConfig)

    const farmsWithPrices = await fetchFarmsPrices(farms)

    return farmsWithPrices
  },
)

interface FarmUserDataResponse {
  ourPid: number
  theirPid: number
  allowance: string
  tokenBalance: string
  stakedBalance: { wag: string, deflix: string }
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account }) => {
    const userFarmAllowances = await fetchFarmUserAllowances(account, autoFarmsConfig)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, autoFarmsConfig)
    const userStakedBalances = await fetchFarmUserStakedBalances(account, autoFarmsConfig)

    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        ourPid: autoFarmsConfig[index].ourPid,
        theirPid: autoFarmsConfig[index].theirPid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
      }
    })
  },
)

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.theirPid === farm.theirPid)
        return { ...farm, ...liveFarmData }
      })
    })

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { theirPid } = userDataEl
        const index = state.data.findIndex((farm) => farm.theirPid === theirPid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

export default farmsSlice.reducer
