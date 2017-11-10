// @flow

import { isNil } from 'lodash'
import type { Entity } from './flowTypes'

export const isInsideBounds = (entity: Entity, x: number, y: number, width: number, height: number): boolean => (
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
export const nextPosition = (entity: Entity, entityIndex: number, entities: Array<Entity>): void => {
	entity.accelerationX = nextAccelerationX(0, entity)
	entity.accelerationY = nextAccelerationY(0, entity)

	entity.velocityX = nextVelocityX(entity)
	entity.velocityY = nextVelocityY(entity)

	const intendedX = entity.x + entity.velocityX
	const intendedY = entity.y + entity.velocityY

	if (entity.isObstacle && entity.name === 'main') {
		const collidableEntities = entities.filter(({ isObstacle }, index) => isObstacle && index !== entityIndex)

		const collidedEntities = collidableEntities.filter(otherEntity =>
			isInsideBounds(otherEntity, intendedX, intendedY, entity.width, entity.height)
		)

		if (collidedEntities.length > 0) {
			const leftCollidedEntity = collidedEntities.find(({ x }) => x >= entity.x + entity.width)
			if (leftCollidedEntity) {
				// entity collided with left side of collidedEntity
				entity.x = leftCollidedEntity.x - entity.width
			} else {
				const rightCollidedEntity = collidedEntities.find(({ x, width }) => x + width <= entity.x)
				if (rightCollidedEntity) {
					// entity collided with right side of collidedEntity
					entity.x = rightCollidedEntity.x + rightCollidedEntity.width
				} else {
					entity.x = intendedX
				}
			}

			const topCollidedEntity = collidedEntities.find(({ y }) => y >= entity.y + entity.height)
			if (topCollidedEntity) {
				// entity collided with top side of collidedEntity
				entity.y = topCollidedEntity.y - entity.height
			} else {
				const bottomCollidedEntity = collidedEntities.find(({ y, height }) => y + height <= entity.y)
				if (bottomCollidedEntity) {
					// entity collided with bottom side of collidedEntity
					entity.y = bottomCollidedEntity.y + bottomCollidedEntity.height
				} else {
					entity.y = intendedY
				}
			}

			return
		}
	}
	entity.x = intendedX
	entity.y = intendedY
}
