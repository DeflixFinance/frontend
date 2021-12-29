import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import { DeflixMainStaking__factory } from 'config/typechain-types/factories/DeflixMainStaking__factory'
import { IPancakeFarm__factory } from 'config/typechain-types/factories/IPancakeFarm__factory'
import { StrategyWAG__factory } from 'config/typechain-types/factories/StrategyWAG__factory'
import { getAddress, getDeflixFarmAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { SerializedAutoFarm, SerializedBigNumber } from '../types'

type PublicAutoFarmData = {
  // Raw amount of token in the LP
  tokenAmountTotal: SerializedBigNumber
  // Total staked in LP, in quote token value
  theirLpTotalInQuoteToken: SerializedBigNumber
  // Total supply of LP token
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  theirPoolWeight: SerializedBigNumber
  wantLockedTotal: SerializedBigNumber
  sharesTotal: SerializedBigNumber
}

const fetchFarm = async (farm: SerializedAutoFarm): Promise<PublicAutoFarmData> => {
  const { ourPid, theirPid, theirFarmAddress, lpAddresses, token, quoteToken } = farm
  const lpAddress = getAddress(lpAddresses)
  const calls = [
    // Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteToken.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [getAddress(theirFarmAddress)],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: token.address,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteToken.address,
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
    await multicall(erc20, calls)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const theirLpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))

  const [theirPoolInfo, theirTotalAllocPoint] = await multicall(IPancakeFarm__factory.abi, [
    {
      address: getAddress(theirFarmAddress),
      name: 'poolInfo',
      params: [theirPid],
    },
    {
      address: getAddress(theirFarmAddress),
      name: 'totalAllocPoint',
    },
  ])

  const [ourPoolInfo] = await multicall(DeflixMainStaking__factory.abi, [
    {
      address: getDeflixFarmAddress(),
      name: 'poolInfo',
      params: [ourPid],
    }
  ])

  const [wantLockedTotal, sharesTotal] = await multicall(StrategyWAG__factory.abi, [
    {
      address: ourPoolInfo.strategy,
      name: 'wantLockedTotal',
    },
    {
      address: ourPoolInfo.strategy,
      name: 'sharesTotal',
    }
  ])

  const allocPoint = theirPoolInfo ? new BigNumber(theirPoolInfo.allocPoint?._hex) : BIG_ZERO
  const poolWeight = theirTotalAllocPoint ? allocPoint.div(new BigNumber(theirTotalAllocPoint)) : BIG_ZERO

  return {
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    theirLpTotalInQuoteToken: theirLpTotalInQuoteToken.toJSON(),
    theirPoolWeight: poolWeight.toJSON(),
    wantLockedTotal: new BigNumber(wantLockedTotal).toJSON(),
    sharesTotal: new BigNumber(sharesTotal).toJSON(),
  }
}

export default fetchFarm
