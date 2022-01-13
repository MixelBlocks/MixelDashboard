import { Component } from 'react';

import './AppStart.scss';

import { refreshUserData } from '../../../../helpers/authentication';

export default class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }
    componentDidMount() {
        refreshUserData(this);
    }
    render() {
        return (
            <div className="AppStart">
                <h1>Willkommen in Dashboard {this.state.user ? this.state.user.username : <></>}</h1>
            </div>
        );
    }
}
