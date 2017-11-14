// @flow

import React, { Component } from 'react'
import styles from './App.css'
import Game from './Game'

type Props = { width: number, height: number }

export default class Menu extends Component<Props> {
	props: Props

	render() {
		const startmenu = true

		return startmenu ? (
			<div className={styles.app}>
				<Game
					width={900}
					height={600}
				/>
			</div>
		) : null
	}
}
