// @flow

import { isNil } from 'lodash'
import type { Bounds, Entity, EntityType } from './flowTypes'
import * as EntityTypes from './entityTypes'
import {
	isJumpPressed, isDownPressed,
} from './controllerUtils'

export const isInsideBounds = (entity: Entity, { x, y, width, height }: Bounds): boolean => (
	(
		entity.x + entity.width >= x &&
		entity.y + entity.height >= y &&
		entity.x <= x + width &&
		entity.y <= y + height
	) || (
		// for entities bigger than the rect
		(entity.width > width && entity.height > height) &&
		(entity.x < x && entity.y < x) &&
		(entity.x + entity.width > width && entity.y + entity.height > height)
	)
)

export const getObstacleState = (entityA: Entity, entityB: Entity): {|
	isObstacleTop: boolean,
	isObstacleBottom: boolean,
	isObstacleLeft: boolean,
	isObstacleRight: boolean,
|} => {
	if (entityA.type === entityB.type) {
		return { isObstacleTop: false, isObstacleBottom: false, isObstacleLeft: false, isObstacleRight: false }
	}

	switch (entityB.type) {
	case EntityTypes.MAIN_CHARACTER:
		return { isObstacleTop: true, isObstacleBottom: true, isObstacleLeft: true, isObstacleRight: true }
	case EntityTypes.BLOCK_1:
		return { isObstacleTop: true, isObstacleBottom: true, isObstacleLeft: true, isObstacleRight: true }
	case EntityTypes.BLOCK_2:
		return { isObstacleTop: true, isObstacleBottom: true, isObstacleLeft: true, isObstacleRight: true }
	case EntityTypes.PLATFORM:
		return { isObstacleTop: true, isObstacleBottom: false, isObstacleLeft: false, isObstacleRight: false }
	case EntityTypes.BACKGROUND:
		return { isObstacleTop: false, isObstacleBottom: false, isObstacleLeft: false, isObstacleRight: false }
	default:
		return { isObstacleTop: false, isObstacleBottom: false, isObstacleLeft: false, isObstacleRight: false }
	}
}

export const nextAccelerationX = (addedAcceleration: number, entity: Entity): number => {
	const intendedAccelerationX = (isNil(entity.accelerationX) ? 0 : entity.accelerationX) + addedAcceleration
	const maxAccelerationX = entity.maxAccelerationX || 0

	if (intendedAccelerationX > maxAccelerationX) {
		return maxAccelerationX
	} else if (intendedAccelerationX < -maxAccelerationX) {
		return -maxAccelerationX
	}
	return intendedAccelerationX
}

export const nextAccelerationY = (addedAcceleration: number, entity: Entity): number => {
	const maxAccelerationY = isNil(entity.maxAccelerationY) ? 0 : entity.maxAccelerationY || 0
	const intendedAccelerationY = (isNil(entity.accelerationY) ? 0 : entity.accelerationY) + addedAcceleration

	if (intendedAccelerationY > maxAccelerationY) {
		return maxAccelerationY
	} else if (intendedAccelerationY < -maxAccelerationY) {
		return -maxAccelerationY
	}
	return intendedAccelerationY
}

const nextVelocityX = (entity: Entity): number => {
	const intendedVelocityX = (isNil(entity.velocityX) ? 0 : entity.velocityX) + nextAccelerationX(0, entity)
	const maxVelocityX = isNil(entity.maxVelocityX) ? 0 : entity.maxVelocityX || 0

	if (intendedVelocityX > maxVelocityX) {
		return maxVelocityX
	} else if (intendedVelocityX < -maxVelocityX) {
		return -maxVelocityX
	}
	return intendedVelocityX
}

const nextVelocityY = (entity: Entity): number => {
	const intendedVelocityY = (isNil(entity.velocityY) ? 0 : entity.velocityY) + nextAccelerationY(0, entity)
	const maxVelocityY = isNil(entity.maxVelocityY) ? 0 : entity.maxVelocityY || 0

	if (intendedVelocityY > maxVelocityY) {
		return maxVelocityY
	} else if (intendedVelocityY < -maxVelocityY) {
		return -maxVelocityY
	}
	return intendedVelocityY
}

// mutating
export const nextState = (keys, gamePad, entity: Entity, entityIndex: number, entities: Array<Entity>): void => {
	entity.accelerationX = nextAccelerationX(0, entity)
	if (entity.type === EntityTypes.MAIN_CHARACTER) {
		if (entity.velocityY > 0) {
			if (isDownPressed(keys, gamePad)) {
				entity.accelerationY = nextAccelerationY(entity.maxAccelerationY / 40, entity)
			} else {
				entity.accelerationY = nextAccelerationY(entity.maxAccelerationY / 500, entity)
			}
		} else if (isJumpPressed(keys, gamePad)) {
			entity.accelerationY = nextAccelerationY(entity.maxAccelerationY / 100, entity)
		} else {
			entity.accelerationY = nextAccelerationY(entity.maxAccelerationY / 5, entity)
		}
	} else {
		entity.accelerationY = nextAccelerationY(0, entity)
	}

	const intendedVelocityX = nextVelocityX(entity)
	const intendedVelocityY = nextVelocityY(entity)

	const intendedPositionX = entity.x + intendedVelocityX
	const intendedPositionY = entity.y + intendedVelocityY

	if (entity.isObstacle && entity.type === EntityTypes.MAIN_CHARACTER) {
		const collidedEntities = entities.filter((otherEntity, index) =>
			otherEntity.isObstacle &&
			index !== entityIndex &&
			isInsideBounds(
				otherEntity,
				{
					x: intendedPositionX,
					y: intendedPositionY,
					width: entity.width,
					height: entity.height,
				}
			)
		)

		if (collidedEntities.length > 0) {
			const leftCollidedEntity = collidedEntities.find(({ x }) => x >= entity.x + entity.width)
			if (leftCollidedEntity && getObstacleState(entity, leftCollidedEntity).isObstacleLeft) {
				// entity collided with left side of collidedEntity
				entity.x = leftCollidedEntity.x - entity.width
				entity.velocityX = 0
			} else {
				const rightCollidedEntity = collidedEntities.find(({ x, width }) => x + width <= entity.x)
				if (rightCollidedEntity && getObstacleState(entity, rightCollidedEntity).isObstacleRight) {
					// entity collided with right side of collidedEntity
					entity.x = rightCollidedEntity.x + rightCollidedEntity.width
					entity.velocityX = 0
				} else {
					entity.x = intendedPositionX
					entity.velocityX = intendedVelocityX
				}
			}

			const topCollidedEntity = collidedEntities.find(({ y }) => y >= entity.y + entity.height)
			if (topCollidedEntity && getObstacleState(entity, topCollidedEntity).isObstacleTop) {
				// entity collided with top side of collidedEntity
				entity.y = topCollidedEntity.y - entity.height
				entity.velocityY = 0
				entity.isStanding = true
			} else {
				const bottomCollidedEntity = collidedEntities.find(({ y, height }) => y + height <= entity.y)
				if (bottomCollidedEntity && getObstacleState(entity, bottomCollidedEntity).isObstacleBottom) {
					// entity collided with bottom side of collidedEntity
					entity.y = bottomCollidedEntity.y + bottomCollidedEntity.height
					entity.velocityY = 0
				} else {
					entity.y = intendedPositionY
					entity.velocityY = intendedVelocityY
				}
			}

			return
		}
		entity.isStanding = false
	}

	entity.velocityX = intendedVelocityX
	entity.velocityY = intendedVelocityY

	entity.x = intendedPositionX
	entity.y = intendedPositionY
}

export const getDimensions = (type: EntityType): {| height: number, width: number |} => {
	switch (type) {
	case EntityTypes.MAIN_CHARACTER:
		return { height: 60, width: 20 }
	case EntityTypes.BLOCK_1:
		return { height: 20, width: 20 }
	case EntityTypes.BLOCK_2:
		return { height: 40, width: 40 }
	case EntityTypes.PLATFORM:
		return { height: 20, width: 80 }
	case EntityTypes.BACKGROUND:
		return { height: 1000, width: 10000 }
	default:
		return { height: 0, width: 0 }
	}
}

const draw = (context, x, y, width, height, color = '#ffa') => {
	context.beginPath()
	context.moveTo(x, y)
	context.lineTo(x + width, y)
	context.lineTo(x + width, y + height)
	context.lineTo(x, y + height)
	context.closePath()
	context.fillStyle = color
	context.fill()
}

export const drawEntity = (tick: number, context: CanvasRenderingContext2D, entity: Entity, x: number, y: number) => {
	switch (entity.type) {
	case EntityTypes.MAIN_CHARACTER: {
		draw(context, x, y, entity.width, entity.height, '#f33')
		context.beginPath()
		if (entity.velocityX > 0) {
			context.moveTo(x + entity.width, y)
			context.lineTo(x + (entity.width / 2), y + (entity.width / 2))
			context.lineTo(x + entity.width, y + entity.width)
		} else if (entity.velocityX < 0) {
			context.moveTo(x, y)
			context.lineTo(x + (entity.width / 2), y + (entity.width / 2))
			context.lineTo(x, y + entity.width)
		} else {
			context.moveTo(x + entity.width, y)
			context.lineTo(x + (entity.width / 2), y + (entity.width / 2))
			context.lineTo(x + entity.width, y + entity.width)
			context.lineTo(x + entity.width, y)
			context.moveTo(x, y)
			context.lineTo(x + (entity.width / 2), y + (entity.width / 2))
			context.lineTo(x, y + entity.width)
		}
		context.fillStyle = '#c00'
		context.fill()
		break
	}
	case EntityTypes.BLOCK_1: {
		draw(context, x, y, entity.width, entity.height, '#aae')
		context.beginPath()
		context.moveTo(x, y)
		context.lineTo(x + (entity.width / 2), y + (entity.height / 2))
		context.lineTo(x + entity.width, y)
		context.fillStyle = '#77b'
		context.fill()
		break
	}
	case EntityTypes.BLOCK_2: {
		draw(context, x, y, entity.width, entity.height, '#eaa')
		context.beginPath()
		context.moveTo(x, y)
		context.lineTo(x + (entity.width / 4), y + (entity.height / 4))
		context.lineTo(x + (entity.width / 2), y)
		context.lineTo(x + ((entity.width * 3) / 4), y + (entity.height / 4))
		context.lineTo(x + entity.width, y)
		context.fillStyle = '#b77'
		context.fill()
		break
	}
	case EntityTypes.PLATFORM: {
		draw(context, x, y, entity.width, entity.height, '#aea')
		context.beginPath()
		context.moveTo(x, y)
		context.lineTo(x + ((entity.width * 1) / 8), y + (entity.height / 2))
		context.lineTo(x + ((entity.width * 2) / 8), y)
		context.lineTo(x + ((entity.width * 3) / 8), y + (entity.height / 2))
		context.lineTo(x + ((entity.width * 4) / 8), y)
		context.lineTo(x + ((entity.width * 5) / 8), y + (entity.height / 2))
		context.lineTo(x + ((entity.width * 6) / 8), y)
		context.lineTo(x + ((entity.width * 7) / 8), y + (entity.height / 2))
		context.lineTo(x + ((entity.width * 8) / 8), y)
		context.fillStyle = '#7b7'
		context.fill()
		break
	}
	case EntityTypes.BACKGROUND:
		context.beginPath()
		context.moveTo(x + entity.width, y)
		context.lineTo(x + entity.width, y + entity.height)
		context.lineTo(x, y + entity.height)
		for (let i = 0; i < entity.width;) {
			for (let j = 0; j < 2; j++, i += 200) {
				context.lineTo(x + i, y + (j * 100))
			}
		}
		context.fillStyle = '#000'
		context.strokeStyle = '#222'
		context.lineWidth = 5
		context.fill()
		context.stroke()
		break
	}
}
