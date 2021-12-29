import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { Text } from 'uikit'

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string

}

interface BalanceProps extends TextProps {
  value?: number
  decimals?: number
  unit?: string
  prefix?: string
  suffix?: string
}

const StyledText = styled(Text)<TextProps>`
color: ${({ isDisabled, color, theme }) => (isDisabled ? theme.colors.textDisabled : color)};
`

const Balance: React.FC<BalanceProps> = ({ value, fontSize, color, decimals, isDisabled, unit, prefix, suffix }) => {
  const previousValue = useRef(0)
  
  useEffect(() => {
    previousValue.current = value
  }, [value])
  
  const showPrefix = Boolean(value && prefix)
  const showSuffix = Boolean(value && suffix)

  return (
    <StyledText bold color={color} fontSize={fontSize} isDisabled={isDisabled} style={{display: "inline"}}>
      {showPrefix && <span>{prefix}</span>}
      <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
      {value && unit && <span>{unit}</span>}
      {showSuffix && <span>{suffix}</span>}
    </StyledText>
  )
}

Balance.defaultProps = {
  fontSize: '32px',
  isDisabled: false,
  color: 'text',
  decimals: 3,
}

export default Balance
