// @flow

import React from 'react'
import styles from './App.css'
import Game from './Game'

export default () => (
	<div className={styles.app}>
		<Game
			width={900}
			height={600}
		/>
	</div>
)
