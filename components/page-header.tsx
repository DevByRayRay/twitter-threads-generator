import React from 'react'
import styled from 'styled-components'
import { mediaQueries } from 'styles/components/breakpoints'
import { LinkButton } from 'styles/styled'
import { UserInfo } from './user/styles'
import Link from 'next/link'
import { LinkText } from 'styles/components/buttons'

interface IHeader {
	padding: boolean
	margin: boolean
}

export const Header = styled.header<IHeader>`
	width: 100%;
	margin: 0 auto;
	padding-top: 1rem;

	${(props: IHeader) => props.padding && `padding-left: 2rem; padding-right: 2rem;`}
	${(props: IHeader) => props.margin && `margin-bottom: 3rem;`}

	${() =>
		mediaQueries('xs')(`
		display: grid; 
		grid-template-columns: 400px 1fr;
	`)}
	${() =>
		mediaQueries('lg')(`
		display: grid; 
		grid-template-columns: 1fr 400px 1fr;
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

	a {
		margin-left: 1rem;
	}
`
export const NavWrapper = styled.div`
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	li {
		margin: 0.5rem;
	}

	a {
	}
`

export const Title = styled.h1`
	display: none;
`

const PageHeader = ({ user = null, padding = false, margin = false }) => {
	return (
		<Header padding={padding} margin={margin}>
			<NavWrapper>
				<ul>
					<li>
						<Link href='/'>
							<LinkText>Home</LinkText>
						</Link>
					</li>
					<li></li>
				</ul>
			</NavWrapper>
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
					<>
						<Link href='/profile'>
							<LinkText>Profile</LinkText>
						</Link>
						<LinkButton size={'small'} color={'default'} href='/api/auth/logout'>
							Logout
						</LinkButton>
					</>
				)}
			</LoginWrapper>
		</Header>
	)
}

export default PageHeader
