import React from 'react';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import AppHead from './components/AppHead';

const App = ({ children }) => (
    <div>
        <AppHead />
        <div className="page-container">
            {children}
        </div>
    </div> 
)

export default App;
