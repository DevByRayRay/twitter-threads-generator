import { UserProfileModel } from './types'
import { UserProfileContainer } from './styles'
import { Form, FormRow, Input } from 'components/forms'
import React from 'react'
import { Button } from 'styles/styled'
import { Row } from 'components/homepage.layout'
import styled from 'styled-components'

export const userProfileLabels = {
	nickname: 'Nickname',
	name: 'Name',
	picture: 'Picture',
	updated_at: 'Updated_at',
	email: 'Email',
	email_verified: 'Email_verified',
	sub: 'Sub',
}

const ButtonWrapper = styled.div`
	padding-top: 2rem;
	display: flex;
	justify-content: flex-end;
`

const UserProfile = ({ user }) => {
	const model = new UserProfileModel(user)
	const keys = Object.keys(model)
	console.log('🚀 ~ file: user-profile.tsx ~ line 5 ~ UserProfile ~ model', model)

	return (
		<UserProfileContainer>
			<h1>Profile</h1>
			<Form>
				{keys &&
					keys.map((key) => {
						if (key !== 'sub') {
							if (key === 'picture' || key === 'sub' || key === 'email_verified' || key === 'updated_at')
								return
							return (
								<FormRow>
									<strong>{userProfileLabels[key]}</strong>
									<Input
										type='text'
										disabled={key === 'email' || key === 'name'}
										value={model[key]}
									/>
								</FormRow>
							)
						}
					})}
				<ButtonWrapper>
					<Button color={'action'}>Update</Button>
				</ButtonWrapper>
			</Form>
		</UserProfileContainer>
	)
}

export default UserProfile
