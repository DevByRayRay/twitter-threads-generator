import styled from 'styled-components'

const Container = styled.div`
	max-width: 1100px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`
const Title = styled.h1`
	display: none;
`
const Header = styled.header`
	display: grid;
	grid-template-columns: 1fr 400px 1fr;
`
const HeaderCol = styled.div`
	display: flex;
	justify-content: center;
`
const LoginWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const Row = styled.div`
	text-align: center;
`
export const Logo = styled.img`
	width: 400px;
`
const FigureWrapper = styled.figure`
	img {
		max-width: 100%;
	}
`
const LinkButton = styled.a`
	background: #ff2d55;
	padding: 0.8rem 1rem;
	display: inline-block;
	color: #fff;
	border-radius: 5px;
	height: 50px;
	text-decoration: none;
	transition: 0.5s ease-in-out;
	&:hover {
		background: #ff2676;
	}
`

const HomePage = () => {
	return (
		<Container>
			<Header>
				<HeaderCol></HeaderCol>
				<HeaderCol>
					<Logo src={'/images/logo-social-uniqorn.png'} />
					<Title>Social Uniqorn</Title>
				</HeaderCol>
				<LoginWrapper>
					<LinkButton href='/api/auth/login'>Login</LinkButton>
				</LoginWrapper>
			</Header>
			<Row>
				<FigureWrapper>
					<img src={'/images/social-uniqorn-screenshot.png'} loading='lazy' />
				</FigureWrapper>
			</Row>
			<Row>
				<a href='/api/auth/login'>Login</a>
			</Row>
		</Container>
	)
}

export default HomePage
