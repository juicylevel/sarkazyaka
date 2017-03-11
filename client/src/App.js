import React from 'react';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import AppHeader from './components/AppHeader';
import TagEditorWindow from './components/tags/TagEditorWindow';

const App = ({ children }) => (
    <div>
        <AppHeader />
        <div className="page-container">
            {children}
        </div>
        <TagEditorWindow show={true} title="Создание тэга" />
    </div> 
)

export default App;
