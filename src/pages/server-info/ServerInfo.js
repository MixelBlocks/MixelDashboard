import { Component } from 'react';

import './ServerInfo.scss';

let x = { description: { extra: [{ color: 'dark_green', text: 'Mixel' }, { color: 'dark_green', text: 'Blocks ' }, { color: 'dark_aqua', text: 'Network ' }, { text: '[' }, { color: 'blue', text: 'UNDER DEVELOPMENT' }, { text: ']\n' }, { text: 'Besuche unsere Website https://mixelblocks.de/' }], text: '' } };

export default class ServerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverImage: null,
            version: '',
            motd: [],
            players_online: 0,
            players_max: 0,
        };
    }
    async fetchProxData() {
        var result = await fetch('https://eu.mc-api.net/v3/server/ping/proxy.mixelblocks.de');
        var data = await result.json();
        console.log(data);
        var motd = '';
        data.description.extra.forEach((element) => {
            motd += `<span ${element.color ? 'style="color:' + element.color.replace('_', '') + '"' : ''}>${element.text.replace('\n', '<br />')}</span>`;
        });
        if (data) {
            this.setState({
                version: data.version.name,
            });
            this.setState({
                motd: motd,
            });
            this.setState({
                players_online: data.players.online,
            });
            this.setState({
                players_max: data.players.max,
            });
            this.setState({
                serverImage: data.favicon_base64,
            });
        }
    }
    componentDidMount() {
        this.fetchProxData();
        document.querySelector('#refresh').addEventListener('click', (event) => {
            event.preventDefault();
            this.fetchProxData();
        });
    }
    render() {
        return (
            <div className="ServerInfo">
                <div className="proxyInfo">
                    {this.state.serverImage ? <img className="serverIcon" src={this.state.serverImage} alt="ServerLogo"></img> : <></>}
                    <p className="txt">
                        Server: <br />
                        <br />
                        <span id="server" className="value">
                            {this.state.version}
                        </span>
                    </p>
                    <br />
                    <br />
                    <p className="txt">
                        MOTD: <br />
                        <br />
                        <span id="motd" className="value" dangerouslySetInnerHTML={{ __html: this.state.motd }}></span>
                    </p>
                    <br />
                    <br />
                    <p className="txt">
                        Spieler: <br />
                        <br />
                        <span id="players" className="value">
                            {this.state.players_online} / {this.state.players_max}
                        </span>
                    </p>
                    <br />
                    <br />
                    <button id="refresh" className="refreshButton">
                        Aktualisieren
                    </button>
                </div>
            </div>
        );
    }
}
