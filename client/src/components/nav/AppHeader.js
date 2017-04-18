import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';
import SplittedNavButton from './SplittedNavButton';
import { displayRecords, createRecord } from '../../actions/record';
import { displaySubjects, createSubject } from '../../actions/subject';

const AppHeader = (props) => (
    <Navbar fixedTop collapseOnSelect inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">
                    <img src="./nicolas-sarkozy-header.png" alt="#сарказяка" />
                </Link>
                <span>#сарказяка</span>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Navbar.Form pullLeft>
                <SplittedNavButton 
                    text="Сарказяки" 
                    icon="th-large"
                    optionIcon="plus" 
                    onClick={ props.handleClickRecords } 
                    onOption={ props.handleCreateRecord } 
                />
                <SplittedNavButton 
                    text="Темы" 
                    icon="tags"
                    optionIcon="plus" 
                    onClick={ props.handleClickSubjects } 
                    onOption={ props.handleCreateSubject } 
                />
            </Navbar.Form> 
        </Navbar.Collapse>
    </Navbar>
);

const mapDispatchToProps = (dispatch) => ({
    handleClickRecords:  () => dispatch(displayRecords()),
    handleCreateRecord:  () => dispatch(createRecord()),
    handleClickSubjects: () => dispatch(displaySubjects()),
    handleCreateSubject: () => dispatch(createSubject())
});

export default connect(null, mapDispatchToProps)(AppHeader);