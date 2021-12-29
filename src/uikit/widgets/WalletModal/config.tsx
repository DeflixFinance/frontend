import Metamask from '../../components/Svg/Icons/Metamask'
import WalletConnect from '../../components/Svg/Icons/WalletConnect'
import TrustWallet from '../../components/Svg/Icons/TrustWallet'
import MathWallet from '../../components/Svg/Icons/MathWallet'
import TokenPocket from '../../components/Svg/Icons/TokenPocket'
import BinanceChain from '../../components/Svg/Icons/BinanceChain'
import SafePal from '../../components/Svg/Icons/SafePal'
import Coin98 from '../../components/Svg/Icons/Coin98'

import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
  } 
]

export default connectors
export const connectorLocalStorageKey = 'connectorIdv2'
export const walletLocalStorageKey = 'wallet'
