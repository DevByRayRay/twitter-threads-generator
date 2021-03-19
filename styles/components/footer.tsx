import styled from 'styled-components'
export const PageFooter = styled.footer`
	text-align: center;
	padding: 1rem 1rem 2rem;

	position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

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
			<p>
				
				Build by{' '}
					<a href='https://byrayray.dev' target='_blank' title='DevByRayRay'>
						DevByRayRay
					</a>{' '}
					| <span id='date'>{today}</span>
			
			</p>
		</PageFooter>
	)
}
