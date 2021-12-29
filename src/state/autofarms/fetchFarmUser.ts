import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress, getWagFarmAddress, getDeflixFarmAddress } from 'utils/addressHelpers'
import { SerializedAutoFarmConfig } from 'config/constants/types'
import WagAbi from "config/abi/WAGFarm.json"
import { DeflixMainStaking__factory } from 'config/typechain-types/factories/DeflixMainStaking__factory'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: SerializedAutoFarmConfig[]) => {
  const masterChefAddress = getDeflixFarmAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: SerializedAutoFarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances: string[] = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: SerializedAutoFarmConfig[]) => {
  const wagFarmAddress = getWagFarmAddress()
  const deflixFarmAddress = getDeflixFarmAddress()

  const wagCalls = farmsToFetch.map((farm) => {
    return {
      address: wagFarmAddress,
      name: 'userInfo',
      params: [farm.theirPid, account],
    }
  })

  const deflixCalls = farmsToFetch.map((farm) => {
    return {
      address: deflixFarmAddress,
      name: 'userInfo',
      params: [farm.ourPid, account],
    }
  })

  const wagRawStakedBalances: Array<Object> = await multicall(WagAbi, wagCalls)
  const deflixRawStakedBalances = await multicall(DeflixMainStaking__factory.abi, deflixCalls)

  const parsedStakedBalances = wagRawStakedBalances.map((stakedBalance, index) => {
    return {
      wag: new BigNumber(stakedBalance[0]._hex).toJSON(),
      //user shares
      deflix: new BigNumber(deflixRawStakedBalances[index][0]._hex).toJSON()
    }
  })

  return parsedStakedBalances
}


