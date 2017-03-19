import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import IconLabel from './IconLabel';

const AppHeader = () => (
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
                <NavDropdown title={<IconLabel icon="list" text="Сарказяки" />} id="filter-dropdown">
                    <MenuItem>Все</MenuItem>
                    <MenuItem>Мои</MenuItem>
                </NavDropdown>
                <NavItem href="#">{<IconLabel icon="plus-square" text="Новая" />}</NavItem>
                <NavDropdown id="tags-dropdown" title={<IconLabel icon="tags" text="Темы" />}>
                    <MenuItem>
                        <IconLabel icon="list" text="Показать все" href="/tags" />
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                        <IconLabel icon="plus-square" text="Создать новый" />
                    </MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default AppHeader;