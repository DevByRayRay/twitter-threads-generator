import React from 'react'
import styled from 'styled-components'
import { mediaQueries } from 'styles/components/breakpoints'
import { LinkButton } from 'styles/styled'

interface IHeader {
	padding: boolean
	margin: boolean
}

export const Header = styled.header<IHeader>`
	width: 100%;
	margin: 0 auto;

	${(props: IHeader) => props.padding && `max-width: 960px;`}
	${(props: IHeader) => props.margin && `margin-bottom: 3rem;`}

	${() =>
		mediaQueries('xs')(`
		height: 80px; 
		display: grid; 
		grid-template-columns: 400px 1fr;
		grid-template-row: auto auto;
		padding: 0 2rem;
	`)}
	${() =>
		mediaQueries('lg')(`
		height: 80px; 
		display: grid; 
		grid-template-columns: 1fr 400px 1fr;
		grid-template-row: auto auto;
		padding: 0;
	`)}
`

export const Logo = styled.img`
	max-width: 100%;
	height: 60px;
`
export const UserCol = styled.div`
	display: none;
	
	${() =>
		mediaQueries('lg')(`
		display: flex;
		justify-content: flex-start;
		align-items: center;
	`)}
`
export const LogoCol = styled.div`
	display: flex;
	align-items: center;
	
	${() =>
		mediaQueries('lg')(`
		justify-content: center;
	`)}
`
export const LoginWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

export const Title = styled.h1`
	display: none;
`
export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
`

const UserInfo = ({ user }) => {
	console.log('user UserInfo: ', user)

	return (
		<>
			<Avatar src={user.picture} loading='lazy' />
			<span>Welcome {user.name.substr(0, 13)}</span>
		</>
	)
}

const PageHeader = ({ user = null, padding = false, margin = false }) => {
	console.log('user pageHeader: ', user)
	return (
		<Header padding={padding} margin={margin}>
			<UserCol>{user ? <UserInfo user={user} /> : ''}</UserCol>
			<LogoCol>
				<Logo
					src={
						'https://res.cloudinary.com/raymons/image/upload/c_scale,f_auto,h_60,q_70/v1615668889/socialuniqorn/logo-social-uniqorn.png'
					}
				/>
				<Title>Social Uniqorn</Title>
			</LogoCol>
			<LoginWrapper>
				{user && (
					<LinkButton color={'default'} href='/api/auth/logout'>
						Logout
					</LinkButton>
				)}
			</LoginWrapper>
		</Header>
	)
}

export default PageHeader
