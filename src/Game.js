// @flow

import React, { Component } from 'react'
import { map, some } from 'lodash'
import { drawRelatively } from './camera'
import { nextState, nextAccelerationX, isInsideBounds, getDimensions } from './entityUtils'
import * as EntityTypes from './entityTypes'
import type { Entity } from './flowTypes'
import { getGamePadButtonNames } from './gamePadUtils'
import { setCanvasOptions } from './canvasUtils'
import styles from './App.css'

const backgroundEntities: Array<Entity> = [
	{
		type: EntityTypes.BACKGROUND,
		...getDimensions(EntityTypes.BACKGROUND),
		x: -10,
		y: -10,
	},
]
const indestructibleEntities: Array<Entity> = [
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 0, y: 400 },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 50, y: 400 },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 100, y: 400 },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 150, y: 400 },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 200, y: 400 },
	{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 250, y: 400 },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 300 },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 200 },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 100 },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: 0 },
	{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: -100 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 100, y: 380 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 120, y: 380 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 140, y: 380 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 140, y: 360 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 160, y: 340 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 290, y: 400 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 310, y: 420 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 330, y: 440 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 350, y: 460 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 370, y: 480 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 390, y: 500 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 410, y: 520 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 430, y: 540 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 450, y: 560 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 470, y: 580 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 490, y: 600 },
	{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: 510, y: 620 },
]

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
		isObstacle: true,
	},
]
const effectEntities: Array<Entity> = []

const cameraX = -100
let cameraY = -300

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
		x: mainCharacter[0].x + cameraX,
		y: mainCharacter[0].y + cameraY,
		width: this.props.width,
		height: this.props.height,
	})

	camera = () => {
		if (keys.w || (gamePad && gamePad.buttons[12].pressed)) {
			// look up
			cameraY = cameraY - 1 > -this.props.height + mainCharacter[0].height ? cameraY - 1 : cameraY
		}
		if (keys.s || (gamePad && gamePad.buttons[13].pressed)) {
			// look down
			cameraY = cameraY + 1 < 0 ? cameraY + 1 : cameraY
		}
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
		document.getElementById('mainCharacter').innerHTML = JSON.stringify(mainCharacter[0], undefined, 4)
	}

	game = () => {
		if (keys.w || (gamePad && gamePad.buttons[12].pressed)) {
			// look up
		}
		if (keys.s || (gamePad && gamePad.buttons[13].pressed)) {
			// duck
		}
		if (keys.a || (gamePad && gamePad.buttons[14].pressed)) {
			// walk left
			mainCharacter[0].velocityX = -mainCharacter[0].maxVelocityX
		} else if (keys.d || (gamePad && gamePad.buttons[15].pressed)) {
			// walk right
			mainCharacter[0].velocityX = mainCharacter[0].maxVelocityX
		} else if (mainCharacter[0].velocityX < 0.0001) {
			mainCharacter[0].velocityX = 0
		} else {
			mainCharacter[0].velocityX *= 0.5
		}
		if (keys.j || (gamePad && gamePad.buttons[0].pressed)) {
			// jump
			mainCharacter[0].accelerationY = mainCharacter[0].maxAccelerationY
			mainCharacter[0].velocityY = -mainCharacter[0].maxVelocityY
		}
		if (keys.k || (gamePad && gamePad.buttons[1].pressed)) {
			// run
			mainCharacter[0].maxVelocityX = 6
		} else {
			mainCharacter[0].maxVelocityX = 3
		}

		const { x, y, width, height } = this.getCameraBounds();

		[
			...backgroundEntities,
			...indestructibleEntities,
			...destructibleEntities,
			...enemyEntities,
			...effectEntities,
			...mainCharacter,
		]
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
