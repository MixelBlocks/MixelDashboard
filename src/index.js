import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

import reportWebVitals from './modules/reportWebVitals';
import registerServiceWorker from './modules/registerServiceWorker';

import App from './pages/app/App';
import StartPage from './pages/index/StartPage';
import LoginPage from './pages/login/LoginPage';
import LogoutPage from './pages/logout/LogoutPage';
import RegisterPage from './pages/register/RegisterPage';
import ServerInfo from './pages/server-info/ServerInfo';

import authRequired from './helpers/authentication';

class Redirect extends React.Component {
    componentDidMount() {
        window.location.replace(this.props.to || '/');
    }
    render() {
        return <></>;
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<StartPage />} />
            <Route exact path="/server-info" element={<ServerInfo />} />
            <Route path="/app/*" element={authRequired(App)} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/logout" element={<LogoutPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/discord" element={<Redirect to="https://api.mixelblocks.de/discord" />} />
            <Route exact path="/website" element={<Redirect to="https://mixelblocks.de/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(process.env.NODE_ENV === 'production' ? null : console.log);
// register service worker for caching and faster page load
registerServiceWorker();
