import { ChainId } from '@wagyu-swap/sdk'

const getTokenLogoURL = (address: string) => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  return `https://github.com/wagyuswapapp/assets/blob/master/blockchains/velas${
    parseInt(chainId, 10) === ChainId.TESTNET ? '-test' : ''
  }/assets/${address.toLowerCase()}/logo.png?raw=true`
}

export default getTokenLogoURL
