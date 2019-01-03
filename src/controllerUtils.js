// @flow

// must absolutely be in this order for XBOX One Controller
const gamePadButtons = [
	'A',
	'B',
	'X',
	'Y',
	'Left-Bumper',
	'Right-Bumper',
	'Left-Trigger',
	'Right-Trigger',
	'View',
	'Menu',
	'Left-Stick',
	'Right-Stick',
	'D-Pad-Up',
	'D-Pad-Down',
	'D-Pad-Left',
	'D-Pad-Right',
]

export const getGamePadButtonNames = (buttonIndex: number): string => gamePadButtons[buttonIndex]

const getGamePadButtonIndex = (buttonName: string): number => gamePadButtons.indexOf(buttonName)

export const keyboardControls = {
	left: 'a',
	right: 'h',
	up: 'd',
	down: 's',
	jump: 'e',
	run: 'n',
	menu: 'Escape',
}

export const gamepadControls = {
	left: getGamePadButtonIndex('D-Pad-Left'),
	right: getGamePadButtonIndex('D-Pad-Right'),
	up: getGamePadButtonIndex('D-Pad-Up'),
	down: getGamePadButtonIndex('D-Pad-Down'),
	jump: getGamePadButtonIndex('A'),
	run: getGamePadButtonIndex('X'),
	menu: getGamePadButtonIndex('Menu'),
}

type isPressedFunction = (keys: { [keyName: string]: boolean }, gamePad: ?Gamepad) => boolean

export const isLeftPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.left] ||
	(!!gamePad && gamePad.buttons[gamepadControls.left].pressed)

export const isRightPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.right] ||
	(!!gamePad && gamePad.buttons[gamepadControls.right].pressed)

export const isUpPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.up] ||
	(!!gamePad && gamePad.buttons[gamepadControls.up].pressed)

export const isDownPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.down] ||
	(!!gamePad && gamePad.buttons[gamepadControls.down].pressed)

export const isJumpPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.jump] ||
	(!!gamePad && gamePad.buttons[gamepadControls.jump].pressed)

export const isRunPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.run] ||
	(!!gamePad && gamePad.buttons[gamepadControls.run].pressed)

export const isMenuPressed: isPressedFunction = (keys, gamePad) =>
	keys[keyboardControls.menu] ||
	(!!gamePad && gamePad.buttons[gamepadControls.menu].pressed)

