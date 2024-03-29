import { lighten, darken } from 'polished'
import styled, { createGlobalStyle } from 'styled-components'

export const rootColors = () => {
	const mainColor = '#00E271'
	const secColor = '#0076FF'
	const white = '#fff'
	const grey = '#ccc'
	const red = '#ff0000'
	const redDark = '#ae0000'
	const inputDisabled = '#949494'
	const greyLight = lighten(0.01, grey)
	const greyLighter = lighten(0.1, grey)
	const greyDarken = darken(0.01, grey)

	const black = '#000'
	const darkGrey = '#333'

	return {
		mainColor,
		secColor,
		white,
		grey,
		greyLight,
		greyDarken,
		greyLighter,
		red,
		redDark,
		inputDisabled,
		black,
		darkGrey,
	}
}

export const root = rootColors()

export const GlobalStyle = createGlobalStyle`
	:root {
		--header-height: calc(48px + 2rem);
		--main-color: ${root.mainColor};
		--sec-color: ${root.secColor};
		
		--white: ${root.white};
		--grey: ${root.grey};
		--greyLight: ${root.greyLight};
		--greyLighter: ${root.greyLighter};
		--greyDarken: ${root.greyDarken};
		
		--black: ${root.black};
		--darkGrey: ${root.darkGrey};

		--red: ${root.red};
		--redDark: ${root.redDark};
		--inputDisabled: ${root.inputDisabled};

		--max-width: 1100px;
	}
`
