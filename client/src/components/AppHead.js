import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import IconLabel from './IconLabel';

const AppHead = () => (
    <Navbar collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">
                    <img src="/nicolas-sarkozy-header.png" alt="#сарказяка" />
                </a>
                <span>#сарказяка</span>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavDropdown title={<IconLabel icon="fa-list" text="Сарказяки" />} id="filter-nav-dropdown">
                    <MenuItem>Все</MenuItem>
                    <MenuItem>Мои</MenuItem>
                </NavDropdown>
                <NavItem href="#">{<IconLabel icon="fa-plus-square" text="Новая" />}</NavItem>
                <NavItem href="#">{<IconLabel icon="fa-tags" text="Тэги" />}</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

AppHead.propTypes = {

};

export default AppHead;