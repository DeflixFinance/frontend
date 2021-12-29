import { ChainId } from '@wagyu-swap/sdk'
import addresses from './addresses.json'

export default {
  deflixMainStaking: {
    [ChainId.MAINNET]: addresses[ChainId.MAINNET].DeflixFarm,
    [ChainId.TESTNET]: addresses[ChainId.TESTNET].DeflixFarm,
  },
  zap: {
    [ChainId.MAINNET]: "",
    [ChainId.TESTNET]: "",
  },
  multiCall: {
    [ChainId.MAINNET]: addresses[ChainId.MAINNET].Multicall2,
    [ChainId.TESTNET]: addresses[ChainId.TESTNET].Multicall2,
  },
  WAGFarm: {
    [ChainId.MAINNET]: addresses[ChainId.MAINNET].WAGFarm,
    [ChainId.TESTNET]: addresses[ChainId.TESTNET].WAGFarm,
  }
}
