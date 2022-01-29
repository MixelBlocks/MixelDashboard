import { Component } from 'react';

import './StartPage.scss';

import { AuthenticationLoginHeader } from '../../helpers/authentication';

export default class StartPage extends Component {
    render() {
        return (
            <div className="StartPage">
                <AuthenticationLoginHeader />
                <br />
                <br />
                <br />
                <br />
                <br />
                <center>Hier entsteht das Web Dashboard für das mixelblock.de Minecraft Server Netzwerk</center>
            </div>
        );
    }
}
