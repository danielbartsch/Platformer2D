// @flow

import { cloneDeep } from 'lodash'
import type { Entity } from '../flowTypes'
import * as EntityTypes from '../entityTypes'
import { getDimensions } from '../entityUtils'

export default (): { [entityNames: string]: Array<Entity> } => cloneDeep({
	backgroundEntities: [],
	indestructibleEntities: [
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -285, y: -200, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -225, y: 0, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -115, y: -360, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -45, y: 0, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 0, y: -73, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 90, y: -73, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 225, y: 0, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	],
	destructibleEntities: [],
	enemyEntities: [],
	mainCharacter: [
		{
			type: EntityTypes.MAIN_CHARACTER,
			...getDimensions(EntityTypes.MAIN_CHARACTER),
			x: 0,
			y: -200,
			velocityX: 0,
			velocityY: 0,
			accelerationX: 0,
			accelerationY: 0.9,
			maxVelocityX: 3,
			maxVelocityY: 26,
			maxAccelerationX: 0.2,
			maxAccelerationY: 0.9,
			isStanding: false,
			isObstacle: true,
		},
	],
	effectEntities: [],
	foreGroundEntities: [],
})
