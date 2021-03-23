import styled from 'styled-components'
import { mediaQueries } from '@styles/styled'

export interface RowProps {
	fullWith?: boolean
	columns?: number
}

export const Row = styled.div<RowProps>`
	${() => mediaQueries('xs')(`padding: 0 2rem;`)}
	${() => mediaQueries('lg')(`padding: 0 0;`)}

	${(props) => (props.fullWith ? `grid-column: 1/${props.columns + 1 ?? 3};` : '')}

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