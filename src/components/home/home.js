import React from 'react'
import { navigate } from '@reach/router'

import './home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            gameRoomId: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeGameRoomId = this.onChangeGameRoomId.bind(this)
    }

    onChangeUsername(e) {
        const username = e.target.value
        this.setState({ username })
    }

    onChangeGameRoomId(e) {
        const gameRoomId = e.target.value
        this.setState({ gameRoomId })
    }

    render() {
        return (
            <div className="home">
                <div className="divider">
                    <label htmlFor="username">Your username:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="E.g. theWinner9000"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="divider">
                    <label htmlFor="game-room-id">The game room id you'd like to join:</label>
                    <input
                        id="game-room-id"
                        type="number"
                        placeholder="E.g. theWinner9000"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
            </div>
        )
    }
}

export default Home
