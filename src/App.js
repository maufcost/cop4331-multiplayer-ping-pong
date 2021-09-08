import React from 'react'
import { Router } from '@reach/router'

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
