import { useUser } from '@auth0/nextjs-auth0'
import GeneralContext from '@components/layout/user-context'
import { useContext, useEffect } from 'react'
import HomePage from '../../components/pages/home'
import TwitterContainer from '../../components/twitter/twitter-container'

const TwitterThreads = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()
	const { updateFun, fun } = useContext(GeneralContext)

	useEffect(() => {
		console.log('fun: ', fun)
		if (updateFun) {
			updateFun(FUNCTIONS_BASE_URL)
			console.log('fun: ', fun)
		}
	}, [])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (user) {
		return <TwitterContainer></TwitterContainer>
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
