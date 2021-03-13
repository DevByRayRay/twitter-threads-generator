import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { sendTweetRequest, setUserToken, getUserToken, textToTweets } from '../lib/twitter.service'
import HomePage from '../components/homepage.layout'

const PageHeader = styled.header`
	display: grid;
	width: 100%;
	height: 80px;
	grid-template-columns: 300px 1fr 300px;
	align-items: center;
	padding: 1rem;
	box-sizing: border-box;
	color: #fff;
	margin-bottom: 1rem;
	border-bottom: 1px solid #fff;
`

const H1 = styled.h1`
	margin: 0;
`

const HeaderRight = styled.div`
	display: flex;
	justify-content: flex-end;
`

const Avatar = styled.img`
	width: 48px;
	height: 48px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 1rem;
`

const HeaderUser = styled.div`
	width: 300px;
	display: flex;
	align-items: center;
`
const HeaderUsername = styled.div``
const HeaderName = styled.div``

const DEFAULT_TWEET = `Surround yourself with the right people
Jim Rohn famously said that you are the average of the five people you spend the most time with. There is an inherent truth to that, as we, as social creatures, pick up on the habits, behaviors, and attitudes of those around us. 

What that means is that if you want the strength and positivity to get through anything, you must keep your circle of friends and associates as healthy as you can.

Wherever possible, you must remove toxic relationships from your life, regardless of how tough it may be. And in situations such as work where you many not have control, you must learn how to practice positivity so its spreads to those around you. #socialuniqorn

`

export enum sendState {
	sending = 'sending',
	recieved = 'recieved',
	error = 'error',
}
export interface iSendingState {
	state: sendState
}

const StatusMessage = styled.div<iSendingState>`
	display: inline-block;
	color: #fff;
	${(props) => {
		if (props.state === sendState.sending) {
			return 'background-color: orange;'
		}
		if (props.state === sendState.recieved) {
			return 'background-color: green;'
		}
		if (props.state === sendState.error) {
			return 'background-color: red;'
		}
	}};
`

const SendStatus = (props: iSendingState) => {
	switch (props.state) {
		case 'sending':
			return <StatusMessage>Sending</StatusMessage>
			break
		case 'recieved':
			return <StatusMessage>Recieved</StatusMessage>
			break
		case 'error':
			return <StatusMessage>Error</StatusMessage>
			break

		default:
			return <span></span>
			break
	}
}

const Index = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	const [send, setSend] = useState<boolean | null>()
	const [renderedTweets, setRenderedTweets] = useState([])
	const [postedTweets, setPostedTweets] = useState<any[]>([])
	const [sendingTweet, setSendingTweet] = useState<sendState | null>(null)
	const [tweet, setTweet] = useState(DEFAULT_TWEET)
	let sending: sendState | null = null

	useEffect(() => {
		generateTweets()
	}, [])

	// Event for updating the tweet state
	const onChangeTweet = (event) => {
		console.log('ev: ', event.target.value)
		setTweet(event.target.value)
	}

	// Event for sending tweets
	function sendTweet() {
		console.log('tweet: ', tweet)

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
				console.error('Didnt send!')
				setSend(false)
				setSendingTweet(sendState.error)
			})
	}

	function generateTweets() {
		const tweets = textToTweets(tweet, true)
		setRenderedTweets(tweets)
		console.log('tweets: ', tweets)
	}

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	if (user) {
		const { sub, name, nickname, picture, updated_at } = user

		if (localStorage) {
			setUserToken(FUNCTIONS_BASE_URL, sub)
				.then((data) => {
					console.log('user: ', data)
					localStorage.setItem('twitterThreadsToken', JSON.stringify(data))
				})
				.catch((err) => console.log('error getUser: ', err))
		}

		return (
			<div className='page'>
				<Head>
					<title>Social Uniqorn</title>
					<meta property='og:title' content='Social Uniqorn' key='title' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>
				<PageHeader>
					<HeaderUser>
						<Avatar src={picture} loading='lazy' />
						<HeaderUsername>Welcome {name.substr(0, 13)}</HeaderUsername>
					</HeaderUser>

					<HeaderName className='header'>
						<H1>Social Uniqorn</H1>
					</HeaderName>
					<HeaderRight>
						<a href='/api/auth/logout'>Logout</a>
					</HeaderRight>
				</PageHeader>

				<div className='container'>
					<div className='column column--input'>
						{/* <textarea name="inputText" id="inputText" cols="" rows="" className="input"></textarea> */}
						<textarea onChange={onChangeTweet} value={tweet} className='text input'></textarea>
						<footer className='footer'>
							<button id='generate' onClick={generateTweets}>
								Generate Thread
							</button>
						</footer>
					</div>
					<div className='column column--output'>
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
						<footer className='footer'>
							<button id='generate' onClick={sendTweet}>
								Send Thread <SendStatus state={sendingTweet}></SendStatus>
							</button>
						</footer>
					</div>

					<footer className='footer'>
						Build by{' '}
						<a href='https://byrayray.dev' target='_blank' title='DevByRayRay'>
							DevByRayRay
						</a>{' '}
						| <span id='date'></span>
					</footer>
				</div>
			</div>
		)
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
