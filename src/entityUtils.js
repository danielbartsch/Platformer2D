// @flow

import { isNil } from 'lodash'
import type { Entity } from './flowTypes'

export const nextAccelerationX = (addedAcceleration: number, entity: Entity): number => {
	const intendedAccelerationX = (isNil(entity.accelerationX) ? 0 : entity.accelerationX || 0) + addedAcceleration
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
	const intendedAccelerationY = (isNil(entity.accelerationY) ? entity.accelerationY || 0 : maxAccelerationY || 0) + addedAcceleration

	if (intendedAccelerationY > maxAccelerationY) {
		return maxAccelerationY
	} else if (intendedAccelerationY < -maxAccelerationY) {
		return -maxAccelerationY
	}
	return intendedAccelerationY
}

const nextVelocityX = (entity: Entity): number => {
	const intendedVelocityX = (isNil(entity.velocityX) ? 0 : entity.velocityX || 0) + nextAccelerationX(0, entity)
	const maxVelocityX = isNil(entity.maxVelocityX) ? 0 : entity.maxVelocityX || 0

	if (intendedVelocityX > maxVelocityX) {
		return maxVelocityX
	} else if (intendedVelocityX < -maxVelocityX) {
		return -maxVelocityX
	}
	return intendedVelocityX
}

const nextVelocityY = (entity: Entity): number => {
	const intendedVelocityY = (isNil(entity.velocityY) ? 0 : entity.velocityY || 0) + nextAccelerationY(0, entity)
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
	entity.velocityX = nextVelocityX(entity)
	entity.velocityY = nextVelocityY(entity)

	const intendedX = entity.x + entity.velocityX
	const intendedY = entity.y + entity.velocityY

	entity.x = intendedX
	entity.y = intendedY
}
