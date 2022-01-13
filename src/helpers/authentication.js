import { Component } from 'react';

import $ from 'jquery';

export class AuthenticationRequired extends Component {
    componentDidMount() {
        var token = localStorage.getItem('token');
        if (!token) {
            return (window.location.href = '/login');
        }
        fetch('https://api.mixelblocks.de/v1/auth/isAuthenticated', {
            method: 'POST',
            headers: new Headers({
                Authorization: token,
                'Content-Type': 'application/json',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) window.location.href = '/login';
            });
    }
    render() {
        return <></>;
    }
}

export class AuthenticationLoginForm extends Component {
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        var next = params.get('next');
        $('#submit').click((event) => {
            event.preventDefault();
            fetch('https://api.mixelblocks.de/v1/auth/authenticateUser', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    username: $('#username').val(),
                    password: $('#password').val(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) return console.error('ERROR');
                    localStorage.setItem('token', data.token);
                    if (!next) return (window.location.href = '/app');
                    window.location.href = next;
                });
        });
    }
    render() {
        return (
            <>
                <form>
                    <label>
                        <p>Username</p>
                        <input id="username" type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input id="password" type="password" />
                    </label>
                    <div>
                        <button id="submit" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export class AuthenticationLogout extends Component {
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        var next = params.get('next');
        var secure = params.get('secure');

        var token = localStorage.getItem('token');
        if (!token) {
            if (!next) return (window.location.href = '/');
            else return (window.location.href = next);
        }
        localStorage.removeItem('token');
        if (secure != null) {
            return fetch('https://api.mixelblocks.de/v1/auth/revokeToken', {
                method: 'POST',
                headers: new Headers({
                    Authorization: token,
                    'Content-Type': 'application/json',
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!next) return (window.location.href = '/');
                    window.location.href = next;
                });
        }

        if (!next) return (window.location.href = '/');
        window.location.href = next;
    }
    render() {
        return <></>;
    }
}

export class AuthenticationRegisterForm extends Component {
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        var next = params.get('next');
        $('#submit').click((event) => {
            event.preventDefault();
            fetch('https://api.mixelblocks.de/v1/auth/registerUser', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    username: $('#username').val(),
                    email: $('#email').val(),
                    password: $('#password').val(),
                    password_confirm: $('#password_confirm').val(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) return console.error('ERROR ' + data.message);
                    localStorage.setItem('token', data.token);
                    if (!next) return (window.location.href = '/app');
                    window.location.href = next;
                });
        });
    }
    render() {
        return (
            <>
                <form>
                    <label>
                        <p>Username</p>
                        <input id="username" type="text" />
                    </label>
                    <label>
                        <p>Email</p>
                        <input id="email" type="email" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input id="password" type="password" />
                    </label>
                    <label>
                        <p>Password Confirm</p>
                        <input id="password_confirm" type="password" />
                    </label>
                    <div>
                        <button id="submit" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default class Authentication extends Component {
    render() {
        return <>{this.props.required === true ? <AuthenticationRequired /> : <></>}</>;
    }
}

export function refreshUserData(conponent) {
    fetch('https://api.mixelblocks.de/v1/me', {
        method: 'POST',
        headers: new Headers({
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }),
    })
        .then((response) => response.json())
        .then((res) => {
            if (!res.error) conponent.setState({ user: res.user });
            else window.location.href = '/logout';
        })
        .catch((error) => {
            console.error(error);
        });
}
