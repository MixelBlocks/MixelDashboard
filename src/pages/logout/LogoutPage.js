import { Component } from 'react';

import './LogoutPage.scss';

import { AuthenticationLogout } from '../../helpers/authentication';

export default class LogoutPage extends Component {
    render() {
        return (
            <div className="LogoutPage">
                <AuthenticationLogout />
            </div>
        );
    }
}
