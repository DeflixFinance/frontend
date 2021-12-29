import { Flex, Modal } from "uikit"
import { useTabs } from "react-headless-tabs"
import styled from 'styled-components'
import "./CardModal.css"
import { TabSelector } from "components/TabSelector";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Info from "./Info";
import { getAddress } from "utils/addressHelpers";
import { getVelasScanLink } from "utils";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useFarmFromTheirPid, useLpTokenPrice } from "state/autofarms/hooks";

export interface CardModalProps {
    onDismiss?: () => void
    account?: string    
    lpLabel: string
    theirPid: number
    displayApr: string
    displayApy: string
    stakedBalance: string
    stakedDollarValue: string
}

const TabContainer = styled.div`
display: flex;
border-bottom: 1px solid rgb(209 213 219)
`

const PanelsContainer = styled.div`
width: 100%;
display: flex;
margin-top: 20px;
`

const CardModal: React.FC<CardModalProps> = ({ theirPid, lpLabel, account, displayApr, displayApy, stakedBalance, stakedDollarValue, onDismiss }) => {

    const [selectedTab, setSelectedTab] = useTabs([
        'deposit',
        'withdraw',
        'info'
    ]);
    const farm = useFarmFromTheirPid(theirPid)
    const { chainId } = useActiveWeb3React()
    const tokenUrl = getVelasScanLink(getAddress(farm.lpAddresses), "address", chainId)
    const lpPrice = useLpTokenPrice(farm.lpSymbol)
    
    return (
        <Modal title={farm.lpSymbol} onDismiss={onDismiss} maxWidth="380px">
            <TabContainer>
                <TabSelector
                    isActive={selectedTab === 'deposit'}
                    onClick={() => setSelectedTab('deposit')}
                >
                    Deposit
                </TabSelector>
                <TabSelector
                    isActive={selectedTab === 'withdraw'}
                    onClick={() => setSelectedTab('withdraw')}
                >
                    Withdraw
                </TabSelector>
                <TabSelector
                    isActive={selectedTab === 'info'}
                    onClick={() => setSelectedTab('info')}
                >
                    Info
                </TabSelector>
            </TabContainer>
            <PanelsContainer style={{ color: "white" }}>
                <Flex hidden={selectedTab !== 'deposit'} style={{ width: "100%" }}>
                    <Deposit
                        account={account}
                        farm={farm}
                        lpPrice={lpPrice}
                        tokenName={lpLabel}
                        apy={0}
                        onDismiss={onDismiss} 
                    />
                </Flex>
                <Flex hidden={selectedTab !== 'withdraw'} style={{ width: "100%" }}>
                    <Withdraw 
                        account={account}
                        farm={farm}
                        lpPrice={lpPrice}
                        tokenName={lpLabel}                        
                        onDismiss={onDismiss} 
                        stakedBalance={stakedBalance}
                        stakedDollarValue={stakedDollarValue}
                    />
                    </Flex>
                <Flex hidden={selectedTab !== 'info'} style={{ width: "100%" }}>
                    <Info
                        lpLabel={lpLabel}
                        farm={farm.theirFarm}
                        farmUrl={farm.theirFarmUrl}
                        tokenUrl={tokenUrl}
                        displayApr={displayApr}
                        displayApy={displayApy}
                    /></Flex>
            </PanelsContainer>
        </Modal>
    )

}

export default CardModal

