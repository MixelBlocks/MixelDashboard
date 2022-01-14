import { Component } from 'react';

import './TeamStart.scss';

import { refreshUserData } from '../../../../helpers/authentication';

export default class TeamStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }
    componentDidMount() {
        refreshUserData(this, (user) => {
            if (!user?.groups?.includes('team')) window.location.href = '/app';
        });
    }
    render() {
        return (
            <div className="TeamStart">
                {this.state.user?.groups?.includes('team') ? (
                    <>
                        <div className="dashboard">TeamDashBoard</div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}
