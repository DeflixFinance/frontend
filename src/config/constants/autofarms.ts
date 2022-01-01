import { ChainId } from '@wagyu-swap/sdk'
import contracts from './contracts'
import { serializeTokens } from './tokens'
import { SerializedAutoFarmConfig } from './types'

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
export const VLX_WAG_LP_PID = chainId === ChainId.MAINNET ? 1 : 9
export const VLX_USDT_LP_PID = chainId === ChainId.MAINNET ? 5 : 6

const serializedTokens = serializeTokens()

const WagFarm = {
  theirFarm: "Wagyu Swap",
  theirFarmUrl: "https://www.wagyuswap.app/",
  theirFarmAddress: contracts.WAGFarm  
}

const autoFarms: SerializedAutoFarmConfig[] = [
  {
    theirPid: 1,
    ourPid: 0,
    ...WagFarm,
    lpSymbol: 'VLX_WAG LP',
    lpAddresses: {
      111: '0xdC415f9c745a28893b0Cbb6A8eaC1bb6ed42C581',
      106: '0x33f879690C165cC320B0BA04cEb1F9CeaC80F376',
    },    
    token: serializedTokens.wag,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 2,
    ourPid: 1,
    ...WagFarm,
    lpSymbol: 'VLX_ETH LP',
    lpAddresses: {
      111: '0x8A70d2a3e2cba2CAD61FbA419E62eB821F18Bb57',
      106: '0x7c3F1eA99770aa23Fe1b19097c93BB0cF34C8351',
    },
    token: serializedTokens.weth,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 3,
    ourPid: 2,
    ...WagFarm,
    lpSymbol: 'VLX_BUSD LP',
    lpAddresses: {
      111: '0xe25107384e3d23403c4537967D34cCe02A2b56c6',
      106: '0x8e2B762Bee3E2bf2C8fB0cdd04274042748D6C23',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 4,
    ourPid: 3,
    ...WagFarm,
    lpSymbol: 'VLX_USDC LP',
    lpAddresses: {
      111: '0x33ea93e391aF9cAA4b8e9C3368236B93DFCF39C4',
      106: '0x757Ac3cDFfa84b67dFC58c5880Aa8037ef5a23d5',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 5,
    ourPid: 4,
    ...WagFarm,
    lpSymbol: 'VLX_USDT LP',
    lpAddresses: {
      111: '0xF20c93c5e5F534C9D95567497Ea17a841164d37b',
      106: '0x7F3cB73FC470c2c9F543FdD17dF4De0e97b51A97',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 6,
    ourPid: 5,
    ...WagFarm,
    lpSymbol: 'VLX_BITORB LP',
    lpAddresses: {
      111: '',
      106: '0xa4c1Ee69750Ff17a2fa561D697E2fb23f4e0A842',
    },
    token: serializedTokens.bitorb,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 7,
    ourPid: 6,
    ...WagFarm,
    lpSymbol: 'VLX_SCAR LP',
    lpAddresses: {
      111: '',
      106: '0x9D4192D18c49dd9e4DBC3892dd55Cd8EC4081299',
    },
    token: serializedTokens.scar,
    quoteToken: serializedTokens.wvlx,
  },
  {
    theirPid: 10,
    ourPid: 7,
    ...WagFarm,
    lpSymbol: 'WAG_ASTRO LP',
    lpAddresses: {
      111: '',
      106: '0x40AC95e5855878e614f838ABf2b84853e84F188d',
    },
    token: serializedTokens.astro,
    quoteToken: serializedTokens.wag
  },
  {
    theirPid: 11,
    ourPid: 8,
    ...WagFarm,
    lpSymbol: 'WAG_SWAPZ LP',
    lpAddresses: {
      111: '',
      106: '0x3f3C905210411F6E7D881889AffBA5051fC9294b',
    },
    token: serializedTokens.swapz,
    quoteToken: serializedTokens.wag
  },
  {
    theirPid: 12,
    ourPid: 9,
    ...WagFarm,
    lpSymbol: 'WAG_USDV LP',
    lpAddresses: {
      111: '',
      106: '0x545Dad8f8F934b6E5fa408FEC3da59651228Ee9E',
    },
    token: serializedTokens.usdv,
    quoteToken: serializedTokens.wag
  }  
]


export default autoFarms