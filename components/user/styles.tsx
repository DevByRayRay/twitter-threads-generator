import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { LinkText } from 'styles/components/buttons'

export const UserInfo = ({ user, max = 999, min = 0 }) => {
	const name = user.nickname ? user.nickname.substr(min, max) : user.name.substr(min, max)
	return (
		<>
			<Link href='/profile'>
				<LinkText>Profile</LinkText>
			</Link>
		</>
	)
}

export const UserProfileContainer = styled.div`
	padding: 1rem;
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
`

export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
`
