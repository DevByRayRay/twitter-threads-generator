import { IUserProfile, UserProfileModel, UserType } from './types'
import { Avatar, UserProfileContainer } from './styles'
import { Form, FormRow, Input } from 'components/forms'
import React, { useEffect, useState } from 'react'
import { Button } from 'styles/styled'
import { useForm } from 'react-hook-form'
import { ButtonWrapper } from 'styles/components/buttons'
import styled from 'styled-components'
import { getUserProfile } from 'lib/user.service'

export const userProfileLabels = {
	nickname: 'Nickname',
	name: 'Name',
	picture: 'Picture',
	updated_at: 'Updated_at',
	email: 'Email',
	email_verified: 'Email_verified',
	sub: 'Sub',
}

const UserImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 2rem 0 1rem 0;
`

const UserProfilePicture = ({ label, value }) => (
	<>
		<strong>{label}</strong>
		<img src={value} loading='lazy' />
	</>
)
const UserProfileInput = ({ label, value, property, register, readOnly = false }) => (
	<>
		<strong>{label}</strong>
		<Input ref={register} defaultValue={value} name={property} readOnly={readOnly} />
	</>
)

const UserProfileValue = ({ data, property, register = null }) => {
	return property === 'picture' ? (
		<UserProfilePicture label={userProfileLabels[property]} value={data[property]} />
	) : (
		<UserProfileInput
			register={register}
			label={userProfileLabels[property]}
			value={data[property]}
			property={property}
			readOnly={true}
		/>
	)
}

const UserProfile = ({ user, FUNCTIONS_BASE_URL }) => {
	const [userProfile, setUserProfile] = useState(user)

	useEffect(() => {
		userInfo(user.sub)
	}, [user])

	async function userInfo(userId) {
		const profile = await getUserProfile(FUNCTIONS_BASE_URL, userId)
		const userModel = new UserProfileModel({ ...user, ...profile })
		console.log('🚀 ~ file: user-profile.tsx ~ line 58 ~ userInfo ~ userModel', userModel)
		setUserProfile(userModel)
	}

	const { register, handleSubmit, reset } = useForm<IUserProfile>({
		defaultValues: { ...user },
	})

	const onSubmit = (data) => console.log(data)

	const model = new UserProfileModel(userProfile)
	const keys = Object.keys(model)
	const disabled = ['sub', 'user_metadata', 'type']

	return (
		<UserProfileContainer>
			<h1>Profile</h1>
			{userProfile.type === UserType.social && (
				<p>
					<em>These fields can't be changed, since they come from Twitter.</em>
					<br />
					<br />
				</p>
			)}

			<UserImageWrapper>
				{userProfile.picture && <Avatar src={userProfile.picture} loading='lazy' />}
			</UserImageWrapper>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{keys.map(
					(key) =>
						!disabled.includes(key) && (
							<FormRow key={key}>
								<UserProfileInput
									register={register}
									label={userProfileLabels[key]}
									value={model[key]}
									property={key}
									readOnly={true}
								/>
							</FormRow>
						)
				)}
				{/* {userProfile.type === UserType.email && (
					<ButtonWrapper>
						<Button color={'action'}>Update</Button>
					</ButtonWrapper>
				)} */}
			</Form>
		</UserProfileContainer>
	)
}

export default UserProfile
