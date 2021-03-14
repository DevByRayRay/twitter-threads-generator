import styled from 'styled-components'
export const PageFooter = styled.footer`
	text-align: center;
	grid-column: 1/3;
	padding: 1rem 1rem 2rem;
	margin-top: 2rem;

	a {
		color: var(--main-color);
	}
`

export const Footer = () => {
	const today = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(
		new Date()
	)

	return (
		<PageFooter>
			Build by{' '}
			<a href='https://byrayray.dev' target='_blank' title='DevByRayRay'>
				DevByRayRay
			</a>{' '}
			| <span id='date'>{today}</span>
		</PageFooter>
	)
}
