import { Component } from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.scss';

import { refreshUserData } from '../../helpers/authentication';

import AppStart from './sites/index/AppStart';
import TeamStart from './sites/index/TeamStart';

export default class App extends Component {
    state = {
        user: null,
    };
    componentDidMount() {
        refreshUserData(this);
    }
    render() {
        return (
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<AppStart />} />
                    <Route path="/team/*" element={<TeamStart />} />
                </Routes>
            </div>
        );
    }
}
