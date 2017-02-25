import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import AppHead from './components/AppHead';

class App extends Component {
    render() {
        return (
            <div>
                <AppHead />
            </div> 
        );
    }
}

export default App;
