import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link, WarningIcon } from 'uikit'
import BigNumber from "bignumber.js"
import { parseUnits } from 'ethers/lib/utils'
import { formatBigNumber } from 'utils/formatBalance'

interface ModalInputProps {
  max: string
  dollarValue?: string
  lpPrice?: BigNumber
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 8px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;  
  padding: 0 8px;  
  border: 1px solid #d1d5db;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }  
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  dollarValue,
  lpPrice,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  decimals = 18,
}) => {
  const isBalanceZero = max === '0' || !max || isNaN(parseInt(max))

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }

    const balanceUnits = parseUnits(balance, decimals)
    return formatBigNumber(balanceUnits, decimals, decimals)
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px">{symbol}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Button scale="sm" onClick={onSelectMax}>MAX</Button>          
        </Flex>
        <Flex justifyContent="space-between" pl="16px">          
          <Text fontSize="14px">Balance: {displayBalance(max)} {dollarValue && <span>(~{dollarValue})</span>}</Text>          
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="warning">
          No tokens.
          {/* <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="warning">
            Get ${ symbol }
          </Link> */}
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
