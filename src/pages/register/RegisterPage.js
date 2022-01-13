import { Component } from 'react';

import './RegisterPage.scss';

import { AuthenticationRegisterForm } from '../../helpers/authentication';

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="RegisterPage">
                <AuthenticationRegisterForm />
            </div>
        );
    }
}
