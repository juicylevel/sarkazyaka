import React from 'react';
import { connect } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';
import './App.css';

import AppHeader from './components/nav/AppHeader';
import SubjectEditorWindow from './components/subject/SubjectEditorWindow';

const App = ({ subject, children }) => (
    <div>
        <AppHeader />
        <div className="page-container">
            {children}
        </div>
        <SubjectEditorWindow show={ subject.display } />
    </div> 
);

const mapStateToProps = (state) => ({
    subject: state.subject
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
