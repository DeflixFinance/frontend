import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getErc20Contract,
  getDeflixMainStakingContract,  
  getStrategyWagContract,
  getWagFarmContract
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'

import ERC20_ABI from '../config/abi/erc20.json'
import { Contract } from '@ethersproject/contracts'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract } from '../utils'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc20Contract(address, library.getSigner()), [address, library])
}

export const useDeflixMainStakingContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getDeflixMainStakingContract(library.getSigner()), [library])
}

export const useWagFarmContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getWagFarmContract(library.getSigner()), [library])
}

export const useStrategyWagContract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getStrategyWagContract(address, library.getSigner()), [address, library])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), multiCallAbi, false)
}
