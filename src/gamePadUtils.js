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
