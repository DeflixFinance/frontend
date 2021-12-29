import { Token } from '@wagyu-swap/sdk'

export interface Address {
  111?: string
  106: string
}

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
  projectLink?: string
}

interface FarmConfigBaseProps {
  pid: number
  lpSymbol: string
  lpAddresses: Address
}

interface AutoFarmConfigBaseProps {
  ourPid: number
  theirPid: number
  theirFarm: string
  theirFarmUrl: string
  theirFarmAddress: Address
  lpSymbol: string
  lpAddresses: Address  
}

export interface SerializedAutoFarmConfig extends AutoFarmConfigBaseProps {
  token: SerializedToken
  quoteToken: SerializedToken
}

export interface SerializedFarmConfig extends FarmConfigBaseProps {
  token: SerializedToken
  quoteToken: SerializedToken
}

export interface DeserializedFarmConfig extends FarmConfigBaseProps {
  token: Token
  quoteToken: Token
}

export interface DeserializedAutoFarmConfig extends AutoFarmConfigBaseProps {
  token: Token
  quoteToken: Token
}
