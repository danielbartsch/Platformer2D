// @flow

import * as EntityTypes from './entityTypes'

export type EntityType = $Keys<typeof EntityTypes>

export type Entity = {
	type: EntityType,
	x: number, // must be leftMost point of entity
	y: number, // must be topMost point of entity
	velocityX: number,
	velocityY: number,
	accelerationX: number,
	accelerationY: number,
	maxVelocityX: number,
	maxVelocityY: number,
	maxAccelerationX: number,
	maxAccelerationY: number,
	isObstacle: boolean,
	width: number,
	height: number,
}
