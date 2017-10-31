// @flow

import React, { Component } from 'react'
import { drawRelatively } from './camera'

const backgroundEntities = []
const indestructibleEntities = [
	{ x: 0, y: 0, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#ffa'; context.fill() } },
	{ x: 10, y: 10, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#faf'; context.fill() } },
	{ x: 20, y: 20, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#aff'; context.fill() } },
	{ x: 30, y: 50, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#ff8'; context.fill() } },
	{ x: 40, y: 80, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#f8f'; context.fill() } },
	{ x: 50, y: 20, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#8ff'; context.fill() } },
	{ x: 60, y: 50, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#ff0'; context.fill() } },
	{ x: 70, y: 10, draw: (context, x, y) => { context.beginPath(); context.moveTo(x - 10, y - 10); context.lineTo(x + 10, y + 10); context.lineTo(x - 10, y + 10); context.closePath(); context.fillStyle = '#f0f'; context.fill() } },
]
const destructibleEntities = []
const enemyEntities = []
const mainCharacter = []
const effectEntities = []

let run = 0

type Props = { width: number, height: number }

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
					30 + (Math.cos(run += 0.01) * 40),
					30 + (Math.cos(run += 0.01) * 40),
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
