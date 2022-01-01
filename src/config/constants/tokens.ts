import { ChainId, Token } from '@wagyu-swap/sdk'
import { serializeToken } from 'state/helpers'
import { SerializedToken } from './types'
import addresses from './addresses.json'

const { MAINNET, TESTNET } = ChainId

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {
  wvlx: new Token(MAINNET, addresses[MAINNET].WVLX, 18, 'WVLX', 'Wrapped VLX', 'https://wagyuswap.app/'),
  vlx: new Token(MAINNET, addresses[MAINNET].WVLX, 18, 'VLX', 'VLX', 'https://wagyuswap.app/'),
  wag: new Token(MAINNET, addresses[MAINNET].WAGToken, 18, 'WAG', 'WAGToken', 'https://wagyuswap.app/'),
  usdt: new Token(
    MAINNET,
    '0x01445C31581c354b7338AC35693AB2001B50b9aE',
    6,
    'USDT',
    'Multichain Tether USD',
    'https://wagyuswap.app/',
  ),
  weth: new Token(
    MAINNET,
    '0x85219708c49aa701871Ad330A94EA0f41dFf24Ca',
    18,
    'WETH',
    'Multichain WETH',
    'https://wagyuswap.app/',
  ),
  busd: new Token(
    MAINNET,
    '0xc111c29A988AE0C0087D97b33C6E6766808A3BD3',
    18,
    'BUSD',
    'Velas BUSD',
    'https://wagyuswap.app/',
  ),
  usdc: new Token(
    MAINNET,
    '0xe2C120f188eBd5389F71Cf4d9C16d05b62A58993',
    6,
    'USDC',
    'Velas USDC',
    'https://wagyuswap.app/',
  ),
  bitorb: new Token(
    MAINNET,
    '0x09bce7716d46459df7473982fd27a96eabd6ee4d',
    6,
    'BITORB',
    'Bitorbit',
    'https://bitorbit.com',
  ),
  scar: new Token(MAINNET, '0x8d9fb713587174ee97e91866050c383b5cee6209', 6, 'SCAR', 'Velhalla', 'https://velhalla.io/'),
  astro: new Token(
    MAINNET,
    '0x72eb7ca07399ec402c5b7aa6a65752b6a1dc0c27',
    18,
    'ASTRO',
    'AstroSwap',
    'https://www.astroswap.app/',
  ),
  swapz: new Token(
    MAINNET,
    '0x9b6fbF0ea23faF0d77B94d5699B44062e5E747Ac',
    18,
    'SWAPZ',
    'SWAPZ.app',
    'https://swapz.app',
  ),
  usdv: new Token(
    MAINNET,
    '0xcd7509b76281223f5b7d3ad5d47f8d7aa5c2b9bf',
    18,
    'USDV',
    'USD Velero Stablecoin',
    'https://velero.finance/',
  ),
}

export const testnetTokens = {
  wvlx: new Token(TESTNET, addresses[ChainId.TESTNET].WVLX, 18, 'WVLX', 'Wrapped VLX', 'https://wagyuswap.app/'),
  wag: new Token(TESTNET, addresses[ChainId.TESTNET].WAGToken, 18, 'WAG', 'WAGToken', 'https://wagyuswap.app/'),
  usdt: new Token(
    TESTNET,
    '0x6Ef054B3E3C3C83E14527E8fa593c2c4435A6ea4',
    18,
    'USDT',
    'Velas USDT',
    'https://wagyuswap.app/',
  ),
  busd: new Token(
    TESTNET,
    '0xe2172a8E1762ae9962A59EE88a731522A61a4cc9',
    18,
    'BUSD',
    'Velas BUSD',
    'https://wagyuswap.app/',
  ),
  usdc: new Token(
    TESTNET,
    '0x6b82bDB5a1AdFfa3816D1F942D60f0269647C646',
    18,
    'USDC',
    'Velas USDC',
    'https://wagyuswap.app/',
  ),
  weth: new Token(
    TESTNET,
    '0x3538C7f88aDbc8ad1F435f7EA70287e26b926344',
    18,
    'WETH',
    'Multichain WETH',
    'https://wagyuswap.app/',
  )
}

const tokens = (): TokenList => {
  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (chainId === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {})
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
