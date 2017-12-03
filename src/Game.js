// @flow

import React, { Component } from 'react'
import { map, some } from 'lodash'
import { drawRelatively } from './camera'
import { nextState, isInsideBounds, getDimensions } from './entityUtils'
import * as EntityTypes from './entityTypes'
import type { Entity } from './flowTypes'
import {
	getGamePadButtonNames,
	isLeftPressed,
	isRightPressed,
	isUpPressed,
	isDownPressed,
	isJumpPressed,
	isRunPressed,
} from './controllerUtils'
import { setCanvasOptions } from './canvasUtils'
import styles from './App.css'

const backgroundEntities: Array<Entity> = [
	{
		type: EntityTypes.BACKGROUND,
		...getDimensions(EntityTypes.BACKGROUND),
		accelerationX: 0,
		accelerationY: 0,
		maxAccelerationX: 0,
		maxAccelerationY: 0,
		maxVelocityX: 0,
		maxVelocityY: 0,
		velocityX: 0,
		velocityY: 0,
		isObstacle: false,
		isStanding: false,
		x: -10,
		y: -10,
	},
]

/* eslint-disable max-len */
const indestructibleEntities: Array<Entity> = [
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 0, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 50, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 100, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 150, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 200, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 250, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 300, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 200, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 100, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 0, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: -100, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -110, y: 350, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -110, y: 250, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -110, y: 150, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -110, y: 50, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -110, y: -50, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 100, y: 380, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 120, y: 380, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 140, y: 380, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 140, y: 360, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 160, y: 340, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 290, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 310, y: 420, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 330, y: 440, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 350, y: 460, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 370, y: 480, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 390, y: 500, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 410, y: 520, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 430, y: 540, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 450, y: 560, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 470, y: 580, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 490, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 510, y: 620, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
]
/* eslint-enable */

const destructibleEntities: Array<Entity> = []
const enemyEntities: Array<Entity> = []
const mainCharacter: Array<Entity> = [
	{
		type: EntityTypes.MAIN_CHARACTER,
		...getDimensions(EntityTypes.MAIN_CHARACTER),
		x: 30,
		y: 300,
		velocityX: 0,
		velocityY: 0,
		accelerationX: 0,
		accelerationY: 0.9,
		maxVelocityX: 3,
		maxVelocityY: 12,
		maxAccelerationX: 0.2,
		maxAccelerationY: 0.9,
		isStanding: false,
		isObstacle: true,
	},
]
const effectEntities: Array<Entity> = []

let cameraX = 0
let cameraY = 0

let tick = 0

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
	drawInterval: number
	gameInterval: number
	cameraInterval: number

	props: Props

	getCameraBounds = () => ({
		x: (mainCharacter[0].x - (this.props.width / 2)) + cameraX,
		y: (mainCharacter[0].y - (this.props.height / 2)) + cameraY,
		width: this.props.width,
		height: this.props.height,
	})

	camera = () => {
		if (isUpPressed(keys, gamePad)) {
			cameraY = cameraY - 2 > (-this.props.height / 2) + mainCharacter[0].height ? cameraY - 2 : cameraY
		} else if (isDownPressed(keys, gamePad)) {
			cameraY = cameraY + 2 < (this.props.height / 2) ? cameraY + 2 : cameraY
		} else {
			cameraY *= 0.9
		}
		if (mainCharacter[0].velocityX > 2) {
			cameraX = cameraX + 2 < (this.props.width / 2) ? cameraX + 2 : cameraX
		} else if (mainCharacter[0].velocityX < -2) {
			cameraX = cameraX - 2 > (-this.props.width / 2) + mainCharacter[0].width ? cameraX - 2 : cameraX
		} else {
			cameraX *= 0.98
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
		document.getElementById('mainCharacter').innerHTML = JSON.stringify(mainCharacter[0], undefined, 4)
	}

	game = () => {
		tick++

		if (isUpPressed(keys, gamePad)) {
			// look up
		}
		if (isDownPressed(keys, gamePad)) {
			// duck
		}
		if (isLeftPressed(keys, gamePad)) {
			// walk left
			mainCharacter[0].velocityX = -mainCharacter[0].maxVelocityX
		} else if (isRightPressed(keys, gamePad)) {
			// walk right
			mainCharacter[0].velocityX = mainCharacter[0].maxVelocityX
		} else if (mainCharacter[0].velocityX < 0.1 && mainCharacter[0].velocityX > -0.1) {
			mainCharacter[0].velocityX = 0
		} else {
			mainCharacter[0].velocityX *= 0.8
		}
		if (isJumpPressed(keys, gamePad)) {
			// jump

			if (mainCharacter[0].isStanding) {
				mainCharacter[0].accelerationY = mainCharacter[0].maxAccelerationY
				mainCharacter[0].velocityY = -mainCharacter[0].maxVelocityY
				mainCharacter[0].isStanding = false
			}
		}
		if (isRunPressed(keys, gamePad)) {
			// run
			mainCharacter[0].maxVelocityX = 6
		} else {
			mainCharacter[0].maxVelocityX = 3
		}

		const { x, y, width, height } = this.getCameraBounds()

		backgroundEntities.concat(
			indestructibleEntities,
			destructibleEntities,
			enemyEntities,
			effectEntities,
			mainCharacter,
		)
			.filter(entity => isInsideBounds(entity, x - 20, y - 20, width + 40, height + 40))
			.forEach(nextState)
	}

	draw = () => {
		const { x, y, width, height } = this.getCameraBounds();
		[
			[this.canvasBackgroundContext, backgroundEntities],
			[this.canvasIndestructiblesContext, indestructibleEntities],
			[this.canvasDestructiblesContext, destructibleEntities],
			[this.canvasEnemiesContext, enemyEntities],
			[this.canvasMainCharContext, mainCharacter],
			[this.canvasEffectsContext, effectEntities],
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
				<div className={styles.pressedKeys}>
					<span id="keyboard" /><br />
					<span id="gamepad" />
					<pre style={{ top: 560, position: 'relative' }} id="mainCharacter" />
				</div>
			</div>
		)
	}
}
