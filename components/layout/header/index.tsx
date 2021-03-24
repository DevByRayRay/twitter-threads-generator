import React from 'react'
import styled from 'styled-components'
import { mediaQueries } from 'styles/components/breakpoints'
import { IconHamburger, LinkButton } from 'styles/styled'
import Link from 'next/link'
import { Button, LinkText } from 'styles/components/buttons'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'

interface IHeader {
	padding: boolean
	margin: boolean
}
interface IMobileNav {
	show: boolean
}

export const Header = styled.header<IHeader>`
	width: 100%;
	margin: 0 auto;
	padding-top: 1rem;
	position: relative;

	${(props: IHeader) => props.padding && `padding-left: 1rem; padding-right: 1rem;`}
	${(props: IHeader) => props.margin && `margin-bottom: 1rem;`}

	${() =>
		mediaQueries('xs')(`
		display: flex;
		justify-content: center;
		flex-direction: column;
	`)}
	${() =>
		mediaQueries('lg')(`
		display: grid; 
		grid-template-columns: 1fr 300px 1fr;
	`)}
`

export const Logo = styled.img`
	max-width: 100%;
	height: 60px;
	object-fit: contain;
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
	justify-content: space-between;
	z-index: 10;

	${() =>
		mediaQueries('xs')(`
		justify-content: space-between;

		img {
			width: auto;
		}
	`)}

	${() =>
		mediaQueries('lg')(`
		justify-content: center;

		button {
			display: none;
		}
	`)}
`
export const LoginWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	a {
		margin-left: 1rem;
		width: auto;
	}
	${() =>
		mediaQueries('xs')(`
		display: none;
	`)}
	${() =>
		mediaQueries('lg')(`
		display: flex;
	`)}
`
export const MobileNav = styled.div<IMobileNav>`
	position: absolute;
	top: 0;
	padding-top: 86px;
	left: 0;
	width: 100%;
	background: var(--white);
	box-shadow: 10px 20px 40px 0 rgba(1, 23, 54, 0.2);

	${() =>
		mediaQueries('lg')(`
		display: none;
	`)}

	${(props: IMobileNav) => props.show && `display: block;`}
	${(props: IMobileNav) => !props.show && `display: none;`}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 1rem;
	}

	li {
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--greyDarken);
		padding-bottom: 0.5rem;
		&:last-child {
			border-bottom: 0;
		}
	}
`
export const NavWrapper = styled.div`
	${() =>
		mediaQueries('xs')(`
		display: none;
	`)}
	${() =>
		mediaQueries('lg')(`
		display: block;
	`)}
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
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: auto;
	}

	a {
	}
`

export const Title = styled.h1`
	display: none;
`

const PageHeader = ({ padding = false, margin = false }) => {
	const { user, error, isLoading } = useUser()
	const [toggleNav, setToggleNav] = useState<boolean>(false)

	const toggleNavFn = () => {
		setToggleNav(!toggleNav)
	}

	return (
		<Header padding={padding} margin={margin}>
			<NavWrapper>
				{user && (
					<ul>
						<li>
							<Link href='/'>
								<LinkText>Home</LinkText>
							</Link>
						</li>
						<li>
							<Link href='/twitter/threads'>
								<LinkText>Twitter Threads</LinkText>
							</Link>
						</li>
					</ul>
				)}
			</NavWrapper>
			<LogoCol>
				<Link href='/'>
					<a>
						<Logo
							src={
								'https://res.cloudinary.com/raymons/image/upload/c_scale,f_auto,h_60,q_70/v1615668889/socialuniqorn/logo-social-uniqorn.png'
							}
						/>
					</a>
				</Link>
				<Title>Social Uniqorn</Title>
				{user && (
					<Button size={'small'} onClick={toggleNavFn}>
						<IconHamburger />
					</Button>
				)}
			</LogoCol>
			<MobileNav show={toggleNav}>
				{user && (
					<ul>
						<li>
							<Link href='/'>
								<LinkText>Home</LinkText>
							</Link>
						</li>
						<li>
							<Link href='/twitter/threads'>
								<LinkText>Twitter Threads</LinkText>
							</Link>
						</li>
						<li>
							<Link href='/profile'>
								<LinkText>Profile</LinkText>
							</Link>
						</li>
						<li>
							<LinkButton size={'small'} color={'default'} href='/api/auth/logout'>
								Logout
							</LinkButton>
						</li>
					</ul>
				)}
			</MobileNav>
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
