import { useUser } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'

const Index = ({FUNCTIONS_BASE_URL}) => {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	if (user) {
		const { sub, name, nickname, picture, updated_at } = user 

    if(localStorage) {
      if(!getUserToken()) {
        setUserToken(FUNCTIONS_BASE_URL, sub).then((data) => {
          console.log('user: ', data)
          localStorage.setItem('twitterThreadsToken', JSON.stringify(data))
        })
      }
    }
    
		return (
			<div>
				Welcome {name}! <a href='/api/auth/logout'>Logout</a>
        <ul>
          <li><strong>Name:</strong> {name} </li>
          <li><strong>Sub:</strong> {sub} </li>
          <li><strong>Nickname:</strong> {nickname} </li>
          <li><strong>Picture:</strong> <img src={picture} loading="lazy" /> </li>
          <li><strong>Updated at:</strong> {updated_at} </li>
        </ul>
			</div>
		)
	}

	return <a href='/api/auth/login'>Login</a>
}



export async function getStaticProps() {
	const { FUNCTIONS_BASE_URL } = process.env
	return {
		props: {
			FUNCTIONS_BASE_URL,
		},
	}
}

async function setUserToken(BASE_URL, userId) {
    const data = await fetch(`${BASE_URL}/get-user?id=${userId}`)
    const json = await data.json()
    console.log('json: ', json)
    const {data: {identities}} = json
    let token = {
      accessToken: '',
      accessTokenSecret: ''
    }

    if(Array.isArray(identities) && identities.length > 0) {
      identities.forEach((identity) => {
        token.accessToken = identity.access_token ? identity.access_token : ''
        token.accessTokenSecret = identity.access_token_secret ? identity.access_token_secret : ''
      })
    }

    return token

}

function getUserToken() {
  return localStorage.getItem('twitterThreadsToken')
}

export default Index