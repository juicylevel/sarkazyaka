import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { completeEditTag } from './actions';

import AppHeader from './components/AppHeader';
import TagEditorWindow from './components/tags/TagEditorWindow';

const App = ({ editedTag, handleCloseTagEditor, children }) => (
    <div>
        <AppHeader />
        <div className="page-container">
            {children}
        </div>
        <TagEditorWindow 
            show={ !_.isEmpty(editedTag) } 
            tag={ editedTag } 
            title="Редактирование темы" 
            onClose={ handleCloseTagEditor }
        />
    </div> 
);


const mapStateToProps = (state) => ({
    editedTag: state.editedTag
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseTagEditor: () => dispatch(completeEditTag())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
