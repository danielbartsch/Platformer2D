// @flow

export const getGamePadButtonNames = (buttonIndex: number): string => {
	switch (buttonIndex) {
	case 0: return 'A'
	case 1: return 'B'
	case 2: return 'X'
	case 3: return 'Y'
	case 4: return 'Left-Bumper'
	case 5: return 'Right-Bumper'
	case 6: return 'Left-Trigger'
	case 7: return 'Right-Trigger'
	case 8: return 'View'
	case 9: return 'Menu'
	case 10: return 'Left-Stick'
	case 11: return 'Right-Stick'
	case 12: return 'D-Pad-Up'
	case 13: return 'D-Pad-Down'
	case 14: return 'D-Pad-Left'
	case 15: return 'D-Pad-Right'
	default: return 'unknown'
	}
}

type isPressedFunction = (keys: { [keyName: string]: boolean }, gamePad: ?Gamepad) => boolean

export const isLeftPressed: isPressedFunction = (keys, gamePad) => keys.a || (!!gamePad && gamePad.buttons[14].pressed)
export const isRightPressed: isPressedFunction = (keys, gamePad) => keys.d || (!!gamePad && gamePad.buttons[15].pressed)
export const isUpPressed: isPressedFunction = (keys, gamePad) => keys.w || (!!gamePad && gamePad.buttons[12].pressed)
export const isDownPressed: isPressedFunction = (keys, gamePad) => keys.s || (!!gamePad && gamePad.buttons[13].pressed)
export const isJumpPressed: isPressedFunction = (keys, gamePad) => keys.k || (!!gamePad && gamePad.buttons[0].pressed)
export const isRunPressed: isPressedFunction = (keys, gamePad) => keys.j || (!!gamePad && gamePad.buttons[2].pressed)
export const isMenuPressed: isPressedFunction = (keys, gamePad) => keys.Escape || (!!gamePad && gamePad.buttons[9].pressed) // eslint-disable-line max-len
