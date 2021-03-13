import { getUserToken, sendTweetRequest, textToTweets, setUserToken } from 'lib/twitter.service'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../layout'
import PageHeader, { Avatar } from '../page-header'
import { Button, Footer, Textarea } from 'styles/styled'
import { AppContainer, AppColumn, SendStatus } from './styles'
import { sendState } from './types'
import { Content } from 'components/homepage.layout'

const DEFAULT_TWEET = `Surround yourself with the right people
Jim Rohn famously said that you are the average of the five people you spend the most time with. There is an inherent truth to that, as we, as social creatures, pick up on the habits, behaviors, and attitudes of those around us. 

What that means is that if you want the strength and positivity to get through anything, you must keep your circle of friends and associates as healthy as you can.

Wherever possible, you must remove toxic relationships from your life, regardless of how tough it may be. And in situations such as work where you many not have control, you must learn how to practice positivity so its spreads to those around you. #socialuniqorn
`

const TwitterApp = ({ FUNCTIONS_BASE_URL, user }) => {
	console.log('TwitterApp')
	const [send, setSend] = useState<boolean | null>()
	const [renderedTweets, setRenderedTweets] = useState([])
	const [postedTweets, setPostedTweets] = useState<any[]>([])
	const [sendingTweet, setSendingTweet] = useState<sendState | null>(null)
	const [tweet, setTweet] = useState(DEFAULT_TWEET)
	let sending: sendState | null = null

	useEffect(() => {
		generateTweets()
	}, [tweet])

	// Event for updating the tweet state
	const onChangeTweet = (event) => {
		console.log('ev: ', event.target.value)
		setTweet(event.target.value)
		generateTweets()
	}

	// Event for sending tweets
	function sendTweet() {
		const tokens = getUserToken()
		sending = sendState.sending

		sendTweetRequest(FUNCTIONS_BASE_URL, tokens, renderedTweets)
			.then((tweetsArr: any[]) => {
				setSend(true)
				setPostedTweets(tweetsArr)
				setSendingTweet(sendState.recieved)
				setTimeout(() => {
					setSendingTweet(null)
				}, 3000)
			})
			.catch((error) => {
				console.error('Didnt send: ', error)
				setSend(false)
				setSendingTweet(sendState.error)
			})
	}

	function generateTweets() {
		const tweets = textToTweets(tweet, true)
		setRenderedTweets(tweets)
	}

	const { sub, picture } = user

	return (
		<Layout>
			<Head>
				<title>Social Uniqorn</title>
				<meta property='og:title' content='Social Uniqorn' key='title' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<PageHeader padding={true} user={user}></PageHeader>

			<AppContainer>
				<AppColumn className='column--input'>
					<Content>
						<h3>Write your story here 👇</h3>
					</Content>
					<Textarea
						onChange={onChangeTweet}
						onKeyDown={onChangeTweet}
						value={tweet}
						className='text input'
					></Textarea>
					<footer className='footer'>
						<Button color={'action'} id='generate' onClick={sendTweet}>
							Send Thread <SendStatus state={sendingTweet}></SendStatus>
						</Button>
					</footer>
				</AppColumn>
				<AppColumn className='column--output'>
					<div id='output'>
						{renderedTweets &&
							renderedTweets.map((item, index) => {
								return (
									<div key={index} className='tweet'>
										<Avatar src={picture} loading='lazy' />
										<div className='tweet__content'>{item}</div>
									</div>
								)
							})}
					</div>
				</AppColumn>
				<Footer />
			</AppContainer>
		</Layout>
	)
}

export default TwitterApp
