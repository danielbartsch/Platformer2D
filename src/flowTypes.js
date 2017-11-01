// @flow

export type Entity = {|
	x: number, // must be leftMost point of entity
	y: number, // must be topMost point of entity
	velocityX?: number,
	velocityY?: number,
	accelerationX?: number,
	accelerationY?: number,
	maxVelocityX?: number,
	maxVelocityY?: number,
	maxAccelerationX?: number,
	maxAccelerationY?: number,
	width: number,
	height: number,
	draw: (context: CanvasRenderingContext2D, x: number, y: number) => void,
|}
