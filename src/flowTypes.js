// @flow

import * as EntityTypes from './entityTypes'

export type Bounds = {
	x: number, // leftmost point
	y: number, // topmost point
	width: number,
	height: number,
}

export type EntityType = $Keys<typeof EntityTypes>

export type Entity = Bounds & {
	type: EntityType,
	velocityX: number,
	velocityY: number,
	accelerationX: number,
	accelerationY: number,
	maxVelocityX: number,
	maxVelocityY: number,
	maxAccelerationX: number,
	maxAccelerationY: number,
	isObstacle: boolean,
	isStanding: boolean,
}
