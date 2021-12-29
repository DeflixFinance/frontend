import { BASE_BSC_SCAN_URL } from 'config'
import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add VELAS as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: chainId === 106 ? 'VELAS' : 'VELAS Testnet',
            nativeCurrency: {
              name: 'VLX',
              symbol: 'vlx',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the VELAS network on metamask because window.ethereum is undefined")
    return false
  }
}
