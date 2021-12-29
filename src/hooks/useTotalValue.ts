import React from 'react'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useFarms, useLpTokenPrice } from 'state/autofarms/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedAutoFarm } from 'state/types'
import { getBalanceAmount } from 'utils/formatBalance'

const useTotalValue = (): BigNumber => {
    const farms = useFarms()
    let value = new BigNumber(0)
    const getLpTokenPrice = (farm: DeserializedAutoFarm) => {
        const farmTokenPriceInUsd = new BigNumber(farm.tokenPriceUsdt)
        let lpTokenPrice = BIG_ZERO
        if (farm.lpTotalSupply.gt(0) && farm.theirLpTotalInQuoteToken.gt(0)) {
            // Total value of base token in LP
            const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
            // Double it to get overall value in LP
            const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
            // Divide total value of all tokens, by the number of LP tokens
            const totalLpTokens = getBalanceAmount(farm.lpTotalSupply)
            lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
        }

        return lpTokenPrice
    }

    farms.data.forEach(farm => {
        if (farm.wantLockedTotal && farm.wantLockedTotal.gt(0)) {            
            const lpPrice = getLpTokenPrice(farm)
            let liquidity = farm.wantLockedTotal.times(lpPrice)
            value = value.plus(liquidity)
        }
    })

    return value;
}

export default useTotalValue