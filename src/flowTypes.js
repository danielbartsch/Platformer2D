// @flow

export type Entity = {
	x: number,
	y: number,
	draw: (context: CanvasRenderingContext2D, x: number, y: number) => void,
}
