// @flow

export const setCanvasOptions = (context: ?CanvasRenderingContext2D) => {
	if (context) {
		context.imageSmoothingEnabled = false
	}
}
