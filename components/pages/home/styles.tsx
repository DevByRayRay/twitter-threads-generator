import styled from 'styled-components'
import { mediaQueries } from '@styles/styled'

export const Row = styled.div`
	${() => mediaQueries('xs')(`padding: 0 2rem;`)}
	${() => mediaQueries('lg')(`padding: 0 0;`)}
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

export const Content = styled.div`
	h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 1.6rem;
		margin-bottom: 1rem;
	}
	p {
		font-size: 1.3em;
		&:nth-last-child(2) {
			margin-bottom: 4rem;
		}
	}
`
