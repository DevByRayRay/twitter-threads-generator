import { useUser } from '@auth0/nextjs-auth0'
import HomePage from '../components/homepage.layout'
import TwitterApp from '../components/twitter/twitter-threads-app'

const Index = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (user) {
		return <TwitterApp user={user} FUNCTIONS_BASE_URL={FUNCTIONS_BASE_URL}></TwitterApp>
	}

	return <HomePage></HomePage>
}

export async function getStaticProps() {
	const { FUNCTIONS_BASE_URL } = process.env

	return {
		props: {
			FUNCTIONS_BASE_URL,
		},
	}
}

export default Index
