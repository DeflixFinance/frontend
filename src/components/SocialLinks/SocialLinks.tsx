import React from 'react'
import styled from 'styled-components'
import { Flex } from 'uikit'
import './SocialLinks.css'
import Twitter from "./Icons/Twitter"
import Telegram from "./Icons/Telegram"
import Medium from "./Icons/Medium"
import Github from "./Icons/Github"

function SocialLinks() {
    return (
        <Flex alignItems="center" className="socialLinks">
            <a href="https://twitter.com/DeflixFinance" target="_blank" rel="noreferrer"><Twitter width="32px" /></a>
            <a href="https://t.me/deflix" target="_blank" rel="noreferrer"><Telegram width="32px" /></a>
            <a href="https://deflix.medium.com/" target="_blank" rel="noreferrer"><Medium width="32px" /></a>
            <a href="https://github.com/DeflixFinance" target="_blank" rel="noreferrer"><Github width="27px" /></a>
        </Flex>
    )
}

export default SocialLinks
