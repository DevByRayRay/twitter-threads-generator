import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

import { sendTweetRequest, setUserToken, getUserToken } from '../lib/twitter.service'

const PageHeader = styled.header`
	display: flex;
	width: 100%;
	height: calc(48px + 2rem);
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	box-sizing: border-box;
	background: #333;
	color: #fff;
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

const DEFAULT_TWEET = `“Optimism is the most important human trait, because it allows us to evolve our ideas, to improve our situation, and to hope for a better tomorrow.”
– Seth Godin`

const Index = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	const [send, setSend] = useState()
	const [postedTweets, setPostedTweets] = useState([])
	const [tweet, setTweet] = useState(DEFAULT_TWEET)

	// Event for updating the tweet state
	const onChangeTweet = (event) => {
		console.log('ev: ', event.target.value)
		setTweet(event.target.value)
	}

	// Event for sending tweets
	function sendTweet() {
		console.log('tweet: ', tweet)

		const tokens = getUserToken()

		sendTweetRequest(FUNCTIONS_BASE_URL, tokens, tweet)
			.then((tweetsArr) => {
				setSend(true)
				setPostedTweets(tweetsArr)
			})
			.catch((error) => {
				console.error('Didnt send!')
				setSend(false)
			})
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
			<>
				<Head>
					<title>Social Uniqorn</title>
					<meta property='og:title' content='Social Uniqorn' key='title' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>
				<div>
					<PageHeader>
						<HeaderUser>
							<Avatar src={picture} loading='lazy' />
							<HeaderUsername>Welcome {name.substr(0, 13)}</HeaderUsername>
						</HeaderUser>
						<div>
							<a href='/api/auth/logout'>Logout</a>
						</div>
					</PageHeader>
	

					<p>
						<textarea onChange={onChangeTweet} value={tweet} className='text'></textarea>
					</p>
					<button onClick={sendTweet}>Send tweet</button>

          <div class="container">
            <header class="header">
              <h1>Generate Twitter Thread</h1>
            </header>
            <div class="column column--input">
              <textarea name="inputText" id="inputText" cols="" rows="" class="input"></textarea>
              <footer class="footer">
                <button id="generate">Generate Thread</button>
              </footer>
            </div>
            <div class="column column--output">
              <div id="output"></div>  
              <footer class="footer">
                Build by <a href="https://byrayray.dev" target="_blank" title="DevByRayRay">DevByRayRay</a> | <span id="date"></span>
              </footer>
            </div>
          
          </div>
          
					<p>{send === true && <strong>Posted tweets!</strong>}</p>
					<p>{send === false && <em>Didn;t send</em>}</p>
				</div>
			</>
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

export default Index
