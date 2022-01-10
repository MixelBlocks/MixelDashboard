import { Component } from 'react';

import './App.scss';
import logo from './images/logo.png';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <img className="logo" src={logo} alt="Logo"></img>
                <h1>
                    Hier entsteht das WebDashboard für MixelBlocks. <a href="https://mixelblocks.de/">Website</a>
                </h1>
            </div>
        );
    }
}
