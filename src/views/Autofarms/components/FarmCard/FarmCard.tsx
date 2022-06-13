import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, useModal } from 'uikit'
import { DeserializedAutoFarm } from 'state/types'
import { getVelasScanLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import { TokenPairImage } from 'components/TokenImage'
import { paddingLeft } from 'styled-system'
import "./FarmCard.css";
import CardModal from '../CardModal/CardModal'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useLpTokenPrice } from 'state/autofarms/hooks'
import Balance from 'components/Balance'

export interface FarmWithStakedValue extends DeserializedAutoFarm {
  apr?: number
  apy?: number
  lpRewardsApr?: number
}

interface FarmCardProps {
  farm: FarmWithStakedValue
  apr?: number
  apy?: number
  cakePrice?: BigNumber
  account?: string
}

const FCard = styled.div`
  align-self: baseline;  
  background-color: #171b1fd9;
  border-radius: 8px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
  border: 2px solid transparent;
`

const FarmCard: React.FC<FarmCardProps> = ({ farm, apr, apy, cakePrice, account }) => {
  const lpPrice = useLpTokenPrice(farm.lpSymbol)

  // const totalLiquidity = useMemo(() => {
  //   if (farm.wantLockedTotal && farm.wantLockedTotal.gt(0)){
  //     let liquidity = getBalanceNumber(farm.wantLockedTotal.times(lpPrice))      
  //     let suffix = ""
  //     if (liquidity >= 1e5) {
  //       liquidity = liquidity / 1e6
  //       suffix = "M"
  //     }
  //     return `$${liquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })}${suffix}`
  //   }
  //     return ""
  // }, [farm, lpPrice])

  const totalLiquidity = useMemo(() => {
    if (farm.wantLockedTotal && farm.wantLockedTotal.gt(0)) {
      let liquidity = getBalanceNumber(farm.wantLockedTotal.times(lpPrice))
      let suffix = ""
      if (liquidity >= 1e5) {
        liquidity = liquidity / 1e6
        suffix = "M"
      }
      return {
        liquidity,
        suffix
      }
    }
    return {}
  }, [farm, lpPrice])

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase()
  const { stakedBalance } = farm.userData || {}
  const { wantLockedTotal, sharesTotal } = farm

  const fullBalance = useMemo(() => {
    if (!sharesTotal.gt(0)) return "0"
    // uint256 amount = user.shares.mul(wantLockedTotal).div(sharesTotal);
    return getFullDisplayBalance(stakedBalance.deflix.times(wantLockedTotal).div(sharesTotal), 18, 18)
  }, [stakedBalance, wantLockedTotal, sharesTotal])
  const fullBalanceNumber = new BigNumber(fullBalance)
  const fullBalanceValueFormatted = `$${formatNumber(fullBalanceNumber.times(lpPrice).toNumber(), 2)}`
  const hasStakedBalance = fullBalanceNumber.gt(0)
  let className = hasStakedBalance ? "fcard user-staked" : "fcard"

  // Feature VLX_BUSD LP, VLX_BITORB LP and VLX_USDT LP
  const featured = farm.lpSymbol === "VLX_BUSD LP" || farm.lpSymbol === "VLX_BITORB LP" || farm.lpSymbol === "VLX_USDT LP";
  if (featured) {
    className += " featured"
  }

  const displayApr = apr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  const displayApy = apy?.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const [onPresentCardModal] = useModal(
    <CardModal
      key={farm.ourPid}
      lpLabel={lpLabel}
      theirPid={farm.theirPid}
      account={account}
      displayApr={displayApr}
      displayApy={displayApy}
      stakedBalance={fullBalance}
      stakedDollarValue={fullBalanceValueFormatted}
    />
  )

  return (
    <FCard className={className} onClick={onPresentCardModal}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <TokenPairImage variant="inverted" primaryToken={farm.token} secondaryToken={farm.quoteToken} width={36} height={36} />
          <Text style={{ paddingLeft: "10px", width: "200px", textAlign: "left" }} fontSize="18px" fontWeight="bold">{lpLabel}<br /><Text fontSize="14px">{farm.theirFarm}</Text></Text>
        </Flex>
        <Flex flexDirection="column">
          <Text fontWeight="bold">{displayApy}%</Text>
          <Text>APY</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" marginTop="20px" style={{ color: "white" }}>
        <Flex flexDirection="column">
          <Balance color='#fff' fontSize='16px' value={totalLiquidity.liquidity} prefix='$' suffix={totalLiquidity.suffix} decimals={2} />
          <Text>TVL</Text>
        </Flex>
        {(featured && !hasStakedBalance) && (
            <Flex flexDirection="column">
              <Text fontWeight="bold">Featured</Text>
            </Flex>
        )}
        {hasStakedBalance && (
          <Flex flexDirection="column">
            <Balance color='#fff' fontSize='16px' value={fullBalanceNumber.times(lpPrice).toNumber()} decimals={2} prefix='$' />
            <Text>Your deposit</Text>
          </Flex>
        )}
      </Flex>
    </FCard>
  )
}

export default FarmCard
