import { Component } from 'react';

import './LoginPage.scss';

import { AuthenticationLoginForm } from '../../helpers/authentication';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="LoginPage">
                <AuthenticationLoginForm />
            </div>
        );
    }
}
