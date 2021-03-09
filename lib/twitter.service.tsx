import tweetSplitter from 'twitter-splitter'

function sendTweetRequest(BASE_URL, tokens, tweets) {
	return new Promise(async (resolve, reject) => {
		if (tokens.hasOwnProperty('accessToken') && tokens.hasOwnProperty('accessTokenSecret') && tweets) {
			const { accessToken, accessTokenSecret } = tokens
			try {
				const data = await fetch(`${BASE_URL}/post-tweet?ut=${accessToken}&uts=${accessTokenSecret}`, {
					method: 'POST',
					body: JSON.stringify({ messages: tweets }),
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
				tweets,
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

function textToTweets(inputTxt: string): string[] {
	const input = inputTxt.split('\n\n')
	const filtered = input.filter((item) => {
		console.log('item: ', item)
		return item.length > 0
	})
	const split = filtered.map((string) => tweetSplitter(string, 276, ''))

	const flat = [].concat(...split)

	return flat
}

export { sendTweetRequest, setUserToken, getUserToken, textToTweets }
