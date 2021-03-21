import { useUser } from '@auth0/nextjs-auth0'
import HomePage from '../components/pages/home'

const Index = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	return <HomePage user={user || null}></HomePage>
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
