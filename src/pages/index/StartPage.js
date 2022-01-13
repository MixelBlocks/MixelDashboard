import { Component } from 'react';

import './StartPage.scss';

import Logo from '../../images/logo.png';

export default class StartPage extends Component {
    render() {
        return (
            <div className="StartPage">
                <img className="logo" src={Logo} alt="Logo"></img>
                <h1>
                    Hier entsteht das WebDashboard für MixelBlocks. <a href="https://mixelblocks.de/">Website</a>
                </h1>
            </div>
        );
    }
}
