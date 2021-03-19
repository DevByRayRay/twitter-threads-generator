import { getUserToken, sendTweetRequest, textToTweets, setUserToken, TToken } from 'lib/twitter.service'
import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import PageHeader from '../page-header'
import { Button, Textarea, LinkButton, Container } from 'styles/styled'
import { AppContainer, AppColumn, SendStatus } from './styles'
import { sendState } from './types'
import { Content } from 'components/homepage.layout'
import { Avatar } from '../user/styles'
import { getUserProfile } from 'lib/user.service'
import { UserProfileModel, UserType } from 'components/user/types'
import styled from 'styled-components'

const DEFAULT_TWEET = `Surround yourself with the right people
Jim Rohn famously said that you are the average of the five people you spend the most time with. There is an inherent truth to that, as we, as social creatures, pick up on the habits, behaviors, and attitudes of those around us. 

What that means is that if you want the strength and positivity to get through anything, you must keep your circle of friends and associates as healthy as you can.

Wherever possible, you must remove toxic relationships from your life, regardless of how tough it may be. And in situations such as work where you many not have control, you must learn how to practice positivity so its spreads to those around you. #socialuniqorn
`

const UserWarning = styled.div`
	color: var(--redDark);
	display: flex;
	justify-content: center;
`
const UserWarningContent = styled.div`
	max-width: 768px;
	text-align: center;
`

const TwitterApp = ({ FUNCTIONS_BASE_URL, user }) => {
	const [send, setSend] = useState<boolean | null>()
	const [renderedTweets, setRenderedTweets] = useState([])
	const [postedTweets, setPostedTweets] = useState<any[]>([])
	const [sendingTweet, setSendingTweet] = useState<sendState | null>(null)
	const [tweet, setTweet] = useState(DEFAULT_TWEET)
	let sending: sendState | null = null

	const [userProfile, setUserProfile] = useState(user)

	async function userInfo(userId) {
		const profile = await getUserProfile(FUNCTIONS_BASE_URL, userId)
		const userModel = new UserProfileModel({ ...user, ...profile })
		await setUserToken(FUNCTIONS_BASE_URL, user.sub)
		setUserProfile(userModel)
	}

	useEffect(() => {
		userInfo(user.sub)
		generateTweets()
	}, [tweet, user])

	// Event for updating the tweet state
	const onChangeTweet = (event) => {
		setTweet(event.target.value)
		generateTweets()
	}

	// Event for sending tweets
	function sendTweet() {
		setSendingTweet(sendState.sending)
		const tokens : TToken = getUserToken()
		sending = sendState.sending

		if(tokens.accessToken.length === 0 || tokens.accessTokenSecret.length === 0) {
			setSend(false)
			return
		}

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
			<Container>
				<PageHeader padding={true} user={userProfile}></PageHeader>
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
						{userProfile.type === UserType.email && (
							<UserWarning>
								<UserWarningContent>
									<p>
										<em></em>
									</p>
									<p>
										If you want us to send your Twitter Thread <br />
										<LinkButton size={'small'} color={'action'} href='/api/auth/login'>
											Sign up with Twitter
										</LinkButton>
									</p>
								</UserWarningContent>
							</UserWarning>
						)}
						<footer className='footer'>
							{userProfile.type === UserType.social && (
								<Button color={'action'} id='generate' onClick={sendTweet}>
									Send Thread <SendStatus state={sendingTweet}></SendStatus>
								</Button>
							)}
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
				</AppContainer>
			</Container>
		</Layout>
	)
}

export default TwitterApp
