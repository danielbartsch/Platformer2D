// @flow

import React, { Component } from 'react'
import { map, some, cloneDeep } from 'lodash'
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
	keyboardControls,
	gamepadControls,
} from './controllerUtils'
import { renderMenu } from './menuUtils'
import { setCanvasOptions } from './canvasUtils'
import styles from './App.css'

const menuEntities = []

let cameraX = 0
let cameraY = 0

let cameraXTarget = 0
let cameraYTarget = 0

let tick = 0

// $FlowFixMe
const req = require.context('./levels/', false, /^(.*\.(js$))[^.]*$/igm)
const levels = req.keys()

let currentLevel = 0

let level = req(levels[currentLevel]).default()

let isPaused = false

const pauseMenuItems = [
	{
		text: 'Resume',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: () => { isPaused = false },
	},
	{
		text: 'Next level',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: canvasContexts => {
			cameraX = 0
			cameraY = 0
			isPaused = false

			canvasContexts.forEach(context => context.clearRect(0, 0, context.canvas.width, context.canvas.height))

			level = req(levels[++currentLevel % levels.length]).default() // eslint-disable-line global-require
		},
	},
	{
		text: 'Restart',
		style: 'BlanchedAlmond',
		font: '23px Lucida Console',
		onActivate: () => {
			cameraX = 0
			cameraY = 0
			isPaused = false
			level = req(levels[currentLevel % levels.length]).default() // eslint-disable-line global-require
		},
	},
]
let selectedPauseMenuItemIndex = 0

type Props = { width: number, height: number }

let gamePad = null
const keys = {}

let gamePadBefore = null
let keysBefore = {}

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
		x: parseInt(cameraX, 10),
		y: parseInt(cameraY, 10),
		width: this.props.width,
		height: this.props.height,
	})

	camera = () => {
		if (!isPaused) {
			if (isUpPressed(keys, gamePad)) {
				const cameraTargetY = cameraYTarget - ((this.props.height / 2) - level.mainCharacter[0].height)
				cameraY += (cameraTargetY - cameraY) * (level.mainCharacter[0].maxVelocityY / 200)
			} else if (isDownPressed(keys, gamePad)) {
				const cameraTargetY = cameraYTarget + (this.props.height / 2)
				cameraY += (cameraTargetY - cameraY) * (level.mainCharacter[0].maxVelocityY / 200)
			} else if (cameraYTarget > cameraY) {
				// falling
				cameraY += (cameraYTarget - cameraY) * (level.mainCharacter[0].maxVelocityY / 125)
			} else {
				cameraY += (cameraYTarget - cameraY) * (level.mainCharacter[0].maxVelocityY / 200)
			}
			if (level.mainCharacter[0].velocityX > 2) {
				cameraXTarget = (level.mainCharacter[0].x - (this.props.width / 2)) + (this.props.width / 3)
				cameraX += (cameraXTarget - cameraX) * (level.mainCharacter[0].maxVelocityX / 150)
			} else if (level.mainCharacter[0].velocityX < -2) {
				cameraXTarget = (level.mainCharacter[0].x - (this.props.width / 2)) - (this.props.width / 3)
				cameraX += (cameraXTarget - cameraX) * (level.mainCharacter[0].maxVelocityX / 150)
			} else {
				cameraX += (cameraXTarget - cameraX) * (level.mainCharacter[0].maxVelocityX / 100)
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

		document.getElementById('camera').innerHTML = `cameraX: ${cameraX}\ncameraY: ${cameraY}\ncameraTargetX: ${cameraXTarget}\ncameraTargetY: ${cameraYTarget}`
		document.getElementById('mainCharacter').innerHTML = `character vx: ${level.mainCharacter[0].velocityX}\ncharacter vy: ${level.mainCharacter[0].velocityY}\ncharacter ax: ${level.mainCharacter[0].accelerationX}\ncharacter ay: ${level.mainCharacter[0].accelerationY}`
	}

	game = () => {
		if (isMenuPressed(keys, gamePad) && !isMenuPressed(keysBefore, gamePadBefore)) {
			isPaused = !isPaused
		}
		if (isPaused) {
			if (
				(isUpPressed(keys, gamePad) && !isUpPressed(keysBefore, gamePadBefore)) &&
				selectedPauseMenuItemIndex - 1 >= 0
			) {
				selectedPauseMenuItemIndex--
			} else if (
				(isDownPressed(keys, gamePad) && !isDownPressed(keysBefore, gamePadBefore)) &&
				selectedPauseMenuItemIndex + 1 <= pauseMenuItems.length - 1
			) {
				selectedPauseMenuItemIndex++
			} else if (isJumpPressed(keys, gamePad)) {
				pauseMenuItems[selectedPauseMenuItemIndex].onActivate([
					this.canvasBackgroundContext,
					this.canvasIndestructiblesContext,
					this.canvasDestructiblesContext,
					this.canvasEnemiesContext,
					this.canvasMainCharContext,
					this.canvasEffectsContext,
					this.canvasForegroundContext,
					this.canvasMenuContext,
				])
			}
		} else {
			if (isUpPressed(keys, gamePad)) {
				// look up
			}
			if (isDownPressed(keys, gamePad)) {
				// duck, look down
			}
			if (isLeftPressed(keys, gamePad)) {
				level.mainCharacter[0].velocityX = -level.mainCharacter[0].maxVelocityX
			} else if (isRightPressed(keys, gamePad)) {
				level.mainCharacter[0].velocityX = level.mainCharacter[0].maxVelocityX
			} else if (level.mainCharacter[0].velocityX < 0.1 && level.mainCharacter[0].velocityX > -0.1) {
				level.mainCharacter[0].velocityX = 0
			} else {
				level.mainCharacter[0].velocityX *= 0.8
			}
			if (isJumpPressed(keys, gamePad)) {
				if (level.mainCharacter[0].isStanding) {
					level.mainCharacter[0].accelerationY = level.mainCharacter[0].maxAccelerationY / 10
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
				.forEach((...args) => nextState(keys, gamePad, ...args))

			cameraXTarget = level.mainCharacter[0].x - (this.props.width / 2)
			cameraYTarget = level.mainCharacter[0].y - (this.props.height / 2)
		}
		keysBefore = cloneDeep(keys)
		gamePadBefore = cloneDeep(gamePad)
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
					<div id="keyboardControls" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
						Keyboard: <br />
						{map(keyboardControls, (buttonName, actionName) =>
							<div key={actionName}>{actionName}: {buttonName}</div>
						)}
					</div>
					<div id="gamePadControls" style={{ display: 'none' }}>
						GamePad: <br />
						{map(gamepadControls, (buttonIndex, actionName) =>
							<div key={actionName}>{actionName}: {getGamePadButtonNames(buttonIndex)}</div>
						)}
					</div>
					<span id="keyboard" /><br />
					<span id="gamepad" /><br />
					<pre style={{ top: 600, position: 'absolute', left: 200 }} id="camera" />
					<pre style={{ top: 600, position: 'absolute', left: 500 }} id="mainCharacter" />

				</div>
			</div>
		)
	}
}
