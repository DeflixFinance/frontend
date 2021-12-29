import { ChainId } from '@wagyu-swap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const VELAS_BLOCK_TIME = 0.4

export const BASE_VELAS_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://evmexplorer.velas.com',
  [ChainId.TESTNET]: 'https://evmexplorer.testnet.velas.com',
}

export const BASE_URL = `${window.location.protocol}//${window.location.host}`
export const BASE_BSC_SCAN_URL = BASE_VELAS_SCAN_URLS[ChainId.MAINNET]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 400000
export const WAG_PER_SECOND = new BigNumber(13)
export const SECONDS_PER_YEAR = new BigNumber(60 * 60 * 24 * 365) // 10512000
export const WAG_PER_YEAR = WAG_PER_SECOND.times(SECONDS_PER_YEAR)
