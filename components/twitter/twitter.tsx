import { getUserToken, sendTweetRequest, textToTweets, setUserToken, TToken } from 'lib/twitter.service'
import React, { useState, useEffect } from 'react'
import html2canvas from 'html2canvas';
import Layout from '../layout'
import PageHeader from '../layout/header'
import { Button, Textarea, LinkButton, Container } from 'styles/styled'
import {
	AppContainer,
	AppColumn,
	SendStatus,
	UserWarningContent,
	UserWarning,
	TweetImage,
	TweetImageContainer
} from './styles'
import { sendState } from './types'
import { Avatar } from '../user/styles'
import { getUserProfile } from 'lib/user.service'
import { UserProfileModel, UserType } from 'components/user/types'
import { Content } from '@components/pages/home/styles'

const DEFAULT_TWEET = `The thread is generated automatically while you are typing below. 🚀

During the beta period you can send a maximum of 10 tweets for free. 
This might change in the future.😅

Empty rows will generate a new tweet. But if it goes above 280 characters, we will create multiple tweets from it for you 🤗.

Like this fake content from http://www.cupcakeipsum.com/

Cupcake ipsum dolor sit amet pudding gummies. Chocolate marzipan I love apple pie. Pudding chocolate cake halvah I love. Danish pastry donut bonbon tart fruitcake jelly beans. Soufflé tiramisu dragée marshmallow chocolate. I love tart croissant toffee caramels lemon drops sesame snaps. Caramels tootsie roll halvah. Gummies topping bear claw. Chocolate cake sweet topping sweet roll tootsie roll carrot cake donut. Marzipan ice cream I love macaroon chupa chups chocolate cake. Gummi bears muffin jelly-o bonbon marshmallow I love carrot cake. 

I love dessert jelly I love marshmallow sugar plum jujubes wafer cake. I love sweet roll topping powder I love soufflé. Candy topping lollipop jujubes dragée jujubes I love topping. Marzipan marshmallow oat cake candy canes I love danish gingerbread gummi bears. Candy gummi bears cupcake. Apple pie gingerbread cake sweet roll pudding dessert dessert sugar plum liquorice. Apple pie lollipop candy toffee ice cream tiramisu jelly beans danish apple pie. Dessert marshmallow ice cream I love marshmallow wafer cake. Powder chocolate bar cupcake sweet roll bonbon liquorice gummi bears. Soufflé dragée cotton candy macaroon croissant apple pie cupcake cheesecake. Lemon drops chocolate icing jelly beans. I love marzipan donut gummies gummies I love ice cream. Caramels I love powder pastry. Chocolate cake pudding croissant cupcake apple pie marshmallow oat cake. Jelly dessert chocolate bar liquorice marzipan gummi bears gingerbread I love tiramisu. Halvah I love toffee tart bear claw.
`

const TwitterApp = ({ FUNCTIONS_BASE_URL, user }) => {
	const [send, setSend] = useState<boolean | null>()
	const [renderedTweets, setRenderedTweets] = useState([])
	const [postedTweets, setPostedTweets] = useState<any[]>([])
	const [sendingTweet, setSendingTweet] = useState<sendState | null>(null)
	const [tweet, setTweet] = useState(DEFAULT_TWEET)
	const [tweetImage, setTweetImage] = useState<string>('No tweet selected')
	let sending: sendState | null = null

	const [userProfile, setUserProfile] = useState(user)

	async function userInfo(userId) {
		const profile = await getUserProfile(FUNCTIONS_BASE_URL, userId)
		const userModel = new UserProfileModel({ ...user, ...profile })
		await setUserToken(FUNCTIONS_BASE_URL, userId)
		setUserProfile(userModel)
	}

	useEffect(() => {
		if (user && user.sub) {
			userInfo(user.sub)
		}
		generateTweets()
	}, [tweet, user])

	useEffect(() => {
		if (tweetImage) {
			const canvasPlaceholder: HTMLElement = document.querySelector('#tweetImageCanvas')
			const tweetImageContent: HTMLElement = document.querySelector('#tweetImageContent')

			html2canvas(tweetImageContent).then((canvas) => {
				canvasPlaceholder.innerHTML = null
				canvasPlaceholder.appendChild(canvas)
			})
		}
	}, [tweetImage])

	// Event for updating the tweet state
	const onChangeTweet = event => {
		setTweet(event.target.value)
		generateTweets()
	}

	// Event for sending tweets
	function sendTweet() {
		setSendingTweet(sendState.sending)
		const tokens: TToken = getUserToken()
		sending = sendState.sending

		if (tokens.accessToken.length === 0 || tokens.accessTokenSecret.length === 0) {
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
			.catch(error => {
				console.error('Didnt send: ', error)
				setSend(false)
				setSendingTweet(sendState.error)
			})
	}

	function generateTweets() {
		const tweets = textToTweets(tweet, true)
		setRenderedTweets(tweets)
	}

	function generateTweetImage(content: string) {
		if (!content) return
		if (tweetImage) {
			setTweetImage(content)
		}
	}

	return (
		<AppContainer>
			<AppColumn className='column--input'>
				<Content>{userProfile ? <h3>Write your story here 👇</h3> : <h3>Try it out here 🤗</h3>}</Content>
				<Textarea
					onChange={onChangeTweet}
					onKeyDown={onChangeTweet}
					value={tweet}
					className='text input'
				></Textarea>
				{userProfile && userProfile.type === UserType.email && (
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
					{userProfile && userProfile.type === UserType.social && (
						<Button color={'action'} id='generate' onClick={sendTweet}>
							Send Thread <SendStatus state={sendingTweet}></SendStatus>
						</Button>
					)}
					{!userProfile && (
						<p>
							<strong>Want to send this thread automatically?</strong>
							<br />
							<LinkButton color={'action'} href='/api/auth/login'>
								Login with Twitter
							</LinkButton>
						</p>
					)}

					{renderedTweets && renderedTweets.length > 9 && (
						<UserWarning>
							<UserWarningContent>
								During the beta period you can send a maximum of 10 tweets for free. <br />
								This might change in the future.😅
							</UserWarningContent>
						</UserWarning>
					)}
				</footer>
			</AppColumn>
			{tweetImage && (
				<AppColumn>
					<TweetImageContainer>
						<TweetImage id="tweetImageContent">
							<div>{tweetImage}</div>
						</TweetImage>
						<div id='tweetImageCanvas'></div>
					</TweetImageContainer>
				</AppColumn>
			)}
			<AppColumn className='column--output'>
				<div id='output'>
					{renderedTweets &&
						renderedTweets.map((item, index) => {
							return (
								<div key={index} className='tweet'>
									<Avatar src={user?.picture ?? null} loading='lazy' />
									<div className='tweet__content'>{item}</div>
									<Button onClick={() => generateTweetImage(item)}>Image</Button>
								</div>
							)
						})}
				</div>
			</AppColumn>
		</AppContainer>
	)
}

export default TwitterApp
