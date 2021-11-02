import React from 'react'
import { Router } from '@reach/router'

import Home from './components/home/home'
import GameRoom from './components/game-room/game-room'

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Home path="/" />
                    <GameRoom path="/game-room/:id" />
                </Router>
            </div>
        )
    }
}

export default App;
