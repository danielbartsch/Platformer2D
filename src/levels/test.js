// @flow

import { cloneDeep } from 'lodash'
import type { Entity } from '../flowTypes'
import * as EntityTypes from '../entityTypes'
import { getDimensions } from '../entityUtils'

export default (): { [entityNames: string]: Array<Entity> } => cloneDeep({
	backgroundEntities: [
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
			x: -2000,
			y: 400,
			parallaxFactorX: 0.3,
			parallaxFactorY: 0.1,
		},
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
			x: -1700,
			y: 410,
			parallaxFactorX: 0.5,
			parallaxFactorY: 0.3,
		},
	],
	indestructibleEntities: [
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 0, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 50, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 100, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 150, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 200, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: 250, y: 400, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -300, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -210, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -120, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -30, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 60, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 150, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 240, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: 330, y: 600, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
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
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: -300, y: 300, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: -480, y: 300, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: -700, y: 330, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -870, y: 500, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_2, ...getDimensions(EntityTypes.BLOCK_2), isObstacle: true, x: -800, y: 250, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: -950, y: 440, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.BLOCK_1, ...getDimensions(EntityTypes.BLOCK_1), isObstacle: true, x: -980, y: 370, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -890, y: 300, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -710, y: 200, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -600, y: 150, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -490, y: 100, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
		{ type: EntityTypes.PLATFORM, ...getDimensions(EntityTypes.PLATFORM), isObstacle: true, x: -380, y: 50, accelerationX: 0, accelerationY: 0, maxAccelerationX: 0, maxAccelerationY: 0, maxVelocityX: 0, maxVelocityY: 0, velocityX: 0, velocityY: 0, isStanding: false },
	],
	destructibleEntities: [],
	enemyEntities: [],
	mainCharacter: [
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
	],
	effectEntities: [],
	foreGroundEntities: [],
})
