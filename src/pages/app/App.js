import { Component } from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Authentication from '../../helpers/authentication';

import AppStart from './sites/index/AppStart';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Authentication required />
                <Routes>
                    <Route exact path="/" element={<AppStart />} />
                </Routes>
            </div>
        );
    }
}
