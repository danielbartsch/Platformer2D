// @flow

import React, { Component } from 'react'
import { toPairs } from 'lodash'
import styles from './App.css'
import Game from './Game'

let gamePad = {}

window.addEventListener('gamepadconnected', event => {
	gamePad = event.gamepad
})

window.addEventListener('gamepaddisconnected', () => {
	gamePad = {}
})

type State = { [keyboardButtonName: string]: boolean }

class App extends Component<{}, State> {
	state = {}

	handleKeyDown = (event: SyntheticEvent<HTMLDivElement>) => {
		event.preventDefault()
		this.setState({ [event.key]: true })
	}

	handleKeyUp = (event: SyntheticEvent<HTMLDivElement>) => {
		event.preventDefault()
		this.setState({ [event.key]: false })
	}

	render() {
		const pressedKeys = toPairs(this.state).filter(([, value]) => value)

		return (
			<div
				tabIndex="0"
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				className={styles.app}
			>
				<div className={styles.pressedKeys}>
					{pressedKeys}
				</div>
				<Game
					pressedKeys={pressedKeys}
					gamePad={gamePad}
					width={900}
					height={600}
				/>
			</div>
		)
	}
}

export default App
