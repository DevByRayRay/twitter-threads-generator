function sendTweetRequest(BASE_URL, tokens, tweet) {
	return new Promise(async (resolve, reject) => {
		if (tokens.hasOwnProperty('accessToken') && tokens.hasOwnProperty('accessTokenSecret') && tweet) {
			const { accessToken, accessTokenSecret } = tokens
			try {
				const data = await fetch(`${BASE_URL}/post-tweet?ut=${accessToken}&uts=${accessTokenSecret}`, {
					method: 'POST',
					body: JSON.stringify({ message: tweet }),
					headers: {
						'Content-Type': 'application/json',
					},
				})

				const json = await data.json()
				console.log('tweetttt: ', json)
				resolve(json)
			} catch (error) {
				console.error('error: ', error)
				reject(error)
			}
		} else {
			console.error('data is missing for sending a tweet: ', {
				BASE_URL,
				tokens,
				tweet,
			})
		}
	})
}

async function setUserToken(BASE_URL, userId) {
	return new Promise(async (resolve, reject) => {
		try {
			const data = await fetch(`${BASE_URL}/get-user?id=${userId}`)
			const json = await data.json()
			console.log('json: ', json)
			const {
				data: { identities },
			} = json
			let token = {
				accessToken: '',
				accessTokenSecret: '',
			}

			if (Array.isArray(identities) && identities.length > 0) {
				identities.forEach((identity) => {
					token.accessToken = identity.access_token ? identity.access_token : ''
					token.accessTokenSecret = identity.access_token_secret ? identity.access_token_secret : ''
				})
			}

			resolve(token)
		} catch (error) {
			reject(error)
		}
	})
}

function getUserToken() {
	const data = localStorage.getItem('twitterThreadsToken')
	return data ? JSON.parse(data) : {}
}

export { sendTweetRequest, setUserToken, getUserToken }
