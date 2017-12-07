// @flow

import type { Bounds } from './flowTypes'

const renderMenuTitle = (
	context: CanvasRenderingContext2D,
	text: string,
	style: string,
	font: string,
	menuBounds: Bounds,
) => {
	context.save()
	context.textAlign = 'center'
	context.textBaseline = 'top'
	context.fillStyle = style
	context.font = font
	context.fillText(
		text,
		menuBounds.x + (menuBounds.width / 2),
		menuBounds.y + 20,
	)
	context.restore()
}

const renderMenuItem = (
	context: CanvasRenderingContext2D,
	text: string,
	style: string,
	font: string,
	isSelected: boolean,
	x: number,
	y: number,
) => {
	context.save()
	context.fillStyle = style
	context.font = font
	context.textAlign = 'center'
	context.textBaseline = 'top'
	if (isSelected) {
		context.shadowBlur = 5
		context.shadowColor = 'white'
	}
	context.fillText(text, x, y)
	context.restore()
}

export const renderMenu = (
	context: CanvasRenderingContext2D,
	menuBounds: Bounds,
	backgroundStyle: string,
	titleText: string,
	titleStyle: string,
	titleFont: string,
	menuItems: Array<{ text: string, style: string, font: string, isSelected: boolean, onActivate: () => void }>,
) => {
	context.save()
	context.beginPath()
	context.moveTo(menuBounds.x, menuBounds.y)
	context.lineTo(menuBounds.x + menuBounds.width, menuBounds.y)
	context.lineTo(menuBounds.x + menuBounds.width, menuBounds.y + menuBounds.height)
	context.lineTo(menuBounds.x, menuBounds.y + menuBounds.height)
	context.fillStyle = backgroundStyle
	context.fill()
	renderMenuTitle(context, titleText, titleStyle, titleFont, menuBounds)
	menuItems.forEach(({ text, style, font, isSelected }, index) => {
		renderMenuItem(
			context,
			text,
			style,
			font,
			isSelected,
			menuBounds.x + (menuBounds.width / 2),
			menuBounds.y + 130 + (50 * index)
		)
	})
	context.restore()
}
