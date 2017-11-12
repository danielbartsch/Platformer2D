// @flow

import type { Entity } from './flowTypes'
import { isInsideBounds, drawEntity } from './entityUtils'

export const drawRelatively = (
	context: CanvasRenderingContext2D,
	entities: Array<Entity>, // array of all entities to render
	drawWindowWidth: number, // in pixels - whole drawing area
	drawWindowHeight: number, // in pixels - whole drawing area
	drawWidth: number, // width range of pixels to draw
	drawHeight: number, // height range of pixels to draw
	x: number, // x-coordinate at which to begin to draw
	y: number, // y-coordinate at which to begin to draw
): void => {
	if (entities.length === 0) return

	context.clearRect(0, 0, context.canvas.width, context.canvas.height)
	context.strokeRect(0, 0, drawWidth, drawHeight) // camera view area
	entities.forEach(entity => {
		if (isInsideBounds(entity, x, y, drawWidth, drawHeight)) {
			drawEntity(context, entity, entity.x - x, entity.y - y)
		}
	})
}
