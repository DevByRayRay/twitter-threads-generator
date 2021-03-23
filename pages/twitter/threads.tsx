import { useUser } from '@auth0/nextjs-auth0'
import HomePage from '../../components/pages/home'
import TwitterContainer from '../../components/twitter/twitter-container'

const TwitterThreads = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (user) {
		return <TwitterContainer user={user} FUNCTIONS_BASE_URL={FUNCTIONS_BASE_URL}></TwitterContainer>
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

export default TwitterThreads
