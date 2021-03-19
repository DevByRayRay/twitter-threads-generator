import { useUser } from '@auth0/nextjs-auth0'
import Layout from 'components/layout'
import UserProfile from '../components/user/user-profile'
import PageHeader from '../components/page-header'
import { Container } from 'styles/styled'

const UserProfilePage = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (user) {
		return (
			<Layout>
				<Container>
						<PageHeader user={user} margin={true} padding={true}></PageHeader>
						<UserProfile FUNCTIONS_BASE_URL={FUNCTIONS_BASE_URL} user={user} />
				</Container>
			</Layout>
		)
	}
}

export async function getStaticProps() {
	const { FUNCTIONS_BASE_URL } = process.env

	return {
		props: {
			FUNCTIONS_BASE_URL,
		},
	}
}

export default UserProfilePage
