import { getUserToken, sendTweetRequest, textToTweets, setUserToken } from 'lib/twitter.service'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Layout from '../components/layout'
import { Header, HeaderCol, LinkButton, LoginWrapper, Logo, Title, UserCol } from '../components/homepage.layout'
import PageHeader from '../components/page-header'
import { Avatar } from '../components/page-header'

export const AppContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 1fr 1fr;
	overflow: hidden;
	padding-top: 1rem;
`

export const AppColumn = styled.div`
	display: grid;
	grid-template-rows: 1fr 47px;
	grid-template-columns: 1fr;
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

const DEFAULT_TWEET = `Surround yourself with the right people
Jim Rohn famously said that you are the average of the five people you spend the most time with. There is an inherent truth to that, as we, as social creatures, pick up on the habits, behaviors, and attitudes of those around us. 

What that means is that if you want the strength and positivity to get through anything, you must keep your circle of friends and associates as healthy as you can.

Wherever possible, you must remove toxic relationships from your life, regardless of how tough it may be. And in situations such as work where you many not have control, you must learn how to practice positivity so its spreads to those around you. #socialuniqorn
`

const TwitterApp = ({ FUNCTIONS_BASE_URL, user }) => {
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
		<Layout>
			<Head>
				<title>Social Uniqorn</title>
				<meta property='og:title' content='Social Uniqorn' key='title' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<PageHeader user={user}></PageHeader>

			<AppContainer>
				<AppColumn className='column--input'>
					{/* <textarea name="inputText" id="inputText" cols="" rows="" className="input"></textarea> */}
					<textarea onChange={onChangeTweet} value={tweet} className='text input'></textarea>
					<footer className='footer'>
						<button id='generate' onClick={generateTweets}>
							Generate Thread
						</button>
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
					<footer className='footer'>
						<button id='generate' onClick={sendTweet}>
							Send Thread <SendStatus state={sendingTweet}></SendStatus>
						</button>
					</footer>
				</AppColumn>

				<footer className='footer'>
					Build by{' '}
					<a href='https://byrayray.dev' target='_blank' title='DevByRayRay'>
						DevByRayRay
					</a>{' '}
					| <span id='date'></span>
				</footer>
			</AppContainer>
		</Layout>
	)
}

export default TwitterApp
