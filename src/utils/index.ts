import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { BASE_VELAS_SCAN_URLS } from '../config'
import { ChainId } from '@wagyu-swap/sdk'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getVelasScanLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainId: ChainId.MAINNET,
): string {
  switch (type) {
    case 'transaction': {
      return `${BASE_VELAS_SCAN_URLS[chainId]}/tx/${data}`
    }
    case 'token': {
      return `${BASE_VELAS_SCAN_URLS[chainId]}/token/${data}`
    }
    case 'block': {
      return `${BASE_VELAS_SCAN_URLS[chainId]}/block/${data}`
    }
    case 'countdown': {
      return `${BASE_VELAS_SCAN_URLS[chainId]}/block/countdown/${data}`
    }
    default: {
      return `${BASE_VELAS_SCAN_URLS[chainId]}/address/${data}`
    }
  }
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}