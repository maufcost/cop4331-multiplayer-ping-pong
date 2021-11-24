import React from 'react'

import './game-room.css'

class GameRoom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            paddleHeight: 30,
            paddleWidth: 80,
            ballRadius: 25,
            halfPaddleHeight: this.paddleHeight / 2,
            speedPaddle1: 0,
            speedPaddle2: 0,
            positionPaddle1: window.innerWidth/2 - 40,
            positionPaddle2: (window.innerWidth/2) - 40,
            topPositionBall: 300,
            leftPositionBall: 100,
            topSpeedBall: 10,
            leftSpeedBall: 0,
            score1: 0,
            score2: 0,
            lives1: 3,
	    lives2: 3,
	    ballOwner: 0,
	    stylePaddle1: {},
            stylePaddle2: {},
            styleBall: {},
            roomStyle: {}
        }

        this.show = this.show.bind(this)
        this.goLeft = this.goLeft.bind(this)
        this.goRight = this.goRight.bind(this)
        this.startBall = this.startBall.bind(this)
    }

    componentDidMount() {
        // Use of keys for test only on browser. Use the
        // provided left and right buttons for mobile version.
        document.addEventListener('keydown', e => {

            // To move bottom paddle
            // key: left arrow
            if (e.keycode === 37 || e.which === 37) {
                this.setState({ speedPaddle1: -10 })
            }

            // key: right arrow
            if (e.keycode === 39 || e.which === 39) {
                this.setState({ speedPaddle1: 10 })
            }

            // To move top paddle (For testing purposes only)
            // key: a
            if (e.keycode === 65 || e.which === 65) {
                this.setState({ speedPaddle2: -10 })
            }

            // key: d
            if (e.keycode === 68 || e.which === 68) {
                this.setState({ speedPaddle2: 10 })
            }
        })

        document.addEventListener('keyup', e => {

            // key: left arrow
            if (e.keycode === 37 || e.which === 37) {
                this.setState({ speedPaddle1: 0 })
            }

            // key: right arrow
            if (e.keycode === 39 || e.which === 39) {
                this.setState({ speedPaddle1: 0 })
            }

            // To move top paddle (For testing purposes only)
            // key:
            if (e.keycode === 65 || e.which === 65) {
                this.setState({ speedPaddle2: 0 })
            }

            // key:
            if (e.keycode === 68 || e.which === 68) {
                this.setState({ speedPaddle2: 0 })
            }
        })

        // Start moving ball
        this.startBall()

        // 60 fps
        window.setInterval(this.show, 1000/60)
    }

    show() {
        // Paddle movement configuration
        let newPositionPaddle1 = this.state.positionPaddle1 + this.state.speedPaddle1
        let newPositionPaddle2 = this.state.positionPaddle2 + this.state.speedPaddle2

        // To prevent the paddles from going off boundaries
        if (newPositionPaddle1 < 1) {
            // 1 px away from the top
            newPositionPaddle1 = 1
        }

        if (newPositionPaddle1 >= window.innerWidth - this.state.paddleWidth) {
            newPositionPaddle1 = window.innerWidth - this.state.paddleWidth
        }

        if (newPositionPaddle2 < 1) {
            // 1 px away from the top
            newPositionPaddle2 = 1
        }

        if (newPositionPaddle2 >= window.innerWidth - this.state.paddleWidth) {
            newPositionPaddle2 = window.innerWidth - this.state.paddleWidth
        }

        // Ball movement configuration
        let newTopPositionBall = this.state.topPositionBall + this.state.topSpeedBall
        let newLeftPositionBall = this.state.leftPositionBall + this.state.leftSpeedBall
	let newLeftSpeedBall = this.state.leftSpeedBall
	let newTopSpeedBall = this.state.topSpeedBall
	let speedFactor = (Math.random() * 3 + 2)
        
	// To prevent the ball from going off boundaries
        // 10 pxs away from the LEFT
        if (newLeftPositionBall <= 0 || newLeftPositionBall >= window.innerWidth - this.state.ballRadius) {
            // This makes the ball bounce.
            console.log('bouncing...')

            newTopSpeedBall = Math.sign(newTopSpeedBall) * speedFactor
	    newLeftSpeedBall = -speedFactor
	    if( newLeftPositionBall <= 0 ){
		newLeftSpeedBall = speedFactor	
	    }
        }
		
	// Bounce for paddle 2
        if ( newTopPositionBall <= this.state.paddleHeight && newTopPositionBall >= 0 ) {
            console.log('bouncing!')

            if (newLeftPositionBall > newPositionPaddle2 && newLeftPositionBall < newPositionPaddle2 + this.state.paddleWidth) {
                // The ball bounces back from the paddle
                console.log('bouncing from paddle')
                newTopSpeedBall = speedFactor
		newLeftSpeedBall = Math.sign(newLeftSpeedBall) * speedFactor
            }
        }
	
	// Bounce for paddle 1
        if ( newTopPositionBall >= window.innerHeight - this.state.paddleHeight - this.state.ballRadius &&  newTopPositionBall <= window.innerHeight) {
            console.log('bouncing!')

            if (newLeftPositionBall > newPositionPaddle1 && newLeftPositionBall < newPositionPaddle1 + this.state.paddleWidth) {
                // The ball bounces back from the paddle
                console.log('bouncing from paddle')
                newTopSpeedBall = -speedFactor
		newLeftSpeedBall = Math.sign(newLeftSpeedBall) * speedFactor
            }
        }
	
	
        // Final state update for this function
        this.setState({
            positionPaddle1: newPositionPaddle1,
            positionPaddle2: newPositionPaddle2,
            stylePaddle1: { left: `${newPositionPaddle1}px` },
            stylePaddle2: { left: `${newPositionPaddle2}px` },
            topPositionBall: newTopPositionBall,
            leftPositionBall: newLeftPositionBall,
	    leftSpeedBall: newLeftSpeedBall,
	    topSpeedBall: newTopSpeedBall,
            styleBall: {
                top: `${newTopPositionBall}px`,
                left: `${newLeftPositionBall}px`
            }
        })
	
        let newLives1 = this.state.lives1
        let newLives2 = this.state.lives2

        if (newTopPositionBall >= window.innerHeight || newTopPositionBall <= 0 - this.state.ballRadius ) {
            console.log('point!')
	    this.startBall()	
        }
    }

    goLeft() {
        this.setState({ speedPaddle1: -10 })
    }

    goRight() {
        this.setState({ speedPaddle1: 10 })
    }

    startBall() {
        console.log('startBall called')
        // Initial ball positions
	let sTop = window.innerHeight/2
	let sLeft = window.innerWidth/2
        this.setState({
            topPositionBall: sTop,
            leftPositionBall: sLeft,
            styleBall: {
                top: `${sTop}px`,
                left: `${sLeft}px`
            }
        })

        let moveBy = 0
        if (Math.random() < 0.5) {
            // Start the ball moving to the right
            moveBy = 1
        }else {
            // Start the ball moving to the left
            moveBy = -1
        }
	
	let direction = 0
	let ownership = 0
        if (Math.random() < 0.5) {
            // Start the ball moving down
            direction = 1
	    ownership = 1
        }else {
            // Start the ball moving up
            direction = -1
	    ownership = 2
        }

        // The ball speeds can be changed here to make the ball
        // faster or slower
        const speedFactor = (Math.random() * 3 + 2) // nice params: 6 and 5
        this.setState({ leftSpeedBall: moveBy * speedFactor, topSpeedBall: direction * speedFactor, ballOwner: ownership })
    }

    render() {
        // console.log(this.state.styleBall.left)
        const stylePaddle1 = this.state.stylePaddle1
        const stylePaddle2 = this.state.stylePaddle2
        const styleBall = this.state.styleBall
        return (
            <div className="game-room" style={this.state.roomStyle}>
                <div className="paddle1" style={stylePaddle1}></div>
                <div className="ball" style={styleBall}></div>
                <div className="paddle2" style={stylePaddle2}></div>
                <footer>
                    <button onClick={this.goLeft}>Go left</button>
                    <button onClick={this.goRight}>Go right</button>
                </footer>
            </div>
        )
    }
}

export default GameRoom
