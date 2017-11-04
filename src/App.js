// @flow

import React, { Component } from 'react'
import { toPairs } from 'lodash'
import styles from './App.css'
import Game from './Game'

type State = { [keyboardButtonName: string]: boolean }

class App extends Component<{}, State> {
	state = {}

	handleKeyDown = (event: SyntheticEvent<HTMLDivElement>) => {
		if (event.key.length === 1) event.preventDefault()
		this.setState({ [event.key]: true })
	}

	handleKeyUp = (event: SyntheticEvent<HTMLDivElement>) => {
		if (event.key.length === 1) event.preventDefault()
		this.setState({ [event.key]: false })
	}

	render() {
		const pressedKeys = toPairs(this.state).filter(([, value]) => value).map(([key]) => key)

		return (
			<div
				tabIndex="0"
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				className={styles.app}
			>
				<Game
					pressedKeys={pressedKeys}
					width={900}
					height={600}
				/>
				<div className={styles.pressedKeys}>
					{pressedKeys}
				</div>
			</div>
		)
	}
}

export default App
