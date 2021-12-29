import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 5000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

export const connectorsByName = {
    "injected": injected
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}

export const signMessage = async (provider: any, account: string, message: string): Promise<string> => {
    return provider.getSigner(account).signMessage(message)
}
