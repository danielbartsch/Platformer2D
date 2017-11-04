// @flow

import React, { Component } from 'react'
import { drawRelatively } from './camera'
import { nextPosition, nextAccelerationX, nextAccelerationY } from './entityUtils'
import styles from './App.css'

const draw = (width, height, color = '#ffa') => (context, x, y) => {
	context.beginPath()
	context.moveTo(x, y)
	context.lineTo(x + width, y)
	context.lineTo(x + width, y + height)
	context.lineTo(x, y + height)
	context.closePath()
	context.fillStyle = color
	context.fill()
}

const backgroundEntities = [
	{
		x: -10,
		y: -10,
		width: 120,
		height: 120,
		draw: draw(120, 120, 'rgba(255,255,255,0.01)'),
		name: 'background',
	},
]
const indestructibleEntities = [
	{ name: 'ground', isObstacle: true, x: 0, y: 400, width: 2000, height: 20, draw: draw(2000, 20, '#fc0') },
	{ name: 'obstacle1', isObstacle: true, x: 100, y: 380, width: 20, height: 20, draw: draw(20, 20, '#eb0') },
	{ name: 'obstacle2', isObstacle: true, x: 120, y: 380, width: 20, height: 20, draw: draw(20, 20, '#da0') },
	{ name: 'obstacle3', isObstacle: true, x: 140, y: 380, width: 20, height: 20, draw: draw(20, 20, '#c90') },
	{ name: 'obstacle4', isObstacle: true, x: 140, y: 360, width: 20, height: 20, draw: draw(20, 20, '#b80') },
	{ name: 'obstacle5', isObstacle: true, x: 160, y: 340, width: 20, height: 20, draw: draw(20, 20, '#c70') },
]

const destructibleEntities = []
const enemyEntities = []
const mainCharacter = [
	{
		x: 30,
		y: 300,
		velocityX: 0,
		velocityY: 0,
		accelerationX: 0,
		accelerationY: 0,
		maxVelocityX: 1.6,
		maxVelocityY: 2,
		maxAccelerationX: 0.2,
		maxAccelerationY: 0.2,
		width: 20,
		height: 60,
		isObstacle: true,
		name: 'main',
		draw: draw(20, 60, '#f33'),
	},
]
const effectEntities = []

const cameraX = -100
let cameraY = -300

type Props = { width: number, height: number, pressedKeys: Array<string> }

let gamePad = null

window.addEventListener('gamepadconnected', event => {
	gamePad = event.gamepad
})

window.addEventListener('gamepaddisconnected', () => {
	gamePad = null
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
		if (this.props.pressedKeys.includes('w') || (gamePad && gamePad.buttons[12].pressed)) {
			// look up
			cameraY = cameraY - 1 > -this.props.height + mainCharacter[0].height ? cameraY - 1 : cameraY
		}
		if (this.props.pressedKeys.includes('s') || (gamePad && gamePad.buttons[13].pressed)) {
			// look down
			cameraY = cameraY + 1 < 0 ? cameraY + 1 : cameraY
		}
	}

	game = () => {
		if (this.props.pressedKeys.includes('w') || (gamePad && gamePad.buttons[12].pressed)) {
			// look up
		}
		if (this.props.pressedKeys.includes('s') || (gamePad && gamePad.buttons[13].pressed)) {
			// duck
		}
		if (this.props.pressedKeys.includes('a') || (gamePad && gamePad.buttons[14].pressed)) {
			// walk left
			mainCharacter[0].accelerationX = nextAccelerationX(-0.01, mainCharacter[0])
		}
		if (this.props.pressedKeys.includes('d') || (gamePad && gamePad.buttons[15].pressed)) {
			// walk right
			mainCharacter[0].accelerationX = nextAccelerationX(0.01, mainCharacter[0])
		}
		if (this.props.pressedKeys.includes('j') || (gamePad && gamePad.buttons[0].pressed)) {
			// jump
			mainCharacter[0].velocityY = -mainCharacter[0].maxVelocityY
		}
		if (this.props.pressedKeys.includes('k') || (gamePad && gamePad.buttons[1].pressed)) {
			// run
			mainCharacter[0].maxVelocityX = 3.2
		} else {
			mainCharacter[0].maxVelocityX = 1.6
		}

		[
			...backgroundEntities,
			...indestructibleEntities,
			...destructibleEntities,
			...enemyEntities,
			...mainCharacter,
			...effectEntities,
		].forEach(nextPosition)
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
					ref={ref => { this.canvasBackgroundContext = ref && ref.getContext('2d') }}
				>
                    Background Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => { this.canvasIndestructiblesContext = ref && ref.getContext('2d') }}
				>
                    Indestructibles Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => { this.canvasDestructiblesContext = ref && ref.getContext('2d') }}
				>
                    Destructibles Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => { this.canvasEnemiesContext = ref && ref.getContext('2d') }}
				>
                    Enemies Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => { this.canvasMainCharContext = ref && ref.getContext('2d') }}
				>
                    MainChar Canvas
				</canvas>
				<canvas
					className={styles.canvas}
					width={width}
					height={height}
					ref={ref => { this.canvasEffectsContext = ref && ref.getContext('2d') }}
				>
                    Effects Canvas
				</canvas>
			</div>
		)
	}
}
