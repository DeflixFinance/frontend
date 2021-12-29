import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, Button, ArrowForwardIcon, Flex } from 'uikit'
import { ChainId } from '@wagyu-swap/sdk'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import { useFarms, useLpTokenPrice, usePollFarmsWithUserData, usePriceCakeBusd } from 'state/autofarms/hooks'
import { DeserializedAutoFarm, DeserializedFarm } from 'state/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Container from 'components/Layout/Container'
import { getApy } from 'utils/compoundApyHelpers'
import useTotalValue from 'hooks/useTotalValue'

const NoContainer = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  padding: 16px;
`

const H2Title = styled.h2`
  margin-bottom: 2rem;
  margin-top: 1rem;
  color: white;
  text-align: center;
`

const TotalTvl = styled.h5`  
  color: white;
  text-align: center;
`

const getApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return cakeRewardsApr + lpRewardsApr
  }
  return cakeRewardsApr
}


const Farms: React.FC = () => {
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const { account } = useWeb3React()

  usePollFarmsWithUserData()

  const totalValue = useTotalValue()
  const totalValueFormatted = formatNumber(getBalanceNumber(totalValue))

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedAutoFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.theirLpTotalInQuoteToken || !farm.quoteTokenPriceUsdt) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.theirLpTotalInQuoteToken).times(farm.quoteTokenPriceUsdt)
        const { cakeRewardsApr, lpRewardsApr } =
          getFarmApr(new BigNumber(farm.theirPoolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])

        const apr = getApr(cakeRewardsApr, lpRewardsApr)
        const apy = getApy(apr, 3, 365, 3.5) * 100

        return { ...farm, apr, apy }
      })

      return farmsToDisplayWithAPR
    },
    [cakePrice]
  )

  const farms = farmsList(farmsLP)

  const renderContent = (): JSX.Element => {
    if (farms.length === 0) {
      return (
        <NoContainer>
          <Text textAlign="center">No Farms</Text>
        </NoContainer>
      )
    }

    return (
      <Container paddingTop="1em">
        <H2Title>FARMS</H2Title>
        <FlexLayout>
          {farms.map((farm) => (
            <FarmCard
              key={farm.theirPid}
              farm={farm}
              apr={farm.apr}
              apy={farm.apy}
              cakePrice={cakePrice}
              account={account}
            />
          ))}
        </FlexLayout>
        <TotalTvl>Total TVL: ${totalValueFormatted}</TotalTvl>
      </Container>
    )
  }


  return (
    <>
      {renderContent()}
    </>
  )
}

export default Farms
