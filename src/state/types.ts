import { ThunkAction } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import {
  SerializedFarmConfig,
  DeserializedFarmConfig,
  DeserializedAutoFarmConfig,
  SerializedAutoFarmConfig
} from 'config/constants/types'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>

export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

interface SerializedFarmUserData {
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
}

interface SerializedAutoFarmUserData {
  allowance: string
  tokenBalance: string
  stakedBalance: { wag: string, deflix: string }
}

export interface DeserializedFarmUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  stakedBalance: BigNumber
}

export interface DeserializedAutoFarmUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  stakedBalance: { wag: BigNumber, deflix: BigNumber }
}

export interface SerializedFarm extends SerializedFarmConfig {
  tokenPriceUsdt?: string
  quoteTokenPriceUsdt?: string
  tokenAmountTotal?: SerializedBigNumber
  lpTotalInQuoteToken?: SerializedBigNumber
  lpTotalSupply?: SerializedBigNumber
  tokenPriceVsQuote?: SerializedBigNumber
  poolWeight?: SerializedBigNumber
  userData?: SerializedFarmUserData
}

export interface DeserializedFarm extends DeserializedFarmConfig {
  tokenPriceUsdt?: string
  quoteTokenPriceUsdt?: string
  tokenAmountTotal?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  lpTotalSupply?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: DeserializedFarmUserData
}

export interface SerializedAutoFarm extends SerializedAutoFarmConfig {
  tokenPriceUsdt?: string
  quoteTokenPriceUsdt?: string
  tokenAmountTotal?: SerializedBigNumber
  theirLpTotalInQuoteToken?: SerializedBigNumber
  lpTotalSupply?: SerializedBigNumber
  tokenPriceVsQuote?: SerializedBigNumber
  theirPoolWeight?: SerializedBigNumber
  wantLockedTotal?: SerializedBigNumber
  sharesTotal?: SerializedBigNumber
  userData?: SerializedAutoFarmUserData
}

export interface DeserializedAutoFarm extends DeserializedAutoFarmConfig {
  tokenPriceUsdt?: string
  quoteTokenPriceUsdt?: string
  tokenAmountTotal?: BigNumber
  theirLpTotalInQuoteToken?: BigNumber
  lpTotalSupply?: BigNumber
  tokenPriceVsQuote?: BigNumber
  theirPoolWeight?: BigNumber
  wantLockedTotal?: BigNumber
  sharesTotal?: BigNumber
  userData?: DeserializedAutoFarmUserData
}

// Slices states

export interface SerializedFarmsState {
  data: SerializedFarm[]
  userDataLoaded: boolean
}

export interface DeserializedFarmsState {
  data: DeserializedFarm[]
  userDataLoaded: boolean
}

export interface SerializedAutoFarmsState {
  data: SerializedAutoFarm[]
  userDataLoaded: boolean
}

export interface DeserializedAutoFarmsState {
  data: DeserializedAutoFarm[]
  userDataLoaded: boolean
}

// Block

export interface BlockState {
  currentBlock: number
}

// Global state

export interface State {
  block: BlockState
  autofarms: SerializedAutoFarmsState
}
