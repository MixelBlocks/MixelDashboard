import { Component } from 'react';

import './LoginPage.scss';

import { AuthenticationLoginForm, getUserData, AuthenticationLoginHeader } from '../../helpers/authentication';

export default class LoginPage extends Component {
    componentDidMount() {
        console.log('Logged IN check');
        const params = new URLSearchParams(window.location.search);
        var next = params.get('next');
        getUserData().then((user) => {
            if (user != null) {
                console.log(user);
                if (!next) return (window.location.href = '/app');
                window.location.href = next;
            }
        });
    }
    render() {
        return (
            <div className="LoginPage">
                <AuthenticationLoginHeader />
                <AuthenticationLoginForm />
            </div>
        );
    }
}
