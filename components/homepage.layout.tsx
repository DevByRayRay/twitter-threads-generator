import styled from 'styled-components'
import Layout from './layout'
import PageHeader from './page-header'

export const Container = styled.div`
	max-width: 1100px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`
export const Row = styled.div`
	text-align: center;
`
export const FigureWrapper = styled.figure`
	img {
		max-width: 100%;
	}
`

const HomePage = () => {
	return (
		<Layout>
			<Container>
				<PageHeader></PageHeader>
				<Row>
					<FigureWrapper>
						<img src={'/images/social-uniqorn-screenshot.png'} loading='lazy' />
					</FigureWrapper>
				</Row>
			</Container>
		</Layout>
	)
}

export default HomePage
