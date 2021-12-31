import React from 'react'
import './App.css'
import AutoFarms from './views/Autofarms'
import Exchange from './components/Exchange'
import Header from './components/Header'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import styled from "styled-components"
import { usePollFarmsPublicData } from 'state/autofarms/hooks'
import { Flex } from 'uikit'
import SocialLinks from 'components/SocialLinks/SocialLinks'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const DocsDiv = styled.div`
text-align: center;
margin-top: 5px;
& > a {
  color: white;
}
& > a:hover {  
  font-size: 18px
}
`


const App: React.FC = () => {
  useEagerConnect()

  return (
    <>
      <Header />
      {/* <Exchange />       */}
      <AutoFarms />
      <SocialLinks />
      <DocsDiv style={{ textAlign: "center" }}><a href="https://docs.deflix.finance/">wiki</a></DocsDiv>      
      <div>&nbsp;</div>
    </>
  );
}

export default React.memo(App)
