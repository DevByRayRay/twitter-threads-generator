import React from 'react'
import styled from 'styled-components'

export const Header = styled.header`
	padding: 0 1rem;
	display: grid;
	grid-template-columns: 1fr 400px 1fr;
	height: 80px;
`

export const Logo = styled.img`
	max-width: 100%;
	height: 60px;
`
export const UserCol = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`
export const HeaderCol = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
export const LoginWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
export const LinkButton = styled.a`
	background: var(--main-color);
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
export const Title = styled.h1`
	display: none;
`
export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
`

const PageHeader = ({ user = null }) => {
	const { sub, name, nickname, picture, updated_at } = user

	return (
		<Header>
			<UserCol>
				{user && (
					<>
						<Avatar src={picture} loading='lazy' />
						<span>Welcome {name.substr(0, 13)}</span>
					</>
				)}
			</UserCol>
			<HeaderCol>
				<Logo src={'/images/logo-social-uniqorn.png'} />
				<Title>Social Uniqorn</Title>
			</HeaderCol>
			<LoginWrapper>
				<LinkButton href='/api/auth/login'>Login</LinkButton>
			</LoginWrapper>
		</Header>
	)
}

export default PageHeader
