import React from 'react'
import styled from 'styled-components'
import UserMenu from './UserMenu'

const NavBar = styled.nav`
    background-image: url(logo.svg);
    background-repeat: no-repeat;
    padding-left: 70px;
    background-position-x: 10px;
`


function Header() {    
    return (
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark shadow">
            <NavBar className="container-fluid">
                <a className="navbar-brand fs-2 ms-2" href="/">Deflix</a>
                <div className="container-fluid d-none d-sm-block"></div>
                <UserMenu/>
            </NavBar>
        </nav>
    )
}

export default Header
