import { Component } from 'react';

import './AppStart.scss';

import { refreshUserData, AuthenticationLoginHeader } from '../../../../helpers/authentication';

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
                <AuthenticationLoginHeader />
                {this.state.user?.username ? (
                    <>
                        <div className="dashboard">DashBoard</div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}
