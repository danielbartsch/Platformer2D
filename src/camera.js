// @flow

/**
 * param: entities Array of objects, with at least attributes:
 *   x   : number
 *   y   : number
 *   draw: function (context, x, y) => void
 *
 */

import type { Entity } from './flowTypes'

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
	context.clearRect(0, 0, context.canvas.width, context.canvas.height)

	entities.forEach(entity => {
		if (
			entity.x >= x && entity.y >= y &&
			entity.x <= x + drawWidth && entity.y <= y + drawHeight
		) {
			entity.draw(context, entity.x - x, entity.y - y)
		}
	})
}
