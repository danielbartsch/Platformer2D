// @flow

import React, { Component } from 'react'
import { map, some } from 'lodash'
import { drawRelatively } from './camera'
import { nextState, isInsideBounds } from './entityUtils'
import type { Bounds } from './flowTypes'
import {
	getGamePadButtonNames,
	isLeftPressed,
	isRightPressed,
	isUpPressed,
	isDownPressed,
	isJumpPressed,
	isRunPressed,
	isMenuPressed,
} from './controllerUtils'
import { renderMenu } from './menuUtils'
import { setCanvasOptions } from './canvasUtils'
import styles from './App.css'

const menuEntities = []

let cameraX = 0
let cameraY = 0

let tick = 0

let level = require('./levels/test').default()

let isPaused = false

const pauseMenuItems = [
	{
		text: 'Resume',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: () => { isPaused = false },
	},
	{
		text: 'Levels',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: () => {}, // nothing just yet
	},
	{
		text: 'Restart',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: () => {
			isPaused = false
			level = require('./levels/test').default() // eslint-disable-line global-require
		},
	},
]
let selectedPauseMenuItemIndex = 0

type Props = { width: number, height: number }

let gamePad = null
const keys = {}

window.addEventListener('gamepadconnected', event => {
	gamePad = event.gamepad
})

window.addEventListener('gamepaddisconnected', () => {
	gamePad = null
})

window.addEventListener('keydown', event => {
	if (event.key.length === 1) event.preventDefault()
	keys[event.key] = true
})

window.addEventListener('keyup', event => {
	if (event.key.length === 1) event.preventDefault()
	keys[event.key] = false
})

export default class Game extends Component<Props> {
	canvasBackgroundContext: ?CanvasRenderingContext2D
	canvasIndestructiblesContext: ?CanvasRenderingContext2D
	canvasDestructiblesContext: ?CanvasRenderingContext2D
	canvasEnemiesContext: ?CanvasRenderingContext2D
	canvasMainCharContext: ?CanvasRenderingContext2D
	canvasEffectsContext: ?CanvasRenderingContext2D
	canvasForegroundContext: ?CanvasRenderingContext2D
	canvasMenuContext: ?CanvasRenderingContext2D
	drawInterval: number
	gameInterval: number
	cameraInterval: number

	props: Props

	getCameraBounds = (): Bounds => ({
		x: (level.mainCharacter[0].x - (this.props.width / 2)) + cameraX,
		y: (level.mainCharacter[0].y - (this.props.height / 2)) + cameraY,
		width: this.props.width,
		height: this.props.height,
	})

	camera = () => {
		if (!isPaused) {
			if (isUpPressed(keys, gamePad)) {
				cameraY = cameraY - 2 > (-this.props.height / 2) + level.mainCharacter[0].height ? cameraY - 2 : cameraY
			} else if (isDownPressed(keys, gamePad)) {
				cameraY = cameraY + 2 < (this.props.height / 2) ? cameraY + 2 : cameraY
			} else {
				cameraY *= 0.9
			}
			if (level.mainCharacter[0].velocityX > 2) {
				cameraX = cameraX + 2 < (this.props.width / 2) ? cameraX + 2 : cameraX
			} else if (level.mainCharacter[0].velocityX < -2) {
				cameraX = cameraX - 2 > (-this.props.width / 2) + level.mainCharacter[0].width ? cameraX - 2 : cameraX
			} else {
				cameraX *= 0.98
			}
		}
		// $FlowFixMe
		document.getElementById('keyboard').innerHTML = some(keys, key => key) ?
			`Keyboard: ${
				map(
					keys,
					(value, key) => ({ value, key })
				).filter(
					({ value }) => value
				).map(
					({ key }) => key
				)
			}` :
			''
		// $FlowFixMe
		document.getElementById('gamepad').innerHTML = gamePad && some(gamePad.buttons, ({ pressed }) => pressed) ?
			`GamePad: ${
				gamePad.buttons.map(
					(button, index) => ({ isPressed: button.pressed, index })
				).filter(
					({ isPressed }) => isPressed
				).map(
					({ index }) => getGamePadButtonNames(index)
				)
			}` :
			''

		// $FlowFixMe
		document.getElementById('mainCharacter').innerHTML = JSON.stringify(level.mainCharacter[0], undefined, 4)
	}

	game = () => {
		if (isMenuPressed(keys, gamePad)) {
			isPaused = true
		}
		if (isPaused) {
			if (isUpPressed(keys, gamePad) && selectedPauseMenuItemIndex - 1 >= 0) {
				selectedPauseMenuItemIndex--
			} else if (isDownPressed(keys, gamePad) && selectedPauseMenuItemIndex + 1 <= pauseMenuItems.length - 1) {
				selectedPauseMenuItemIndex++
			} else if (isJumpPressed(keys, gamePad)) {
				pauseMenuItems[selectedPauseMenuItemIndex].onActivate()
			}
		} else {
			if (isUpPressed(keys, gamePad)) {
				// look up
			}
			if (isDownPressed(keys, gamePad)) {
				// duck
			}
			if (isLeftPressed(keys, gamePad)) {
				// walk left
				level.mainCharacter[0].velocityX = -level.mainCharacter[0].maxVelocityX
			} else if (isRightPressed(keys, gamePad)) {
				// walk right
				level.mainCharacter[0].velocityX = level.mainCharacter[0].maxVelocityX
			} else if (level.mainCharacter[0].velocityX < 0.1 && level.mainCharacter[0].velocityX > -0.1) {
				level.mainCharacter[0].velocityX = 0
			} else {
				level.mainCharacter[0].velocityX *= 0.8
			}
			if (isJumpPressed(keys, gamePad)) {
				// jump

				if (level.mainCharacter[0].isStanding) {
					level.mainCharacter[0].accelerationY = level.mainCharacter[0].maxAccelerationY
					level.mainCharacter[0].velocityY = -level.mainCharacter[0].maxVelocityY
					level.mainCharacter[0].isStanding = false
				}
			}
			if (isRunPressed(keys, gamePad)) {
				// run
				level.mainCharacter[0].maxVelocityX = 6
			} else {
				level.mainCharacter[0].maxVelocityX = 3
			}

			tick++

			const { x, y, width, height } = this.getCameraBounds()

			level.backgroundEntities.concat(
				level.indestructibleEntities,
				level.destructibleEntities,
				level.enemyEntities,
				level.effectEntities,
				level.mainCharacter,
				level.foreGroundEntities,
			)
				.filter(entity => isInsideBounds(
					entity,
					{
						x: x - 20,
						y: y - 20,
						width: width + 40,
						height: height + 40,
					}
				))
				.forEach(nextState)
		}
	}

	draw = () => {
		if (isPaused) {
			const context = this.canvasMenuContext
			if (context) {
				context.clearRect(0, 0, this.props.width, this.props.height)

				renderMenu(
					context,
					{
						x: this.props.width / 6,
						y: this.props.height / 6,
						width: this.props.width / 1.5,
						height: this.props.height / 1.5,
					},
					'rgba(0,0,0,0.7)',
					'Paused',
					'rgba(255,255,255,0.5)',
					'46px Lucida Console',
					pauseMenuItems.map((item, index) => ({
						...item,
						isSelected: index === selectedPauseMenuItemIndex,
					})),
				)
			}
		} else {
			if (this.canvasMenuContext) {
				this.canvasMenuContext.clearRect(0, 0, this.props.width, this.props.height)
			}
			const { x, y, width, height } = this.getCameraBounds();
			[
				[this.canvasBackgroundContext, level.backgroundEntities],
				[this.canvasIndestructiblesContext, level.indestructibleEntities],
				[this.canvasDestructiblesContext, level.destructibleEntities],
				[this.canvasEnemiesContext, level.enemyEntities],
				[this.canvasMainCharContext, level.mainCharacter],
				[this.canvasEffectsContext, level.effectEntities],
				[this.canvasForegroundContext, level.foreGroundEntities],
				[this.canvasMenuContext, menuEntities],
			].forEach(([context, entities]) => {
				if (context) {
					drawRelatively(
						tick,
						context,
						entities,
						this.props.width,
						this.props.height,
						width,
						height,
						x,
						y,
					)
				}
			})
		}
	}

	componentDidMount() {
		this.cameraInterval = setInterval(this.camera, 16)
		this.gameInterval = setInterval(this.game, 16)
		this.drawInterval = setInterval(this.draw, 16)
	}

	render() {
		const { width, height } = this.props
		return (
			<div>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasBackgroundContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasBackgroundContext)
					}}
				>
                    Background Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasIndestructiblesContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasIndestructiblesContext)
					}}
				>
                    Indestructibles Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasDestructiblesContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasDestructiblesContext)
					}}
				>
                    Destructibles Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasEnemiesContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasEnemiesContext)
					}}
				>
                    Enemies Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasMainCharContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasMainCharContext)
					}}
				>
                    MainChar Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasEffectsContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasEffectsContext)
					}}
				>
                    Effects Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasForegroundContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasForegroundContext)
					}}
				>
                    Foreground Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => {
						this.canvasMenuContext = ref && ref.getContext('2d')
						setCanvasOptions(this.canvasMenuContext)
					}}
				>
                    Menu Canvas
				</canvas>
				<div className={styles.pressedKeys}>
					<span id="keyboard" /><br />
					<span id="gamepad" />
					<pre style={{ top: 560, position: 'relative' }} id="mainCharacter" />
				</div>
			</div>
		)
	}
}
