// @flow

import type { Entity } from './flowTypes'

// mutating
export const nextAccelerationX = (addedAcceleration: number, entity: Entity): number => {
	const intendedAccelerationX = (entity.accelerationX || 0) + addedAcceleration
	const maxAccelerationX = entity.maxAccelerationX || 0

	if (intendedAccelerationX > maxAccelerationX) {
		entity.accelerationX = maxAccelerationX
		return maxAccelerationX
	} else if (intendedAccelerationX < -maxAccelerationX) {
		entity.accelerationX = -maxAccelerationX
		return -maxAccelerationX
	}
	entity.accelerationX = intendedAccelerationX
	return intendedAccelerationX
}

// mutating
export const nextAccelerationY = (addedAcceleration: number, entity: Entity): number => {
	const maxAccelerationY = entity.maxAccelerationY || 0
	const intendedAccelerationY = (entity.accelerationY || maxAccelerationY) + addedAcceleration

	if (intendedAccelerationY > maxAccelerationY) {
		entity.accelerationY = maxAccelerationY
		return maxAccelerationY
	} else if (intendedAccelerationY < -maxAccelerationY) {
		entity.accelerationY = -maxAccelerationY
		return -maxAccelerationY
	}
	entity.accelerationY = intendedAccelerationY
	return intendedAccelerationY
}

// mutating
export const nextVelocityX = (entity: Entity): number => {
	const intendedVelocityX = (entity.velocityX || 0) + nextAccelerationX(0, entity)
	const maxVelocityX = entity.maxVelocityX || 0

	if (intendedVelocityX > maxVelocityX) {
		entity.velocityX = maxVelocityX
		return maxVelocityX
	} else if (intendedVelocityX < -maxVelocityX) {
		entity.velocityX = -maxVelocityX
		return -maxVelocityX
	}
	entity.velocityX = intendedVelocityX
	return intendedVelocityX
}

// mutating
export const nextVelocityY = (entity: Entity): number => {
	const intendedVelocityY = (entity.velocityY || 0) + nextAccelerationY(0, entity)
	const maxVelocityY = entity.maxVelocityY || 0

	if (intendedVelocityY > maxVelocityY) {
		entity.velocityY = maxVelocityY
		return maxVelocityY
	} else if (intendedVelocityY < -maxVelocityY) {
		entity.velocityY = -maxVelocityY
		return -maxVelocityY
	}
	entity.velocityY = intendedVelocityY
	return intendedVelocityY
}

// mutating
export const nextPosition = (entity: Entity): void => {
	entity.x += nextVelocityX(entity)
	entity.y += nextVelocityY(entity)
}
