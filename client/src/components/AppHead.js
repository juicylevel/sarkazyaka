import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import IconLabel from './IconLabel';

const AppHead = () => (
    <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">
                    <img src="/nicolas-sarkozy-header.png" alt="#сарказяка" />
                </Link>
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
                <NavItem href="#" onClick={() => browserHistory.push('/tags')}>
                    {<IconLabel icon="fa-tags" text="Тэги" />}
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

AppHead.propTypes = {

};

export default AppHead;