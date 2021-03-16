import { useUser } from '@auth0/nextjs-auth0'
import Layout from 'components/layout'
import UserProfile from '../components/user/user-profile'
import PageHeader from '../components/page-header'

const UserProfilePage = () => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (user) {
		console.log('user: ', user)
		return (
			<Layout>
				<PageHeader padding={true} user={user}></PageHeader>
				<UserProfile user={user} />
			</Layout>
		)
	}
}

export default UserProfilePage
