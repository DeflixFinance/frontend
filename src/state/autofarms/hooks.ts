import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { autoFarmsConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
import { deserializeToken } from 'state/user/hooks/helpers'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from '.'
import { State, DeserializedAutoFarmUserData, SerializedAutoFarm, DeserializedAutoFarm, DeserializedFarmsState, DeserializedAutoFarmsState } from '../types'
import { VLX_WAG_LP_PID } from 'config/constants/autofarms'

const deserializeFarmUserData = (farm: SerializedAutoFarm): DeserializedAutoFarmUserData => {
  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? {
      deflix: new BigNumber(farm.userData.stakedBalance.deflix),
      wag: new BigNumber(farm.userData.stakedBalance.wag)
    } : { deflix: BIG_ZERO, wag: BIG_ZERO },
  }
}

const deserializeFarm = (farm: SerializedAutoFarm): DeserializedAutoFarm => {
  const { lpAddresses, lpSymbol, theirPid, ourPid, theirFarm, theirFarmUrl, theirFarmAddress, quoteTokenPriceUsdt, tokenPriceUsdt } = farm

  return {
    lpAddresses,
    lpSymbol,
    theirPid,
    ourPid,
    theirFarm,
    theirFarmUrl,
    theirFarmAddress,
    quoteTokenPriceUsdt,
    tokenPriceUsdt,
    token: deserializeToken(farm.token),
    quoteToken: deserializeToken(farm.quoteToken),
    userData: deserializeFarmUserData(farm),
    tokenAmountTotal: farm.tokenAmountTotal ? new BigNumber(farm.tokenAmountTotal) : BIG_ZERO,
    theirLpTotalInQuoteToken: farm.theirLpTotalInQuoteToken ? new BigNumber(farm.theirLpTotalInQuoteToken) : BIG_ZERO,
    lpTotalSupply: farm.lpTotalSupply ? new BigNumber(farm.lpTotalSupply) : BIG_ZERO,
    tokenPriceVsQuote: farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO,
    theirPoolWeight: farm.theirPoolWeight ? new BigNumber(farm.theirPoolWeight) : BIG_ZERO,
    sharesTotal: farm.sharesTotal ? new BigNumber(farm.sharesTotal) : BIG_ZERO,
    wantLockedTotal: farm.wantLockedTotal ? new BigNumber(farm.wantLockedTotal) : BIG_ZERO,
  }
}

export const usePollFarmsPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

export const usePollFarmsWithUserData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {  
    dispatch(fetchFarmsPublicDataAsync())

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account }))
    }
  }, [dispatch, slowRefresh, account])
}

export const useFarms = (): DeserializedAutoFarmsState => {
  const farms = useSelector((state: State) => state.autofarms)
  const deserializedFarmsData = farms.data.map(deserializeFarm)
  const { userDataLoaded } = farms
  return {
    userDataLoaded,
    data: deserializedFarmsData,
  }
}

export const useFarmFromTheirPid = (pid: number): DeserializedAutoFarm => {
  const farm = useSelector((state: State) => state.autofarms.data.find((f) => f.theirPid === pid))
  return deserializeFarm(farm)
}

export const useFarmFromLpSymbol = (lpSymbol: string): DeserializedAutoFarm => {
  const farm = useSelector((state: State) => state.autofarms.data.find((f) => f.lpSymbol === lpSymbol))
  return deserializeFarm(farm)
}

export const useFarmUser = (pid): DeserializedAutoFarmUserData => {
  const { userData } = useFarmFromTheirPid(pid)
  const { allowance, tokenBalance, stakedBalance } = userData
  return {
    allowance,
    tokenBalance,
    stakedBalance
  }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromTheirPid(pid)
  return farm && new BigNumber(farm.tokenPriceUsdt)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.theirPid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply.gt(0) && farm.theirLpTotalInQuoteToken.gt(0)) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(farm.lpTotalSupply)
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromTheirPid(VLX_WAG_LP_PID)
  const cakePriceBusdAsString = cakeBnbFarm.tokenPriceUsdt

  const cakePriceBusd = useMemo(() => {
    return new BigNumber(cakePriceBusdAsString)
  }, [cakePriceBusdAsString])

  return cakePriceBusd
}

