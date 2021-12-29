import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getWagFarmAddress,  
  getDeflixFarmAddress,
  getMulticallAddress,
} from 'utils/addressHelpers'

// ABI
import MultiCallAbi from 'config/abi/Multicall.json'
import { ERC20__factory } from 'config/typechain-types/factories/ERC20__factory'
import { IPancakeFarm__factory } from 'config/typechain-types/factories/IPancakeFarm__factory'
import { DeflixMainStaking__factory } from "config/typechain-types/factories/DeflixMainStaking__factory";
import { StrategyWAG__factory } from "config/typechain-types/factories/StrategyWAG__factory";

const signerOrProvider = (signer: ethers.Signer | ethers.providers.Provider) => signer ?? simpleRpcProvider

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => { 
  return new ethers.Contract(address, abi, signerOrProvider(signer))
}


export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return ERC20__factory.connect(address, signerOrProvider(signer))
}

export const getWagFarmContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return IPancakeFarm__factory.connect(getWagFarmAddress(), signerOrProvider(signer))
}

export const getDeflixMainStakingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return DeflixMainStaking__factory.connect(getDeflixFarmAddress(), signerOrProvider(signer))
}

export const getStrategyWagContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return StrategyWAG__factory.connect(address, signerOrProvider(signer))
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}


