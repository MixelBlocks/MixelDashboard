import { Component } from 'react';

import './StartPage.scss';

import { AuthenticationLoginHeader } from '../../helpers/authentication';

export default class StartPage extends Component {
    render() {
        return (
            <div className="StartPage">
                <AuthenticationLoginHeader />
            </div>
        );
    }
}
