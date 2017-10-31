// @flow

import React, { Component } from 'react'
import { drawRelatively } from './camera'

const draw = (context, x, y) => {
	context.beginPath()
	context.moveTo(x, y)
	context.lineTo(x + 20, y)
	context.lineTo(x + 20, y + 20)
	context.lineTo(x, y + 20)
	context.closePath()
	context.fillStyle = '#ffa'
	context.fill()
}

const backgroundEntities = [
	{
		x: -10,
		y: -10,
		width: 120,
		height: 120,
		draw: (context, x, y) => {
			context.beginPath()
			context.moveTo(x, y)
			context.lineTo(x + 120, y)
			context.lineTo(x + 120, y + 120)
			context.lineTo(x, y + 120)
			context.closePath()
			context.fillStyle = 'rgba(255,255,255,0.01)'
			context.fill()
		},
	},
]
const indestructibleEntities = [
	{ x: 0, y: 0, width: 20, height: 20, draw },
	{ x: 10, y: 10, width: 20, height: 20, draw },
	{ x: 20, y: 20, width: 20, height: 20, draw },
	{ x: 30, y: 50, width: 20, height: 20, draw },
	{ x: 40, y: 80, width: 20, height: 20, draw },
	{ x: 50, y: 20, width: 20, height: 20, draw },
	{ x: 60, y: 50, width: 20, height: 20, draw },
	{ x: 70, y: 10, width: 20, height: 20, draw },
]
const destructibleEntities = []
const enemyEntities = []
const mainCharacter = []
const effectEntities = []

let cameraX = 0
let cameraY = 0

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
	gameInterval: number

	props: Props

	gameFrame = () => {
		if (this.props.pressedKeys.includes('w') || (gamePad && gamePad.buttons[12].pressed)) {
			cameraY--
		}
		if (this.props.pressedKeys.includes('s') || (gamePad && gamePad.buttons[13].pressed)) {
			cameraY++
		}
		if (this.props.pressedKeys.includes('a') || (gamePad && gamePad.buttons[14].pressed)) {
			cameraX--
		}
		if (this.props.pressedKeys.includes('d') || (gamePad && gamePad.buttons[15].pressed)) {
			cameraX++
		}
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
					100,
					100,
					cameraX,
					cameraY,
				)
			}
		})
	}

	componentDidMount() {
		this.gameInterval = setInterval(this.gameFrame, 16)
	}

	render() {
		const { width, height } = this.props
		return (
			<div>
				<canvas
					style={{ position: 'absolute' }}
					width={width}
					height={height}
					ref={ref => { this.canvasBackgroundContext = ref && ref.getContext('2d') }}
				>
                    Background Canvas
				</canvas>
				<canvas
					style={{ position: 'absolute' }}
					width={width}
					height={height}
					ref={ref => { this.canvasIndestructiblesContext = ref && ref.getContext('2d') }}
				>
                    Indestructibles Canvas
				</canvas>
				<canvas
					style={{ position: 'absolute' }}
					width={width}
					height={height}
					ref={ref => { this.canvasDestructiblesContext = ref && ref.getContext('2d') }}
				>
                    Destructibles Canvas
				</canvas>
				<canvas
					style={{ position: 'absolute' }}
					width={width}
					height={height}
					ref={ref => { this.canvasEnemiesContext = ref && ref.getContext('2d') }}
				>
                    Enemies Canvas
				</canvas>
				<canvas
					style={{ position: 'absolute' }}
					width={width}
					height={height}
					ref={ref => { this.canvasMainCharContext = ref && ref.getContext('2d') }}
				>
                    MainChar Canvas
				</canvas>
				<canvas
					style={{ position: 'absolute' }}
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
