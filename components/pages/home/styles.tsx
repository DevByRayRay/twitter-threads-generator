import styled from 'styled-components'
import { mediaQueries } from '@styles/styled'
import { complement, invert } from 'polished'
import { root } from '@styles/components/global-styles'

export interface RowProps {
	fullWith?: boolean
	columns?: number
	marginTop?: string
	marginBottom?: string
	backgroundColor?: string
	dynamicTxtColor?: boolean
	gradient?: boolean
	gradientFrom?: string
	gradientTo?: string
	color?: string
}

function getStyle(props, property, style) {
	return props[property] ? `${style}: ${props[property]};` : ''
}
function getGradient(from, to) {
	return `background: linear-gradient(0deg, ${from} 0%, ${to} 100%);`
}

export const Row = styled.div<RowProps>`
	${() => mediaQueries('xs')(`padding-left: 2rem; padding-right: 2rem;`)}
	${() => mediaQueries('lg')(`padding: 0 0;`)}

	${(props) => (props.fullWith && props.columns ? `grid-column: 1/${props.columns + 1 ?? 3};` : console.log('fullWith: ', props.fullWith))}

	${(props) => getStyle(props, 'marginBottom', 'margin-bottom')}
	${(props) => getStyle(props, 'marginTop', 'margin-top')}
	${(props) => getStyle(props, 'backgroundColor', 'background-color')}
	${(props) => getStyle(props, 'color', 'color')}

	${(props) => (props.dynamicTxtColor ? `color: ${invert(props.gradientTo ?? props.backgroundColor)};` : '')}
	${(props) => props.gradient && getGradient(props.gradientFrom, props.gradientTo)}

	/* ${getGradient(root.mainColor, root.white)}; */

	&.content {
		display: flex;
		align-items: center;
	}
`

export const Columns = styled.div`
	padding-top: 2rem;
	display: grid;
	gap: 2rem;

	${() => mediaQueries('sm')(`grid-template-columns: 2fr 3fr;`)}
`
export interface ContentProps {
	contentWidth: string
	textAlign: 'left' | 'center' | 'right'
}

export const Content = styled.div<ContentProps>`
	${(props) => (props.contentWidth ? `max-width: ${props.contentWidth ?? '500px'}; margin: 0 auto;` : '')}
	${(props) => (props.textAlign ? `text-align: ${props.textAlign ?? 'left'};` : '')}

	h2 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 1.6rem;
		margin-bottom: 1rem;
	}
	p, em, strong,a {
		font-size: 1.3rem;
	}
	
	ul {
		display: inline-block;
    text-align: left;
	}
`

export const BackgroundImage = styled.div`
	background: url('https://res.cloudinary.com/raymons/image/upload/f_auto/v1616508594/socialuniqorn/website-background.png');
	width: 100%;
	height: 800px;
	position: absolute;
	bottom: 0;
	left: 0;
	background-size: cover;
	background-position: bottom center;
`

export const FeaturesList = styled.div`
	max-width: var(--maxWidth);
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 2rem;
	margin: 4rem 0;
`

export const FeatureItem = styled.div`
	width: 100%;
	font-size: 1.1rem;
	img {
		max-width: 100%;
		height: 200px;
		object-fit: contain;
		margin-bottom: 1rem;
	}
`