import React from 'react'
import styled from 'styled-components'
import { LinkButton } from 'styles/styled'

interface IHeader {
	padding: boolean
}

export const Header = styled.header<IHeader>`
	display: grid;
	grid-template-columns: 1fr 400px 1fr;
	height: 80px;
	width: 100%;
	margin: 0 auto;

	${(props: IHeader) => props.padding && `max-width: 960px;`}
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

export const Title = styled.h1`
	display: none;
`
export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
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

const PageHeader = ({ user = null, padding = false }) => {
    console.log('user pageHeader: ', user)
	return (
		<Header padding={padding}>
			<UserCol>{user ? <UserInfo user={user} /> : ''}</UserCol>
			<HeaderCol>
				<Logo src={'/images/logo-social-uniqorn.png'} />
				<Title>Social Uniqorn</Title>
			</HeaderCol>
			<LoginWrapper>
				{user ? (
					<LinkButton color={'default'} href='/api/auth/logout'>
						Logout
					</LinkButton>
				) : (
					<LinkButton color={'action'} href='/api/auth/login'>
						Login with Twitter
					</LinkButton>
				)}
			</LoginWrapper>
		</Header>
	)
}

export default PageHeader
