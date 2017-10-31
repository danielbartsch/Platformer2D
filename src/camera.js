/**
 * param: entities Array of objects, with at least attributes:
 *   x   : number
 *   y   : number
 *   draw: function (context, x, y) => void
 *
**/

export const drawRelatively = (
    canvasElement,
    entities, // array of all entities to render
    drawWindowWidth, // in pixels - whole drawing area
    drawWindowHeight, // in pixels - whole drawing area
    drawWidth, // width range of pixels to draw
    drawHeight, // height range of pixels to draw
    x, // x-coordinate at which to begin to draw
    y // y-coordinate at which to begin to draw
) => {
    const context = canvasElement.getContext('2d')
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    entities.forEach(entity => {
        if (
            entity.x >= x && entity.y >= y &&
            entity.x <= x + drawWidth && entity.y <= y + drawHeight
        ) {
            entity.draw(context, entity.x - x, entity.y - y)
        }
    })
}
