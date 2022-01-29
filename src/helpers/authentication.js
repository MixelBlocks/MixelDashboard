import { Component } from 'react';

import $ from 'jquery';

import './authentication.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Logo from '../images/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faGlobe, faSignature } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

import alertify from './alertify';
alertify.defaults.transition = 'pulse';
alertify.defaults.theme.ok = 'btn btn-primary';
alertify.defaults.theme.cancel = 'btn btn-danger';
alertify.defaults.theme.input = 'form-control';

export class AuthenticationLoginHeader extends Component {
    state = {
        user: null,
    };
    componentDidMount() {
        refreshUserData(this);
    }
    componentDidUpdate() {
        $('#header-submit').click((event) => {
            event.preventDefault();
            fetch('https://api.mixelblocks.de/v1/auth/authenticateUser', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    username: $('#header-username').val(),
                    password: $('#header-password').val(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        switch (data.message) {
                            case 'unknownUser':
                                alertify.error('Der angegebene Benutzer existiert nicht!');
                                return;
                            case 'passwordMismatch':
                                alertify.error('Das eingegebene Passwort ist falsch!');
                                return;
                            default:
                                alertify.error('Unbekannter Error beim Login');
                                return;
                        }
                    }
                    localStorage.setItem('token', data.token);
                    refreshUserData(this);
                    alertify.success('Du bist nun angemeldet!');
                });
        });
        $('#header-logout').click((event) => {
            event.preventDefault();
            alertify.confirm(
                'Möchtest du dich wirklich abmelden?',
                () => {
                    localStorage.removeItem('token');
                    refreshUserData(this);
                    alertify.error('Du bist nun abgemeldet!');
                },
                () => {
                    alertify.error('Abmelden abgebrochen');
                }
            );
        });
        $('#header-register').click((event) => {
            event.preventDefault();
            window.location.href = '/register';
        });
    }
    openExternalURL(uri) {
        window.open(uri, '_blank');
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand href={window.location.pathname === '/' ? '#' : '/'}>
                        <img alt="Logo" src={Logo} width="30" height="30" className="d-inline-block align-top" /> MixelBlocks | Dashboard
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
                            <NavDropdown title="Externe Links" id="navbarScrollingDropdown">
                                <NavDropdown.Item target="_blank" href="https://mixelblocks.de/">
                                    <FontAwesomeIcon icon={faGlobe} /> Website
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item target="_blank" href="https://api.mixelblocks.de/github">
                                    <FontAwesomeIcon icon={faGithub} /> Github
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item target="_blank" href="https://api.mixelblocks.de/discord">
                                    <FontAwesomeIcon icon={faDiscord} /> Discord
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {this.state.user ? (
                            <Nav>
                                <Nav.Link href="/app/">Dashboard</Nav.Link>
                                {this.state.user?.groups?.includes('team') ? <Nav.Link href="/app/team/">Team Dashboard</Nav.Link> : <></>}
                                <Button title="Ausloggen" id="header-logout" variant="outline-danger" className="me-1">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </Button>
                            </Nav>
                        ) : (
                            <Form className="d-flex">
                                <FormControl id="header-username" type="text" size="sm" placeholder="Username oder Email" className="me-1" aria-label="Username oder Email" />
                                <FormControl id="header-password" type="password" size="sm" placeholder="Passwort" className="me-1" aria-label="Passwort" />
                                <Button title="Einloggen" id="header-submit" variant="outline-success" className="me-1">
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                </Button>
                                <Button title="Für das Dashboard Registrieren" id="header-register" variant="outline-warning" className="me-1">
                                    <FontAwesomeIcon icon={faSignature} />
                                </Button>
                            </Form>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
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
                    if (data.error) {
                        switch (data.message) {
                            case 'unknownUser':
                                alertify.error('Der angegebene Benutzer existiert nicht!');
                                return;
                            case 'passwordMismatch':
                                alertify.error('Das eingegebene Passwort ist falsch!');
                                return;
                            default:
                                alertify.error('Unbekannter Error beim Login');
                                return;
                        }
                    }
                    localStorage.setItem('token', data.token);
                    if (!next) return (window.location.href = '/app');
                    window.location.href = next;
                });
        });
    }
    render() {
        return (
            <div className="LoginFormHolder">
                <div className="login-background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form className="loginForm">
                    <h3>Dashboard Login</h3>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Email oder Username" id="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Passwort" id="password" />
                    <button id="submit">Log In</button>
                </form>
            </div>
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
        return <>Logout Prozess...</>;
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
                    if (data.error) {
                        switch (data.message) {
                            case 'passwordStrengthInvalid':
                                alertify.error('Dein Passwort ist ungültig!');
                                return;
                            case 'userExists':
                                alertify.error('Der angegebene Benutzer existiert bereits!');
                                return;
                            case 'mailExists':
                                alertify.error('Die angegebene Email wird bereits verwendet!');
                                return;
                            case 'passwordMismatch':
                                alertify.error('Die Passwörter stimmen nicht überein!');
                                return;
                            default:
                                alertify.error('Unbekannter Error beim Login');
                                return;
                        }
                    }
                    localStorage.setItem('token', data.token);
                    if (!next) return (window.location.href = '/app');
                    window.location.href = next;
                });
        });
    }
    render() {
        return (
            <div className="LoginFormHolder">
                <div className="login-background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form className="loginForm">
                    <h3>Registrieren im Dashboard</h3>
                    <input type="text" placeholder="Username" id="username" />
                    <input type="text" placeholder="mail@example.com" id="email" />
                    <input type="password" placeholder="Passwort" id="password" />
                    <input type="password" placeholder="Passwort Bestätigung" id="password_confirm" />
                    <button id="submit">Registrieren</button>
                </form>
            </div>
        );
    }
}

export function refreshUserData(conponent, callback) {
    getUserData().then((user) => {
        conponent.setState({ user: user });
        if (callback) callback(user);
    });
}

export async function getUserData() {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem('token');
        if (!token) return resolve(null);
        fetch('https://api.mixelblocks.de/v1/me', {
            method: 'POST',
            headers: new Headers({
                Authorization: token,
                'Content-Type': 'application/json',
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (!res.error) return resolve(res.user);
                else resolve(null);
            })
            .catch((error) => {
                console.error(error);
                return resolve(null);
            });
    });
}

var authRequired = (ComposedComponent) => {
    class RequireAuth extends Component {
        state = {
            isAuthenticated: false,
        };

        componentDidMount() {
            const params = new URLSearchParams(window.location.search);
            var next = params.get('next');
            getUserData().then((user) => {
                this.setState({ isAuthenticated: user != null });
                if (!this.state.isAuthenticated) {
                    if (!next) return (window.location.href = '/login');
                    window.location.href = '/login?next=' + next;
                }
            });
        }

        render() {
            return this.state.isAuthenticated ? <ComposedComponent {...this.props} /> : <></>;
        }
    }

    return <RequireAuth />;
};

export default authRequired;
