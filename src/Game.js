import React, { Component } from 'react'
import { drawRelatively } from './camera'

const backgroundEntities = []
const indestructibleEntities = [
    { x: 0, y: 0, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#ffa'; context.fill() } },
    { x: 10, y: 10, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#faf'; context.fill() } },
    { x: 20, y: 20, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#aff'; context.fill() } },
    { x: 30, y: 50, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#ff8'; context.fill() } },
    { x: 40, y: 80, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#f8f'; context.fill() } },
    { x: 50, y: 20, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#8ff'; context.fill() } },
    { x: 60, y: 50, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#ff0'; context.fill() } },
    { x: 70, y: 10, draw: (context, x, y) => { context.beginPath(); context.moveTo(x-10, y-10); context.lineTo(x+10, y+10); context.lineTo(x-10, y+10); context.closePath(); context.fillStyle='#f0f'; context.fill() } },
]
const destructibleEntities = []
const enemyEntities = []
const mainCharacter = []
const effectEntities = []

let run = 0

export default class Game extends Component {

    gameFrame = () => {
        [
            [this.canvasBackground, backgroundEntities],
            [this.canvasIndestructibles, indestructibleEntities],
            [this.canvasDestructibles, destructibleEntities],
            [this.canvasEnemies, enemyEntities],
            [this.canvasMainChar, mainCharacter],
            [this.canvasEffects, effectEntities]
        ].forEach(([context, entities]) => drawRelatively(context, entities, this.props.width, this.props.height, 100, 100, 30 + Math.cos(run+=0.01) * 40,  + Math.cos(run+=0.01) * 40))
    }

    componentDidMount() {
        this.gameInterval = setInterval(this.gameFrame, 16)
    }

    render() {
        const { width, height } = this.props
        return (
            <div>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasBackground = ref }}>Background Canvas</canvas>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasIndestructibles = ref }}>Indestructibles Canvas</canvas>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasDestructibles = ref }}>Destructibles Canvas</canvas>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasEnemies = ref }}>Enemies Canvas</canvas>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasMainChar = ref }}>MainChar Canvas</canvas>
                <canvas style={{ position: 'absolute' }} width={width} height={height} ref={ref => { this.canvasEffects = ref }}>Effects Canvas</canvas>
            </div>
        )
    }
}
