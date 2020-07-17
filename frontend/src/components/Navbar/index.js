import React, { useState } from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap'

import { menuList } from 'utils/constants'

import LOGO from 'resources/images/logo.png'

import style from './style.module.scss'

const NavMenu = ({ user, onClickMenu, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar light expand="md" className={style.container}>
      <NavbarBrand><img width={50} alt="logo" src={LOGO} /></NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {menuList[user.role].map(menuItem => (
            <NavItem key={menuItem} className={style.menuItem} onClick={() => onClickMenu(menuItem)}>
              {menuItem}
            </NavItem>
          ))}
        </Nav>

        <NavbarText className={style.logout} onClick={onLogout}>Log Out</NavbarText>
      </Collapse>
    </Navbar>
  )
}

export default NavMenu
